import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { PrintTwoTone, Update } from '@mui/icons-material'
import emailHandler from "../../lib/email"
import { clerkClient } from '@clerk/nextjs'
const prisma = new PrismaClient()


/* 
 * GETs a shift from the database
 * A userID, status, and/or after/before times can be provided as query params 
 * to filter results
 */
export async function GET(req: NextRequest)
{
                const searchParams = req.nextUrl.searchParams
                const userID = searchParams.get('userID')
                const status = searchParams.get('status')

                const startBound = searchParams.get('after')  
                const endBound = searchParams.get('before')
                const startBoundDate = startBound ? new Date(startBound): null
                const endBoundDate = endBound ? new Date(endBound): null
                
                if ((startBoundDate && isNaN(startBoundDate.getTime())) || 
                           (endBoundDate && isNaN(endBoundDate.getTime()))) {
                        return new Response('Error: after & before fields must be valid dates', {
                                status: 400,
                        })
                }
                
                let queryFilters  = {
                        AND: [{}]
                }
                if (userID){
                        queryFilters.AND.push({ userID: userID})
                }
                if (status){
                        queryFilters.AND.push({ status: status})
                }
                if (startBound){
                        queryFilters.AND.push({from : {gte: startBoundDate,}})
                }
                if (endBound) {
                        queryFilters.AND.push({to : {lte: endBoundDate,}})
                }

                let shifts = await prisma.primaryShift.findMany({where: queryFilters})
                return new Response(JSON.stringify(shifts))
}


/* 
 * Inserts a new primary shift into the database
 * Expects the request body to be json with fields corresponding to the fields 
 * of the Shift model
 */
export async function POST(req: NextRequest)
{
        console.log("IN POST\n")
        try {
                console.log(typeof req)
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
                const shift = await prisma.primaryShift.create({data});
                return new Response(JSON.stringify(shift))
        } catch (error) {
                return new Response('Error: An unexpected error occured', {
                        status: 500,
                      }
                )
        }
}

/* 
 * Upserts a new shift into the database
 * Expects the request body to be json with fields corresponding to the fields 
 * of the Shift model. Also requires shiftID as a query param
 */
export async function PUT(req: NextRequest)
{
        console.log("IN PUT\n")

        // try {
                const searchParams = req.nextUrl.searchParams

                const shiftID = searchParams.get('shiftID')
                const shiftIDNumeric = shiftID ? parseInt(shiftID, 10): null;
                if (!shiftIDNumeric){
                        return new Response('Error: An shiftID must be provided as a query parameter', {status: 500,})
                }

                let data = await req.json();
                console.log(data)
                data = {
                        ...data,
                        "primaryShiftID": shiftIDNumeric,
                        "date": new Date(data.date),
                        "from": new Date(data.from),
                        "to": new Date(data.to),
                        "created_at": new Date(data.created_at)
                };

                console.log(data["status"] === "PENDING")
                
                // filtering users based on admin status
                const admins : (string | undefined) [] = await clerkClient.users.getUserList()
                        .then((adminList) => {
                                return adminList.filter((curr) => {
                                                return curr.publicMetadata.role === "Coordinator"; 
                                        }).map((curr) => {
                                                return curr.emailAddresses[0].emailAddress; 
                                        }); 
                        }).catch((err) => {
                                throw new Error("FAILED TO FETCH USERS " + err.message); 
                        })


                // get old state of shift
                let oldShift = await prisma.primaryShift.findUnique({
                        where : {
                                primaryShiftID : data["primaryShiftID"]
                        }
                })
               
                if (!oldShift){
                        throw  new Error("FAILED TO SHIFT BEFORE MODIFICATION"); 
                }

                const updater = await clerkClient.users.getUser(oldShift.userID)
                
                
                 if (!updater.emailAddresses[0].emailAddress) {
                        throw new Error("FAILED TO SHIFT USER WHO'S UPDATING SHIFT"); 
                }
                
                const shift = await prisma.primaryShift.upsert({
                        where: {primaryShiftID: shiftIDNumeric },
                        update: data,
                        create: data
                      })

                const employeName = updater['firstName'] + " " + updater['lastName']; 

                
                
                if (data["status"] === "PENDING") {

                        console.log("are we here?");
                       
                        // To all admin: "[Employee name] has requested the shift on [date/time]. Approve this shift to assign it to [employee name]."
                        // To the employee who requested the shift: "You have requested the shift on [date/time]. A coordinator will approve or cancel this request."
                
                        await emailHandler({
                                emailTo: [updater.emailAddresses[0].emailAddress],
                                content: `You have requested the shift at ${data['from']}. A coordinator will approve or cancel this request`, 
                                subject: "SHIFT " + oldShift?.primaryShiftID + " STATUS UPDATE - PENDING" 
                        })
                        
                        await emailHandler({
                                emailTo: admins,
                                content: `${employeName} has requested the shift on ${data['from']}. Approve this shift to assign it to ${employeName}`, 
                                subject: "SHIFT " + oldShift?.primaryShiftID + " STATUS UPDATE - PENDING" 
                        });         
                } 
                // else if (data["status"] === "ACCEPTED"){

                // } 
                // else if (data["status"] === "CANCELLED"){
                        
                //         await emailHandler({
                //                 emailTo: [],
                //                 content: "has requested the shift on [date/time]. Approve this shift to assign it to", 
                //                 subject: "SHIFT " + oldShift?.primaryShiftID + " STATUS UPDATE - CANCELLED" 
                //         });   
                        
                //         if (oldShift?.status == "PENDING"){
                                
                //         } else if (oldShift?.status == "ACCEPTED"){

                //         }
                // } 
                        


                return new Response(JSON.stringify(shift))
        // } catch (error) {
        //         if (error instanceof Prisma.PrismaClientValidationError) {
        //                 return new Response('Error: ' + error.message, {status: 400,})
        //         } else {
        //                 return new Response('Error: An unexpected error occured', {status: 500,})
        //         }
        // }
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
              return new Response('Error: An unexpected error occured', {status: 500,})
          }
        }   
}

