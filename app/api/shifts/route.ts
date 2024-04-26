import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { PrintTwoTone } from '@mui/icons-material'
import { clerkClient } from '@clerk/nextjs'
import { sendEmail, parseTime } from "../../lib/email"
const prisma = new PrismaClient()


/* 
 * GETs a shift from the database
 * A userID, status, and/or after/before times can be provided as query params 
 * to filter results
 */
export async function GET(req: NextRequest) {
        const searchParams = req.nextUrl.searchParams
        const userID = searchParams.get('userID')
        const status = searchParams.get('status')

        const startBound = searchParams.get('after')
        const endBound = searchParams.get('before')
        const startBoundDate = startBound ? new Date(startBound) : null
        const endBoundDate = endBound ? new Date(endBound) : null

        if ((startBoundDate && isNaN(startBoundDate.getTime())) ||
                (endBoundDate && isNaN(endBoundDate.getTime()))) {
                return new Response('Error: after & before fields must be valid dates', {
                        status: 400,
                })
        }

        let queryFilters = {
                AND: [{}]
        }
        if (userID) {
                queryFilters.AND.push({ userID: userID })
        }
        if (status) {
                queryFilters.AND.push({ status: status })
        }
        if (startBound) {
                queryFilters.AND.push({ from: { gte: startBoundDate, } })
        }
        if (endBound) {
                queryFilters.AND.push({ to: { lte: endBoundDate, } })
        }

        let shifts = await prisma.primaryShift.findMany({ where: queryFilters })
        return new Response(JSON.stringify(shifts))
}


/* 
 * Inserts a new primary shift into the database
 * Expects the request body to be json with fields corresponding to the fields 
 * of the Shift model
 */
export async function POST(req: NextRequest) {

        try {
                let data = await req.json();
                console.log("PRINTING DATA")
                console.log(data)
                data = {
                        ...data,
                        "date": new Date(data.date),
                        "from": new Date(data.from),
                        "to": new Date(data.to),
                        "created_at": new Date(data.created_at)
                };
                const shift = await prisma.primaryShift.create({ data });
                return new Response(JSON.stringify(shift))
        } catch (error) {
                return new Response('Error: An unexpected error occured', {
                        status: 500,
                })
        }
}

/* 
 * Upserts a new shift into the database
 * Expects the request body to be json with fields corresponding to the fields 
 * of the Shift model. Also requires shiftID as a query param
 */
export async function PUT(req: NextRequest) {
        try {
                const searchParams = req.nextUrl.searchParams
                const shiftID = searchParams.get('shiftID')
                const shiftIDNumeric = shiftID ? parseInt(shiftID, 10) : null;
                if (!shiftIDNumeric) {
                        return new Response('Error: An shiftID must be provided as a query parameter', { status: 500, })
                }

                let data = await req.json();
                data = {
                        ...data,
                        "primaryShiftID": shiftIDNumeric,
                        "date": new Date(data.date),
                        "from": new Date(data.from),
                        "to": new Date(data.to),
                        "created_at": new Date(data.created_at)
                };

                const userID = data.userID;
                const userEmail = (await clerkClient.users.getUser(userID)).emailAddresses[0].emailAddress;
                const users = await clerkClient.users.getUserList()

                const adminList = users.filter((user) => {
                        return user.publicMetadata.role === 'Coordinator';
                }).map((user) => {
                        return user.emailAddresses[0].emailAddress;
                });
                adminList.push("Sean.Reilly@tufts.edu")

                let messageAdmin = "";
                let subjectAdmin = "";
                let messageEmployee = "";
                let subjectEmployee = "";

                const oldShift = await prisma.primaryShift.findUnique({
                        where: { primaryShiftID: shiftIDNumeric, },
                })

                let isAdminEmail = true;

                if (data.status === "PENDING") {
                        subjectAdmin = `Shift ${shiftIDNumeric} is PENDING`;
                        messageAdmin = `${data.firstName + " " + data.lastName + " (userID: " + data.userID + ")"} has requested the shift ${parseTime(data.from, data.to)}. Approve this shift to assign it to ${data.firstName + " " + data.lastName}.`

                        subjectEmployee = `PENDING SHIFT ${shiftIDNumeric}`
                        messageEmployee = `You have requested the shift on ${parseTime(data.from, data.to)}. A coordinator will approve or cancel this request.`
                } else if (data.status === "CANCELLED" && oldShift?.status === "PENDING") {
                        isAdminEmail = false
                        subjectEmployee = `Request for shift ${shiftIDNumeric} Rejected`
                        messageEmployee = `Your request for the shift on ${parseTime(data.from, data.to)} has been rejected.`
                } else if (data.status === "CANCELLED" && oldShift?.status === "ACCEPTED") {
                        // To all admin: "[Employee name] is unable to make their shift on [date/time]. The shift is now available for other employees to pick up."
                        // To the employee who canceled the shift: "You have canceled your shift on [date/time]. The shift is now available for other employees to pick up."
                        subjectAdmin = `Shift ${shiftIDNumeric} has been CANCELLED by Employee ${data.firstName + " " + data.lastName}`
                        messageAdmin = `${data.firstName + " " + data.lastName} is unable to make their shift on ${fromMonth}/${fromDay}/${fromYear}. The shift is now available for other employees to pick up`

                        subjectEmployee = `Shift ${shiftIDNumeric} CANCELLED `
                        messageEmployee = `You have cancelled your shift ${parseTime(data.from, data.to)}. The shift is now available for other employees to pick up.`
                } else if (data.status === "ACCEPTED") {
                        isAdminEmail = false;
                        subjectEmployee = `Shift ${shiftIDNumeric} CANCELLED `
                        messageEmployee = `Your request for the shift ${parseTime(data.from, data.to)} has been approved.`
                }

                if (isAdminEmail) {
                        await sendEmail({
                                emailList: adminList,
                                subject: subjectAdmin,
                                message: messageAdmin,
                        }).then((response) => {
                                console.log(response);
                        }).catch((error) => {
                                throw new Error('something went wrong sending an email', error.message);
                        })
                }

                await sendEmail({
                        emailList: [userEmail],
                        subject: subjectEmployee,
                        message: messageEmployee,
                }).then((response) => {
                        console.log(response);
                }).catch((error) => {
                        throw new Error('something went wrong sending an email', error.message);
                })


                const shift = await prisma.primaryShift.upsert({
                        where: { primaryShiftID: shiftIDNumeric },
                        update: data,
                        create: data
                })
                return new Response(JSON.stringify(shift))
        } catch (error) {
                if (error instanceof Prisma.PrismaClientValidationError) {
                        return new Response('Error: ' + error.message, { status: 400, })
                } else {
                        return new Response('Error: An unexpected error occured', { status: 500, })
                }
        }
}


/* 
 * DELETEs a primary shift from the database
 * Expects an integer shiftID to be provided as a query parameter 
 */
export async function DELETE(req: NextRequest) {
        try {
                const searchParams = req.nextUrl.searchParams
                let idString = searchParams.get('shiftID')
                let idNum = parseInt(idString as string, 10) // 10 = base 10 

                if ((isNaN(idNum))) {
                        return new Response('Error: Please specify an integer shift id', {
                                status: 400,
                        })
                }

                let shift = await prisma.primaryShift.delete({
                        where: {
                                primaryShiftID: idNum,
                        },
                })
                return Response.json(shift)
        } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError &&
                        error.code === 'P2025') {
                        return new Response('Error: Shift not found', {
                                status: 400,
                        })
                } else {
                        return new Response('Error: An unexpected error occured', { status: 500, })
                }
        }
}

