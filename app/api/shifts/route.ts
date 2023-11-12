import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()


/* 
 * GETs a shift from the database
 * Expects an integer id and a status to be provided as a query parameter 
 */
export async function GET(req: NextRequest)
{
        try {
                const searchParams = req.nextUrl.searchParams
                const primaryUserID = searchParams.get('primaryUserID')
                const status = searchParams.get('status')
                const primaryUserID_numeric = primaryUserID ? parseInt(primaryUserID as string, 10): null;
                console.log(primaryUserID_numeric)
                if (isNaN(primaryUserID_numeric as number)) {
                        return new Response('Error: Please specify an integer primary user id', {
                          status: 400,
                        })
                      }

                let queryFilters = null
                if (primaryUserID_numeric && status){
                        queryFilters = {
                                AND: [
                                        { primaryUserID: primaryUserID_numeric},
                                        { status: status }
                                ]
                        }
                } else if (primaryUserID_numeric) {
                        queryFilters = {primaryUserID: primaryUserID_numeric}
                } else if (status) {
                        queryFilters = { status: status }
                } else {
                        let error_msg = "Error: Include a primaryUserID and/or \
                                         status as query parameters"
                        return new Response(error_msg, {status: 400,})  
                } 
        
                let shifts = await prisma.shift.findMany({where: queryFilters})
                return new Response(JSON.stringify(shifts))
        } catch {
                return new Response('Error: An unexpected error occured', {
                        status: 500,
                      })
        }
}


/* 
 * Inserts a new shift into the database
 * Expects the request body to be json with fields corresponding to the fields 
 * of the Shift model
 */
export async function POST(req: NextRequest)
{
        try {
                let data = await req.json();
                data = {
                ...data,
                "date": new Date(data.date),
                "from": new Date(data.from),
                "to": new Date(data.to),
                "created_at": new Date(data.created_at)
                };
                const shift = await prisma.shift.create({data});
                return new Response(JSON.stringify(shift))
        } catch {
                return new Response('Error: An unexpected error occured', {
                        status: 500,
                      })
        }
}




/* 
 * Create a shift and insert into the database
 * Expects the request body to be json with shiftID, backupUserID, primaryUserID,
 * date, from, to
 */