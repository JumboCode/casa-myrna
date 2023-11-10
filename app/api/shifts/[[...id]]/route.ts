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
                if (primaryUserID_numeric && (isNaN(primaryUserID_numeric))) {
                        return new Response('Error: Please specify an integer primary user id', {
                          status: 400,
                        })
                      }
               
                /* There might be a better way to write the following control flow */
                if (primaryUserID_numeric && status) {
                        const shifts = await prisma.shift.findMany({
                                where: {
                                        AND: [
                                                { primaryUserID: primaryUserID_numeric },
                                                { status: status }
                                        ]
                                }
                        })
                } else if (primaryUserID_numeric) {
                        const shifts = await prisma.shift.findMany({
                                where: {
                                        AND: [
                                                { primaryUserID: primaryUserID_numeric }
                                        ]
                                }
                        })

                } else if ( status) {
                        const shifts = await prisma.shift.findMany({
                                where: {
                                        AND: [
                                                { status: status }
                                        ]
                                }
                        })
                } else {
                    return new Response('Error: Include a prumary==', {
                                status: 400,
                              })
                }
                
                if (!shifts) {
                        return new Response('Error, Shift not found', {
                                status: 404,
                        })
                }
                return ReportingObserver.json(shifts)
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