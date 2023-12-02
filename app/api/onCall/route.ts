import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()



/* 
 * 
 */
export async function POST(req: Request) {
    // try {
      let data = await req.json();
      if (!('userID' in data && 'date' in data && 'from' in data && 'to' in data 
            && 'message' in data && 'phoneLine' in data)){
        return new Response('Error: Missing required field', {
          status: 404,
        })
    } 
        data = {
                ...data,
                "date": new Date(data.date),
                "from": new Date(data.from),
                "to": new Date(data.to),
                "created_at": new Date()
        };
        const shift = await prisma.onCallShift.create({data});
        return new Response(JSON.stringify(shift))
    // } catch (error){
    //     return new Response('Error: An unexpected error occured', {status: 500,})
    //   }
    }

/* 
 * GETs a shift from the database
 * Expects an integer userid and a status to be provided as a query parameter 
 */
export async function GET(req: NextRequest)
{
        try {
                const searchParams = req.nextUrl.searchParams
                const onCallShiftID = searchParams.get('onCallShiftID')
                // const status = searchParams.get('status')
                const onCallShiftID_numeric = onCallShiftID ? parseInt(onCallShiftID as string, 10): null;
                
                console.log(onCallShiftID_numeric)
                if (isNaN(onCallShiftID_numeric as number)) {
                        return new Response('Error: Please specify an integer primary user id', {
                          status: 400,
                        })
                      }

                let queryFilters = null
                if (onCallShiftID_numeric){
                        queryFilters = {
                                AND: [
                                        { onCallShiftID: onCallShiftID_numeric}
                                ]
                        }
                } else {
                    let error_msg = "Error: Include a primaryUserID and/or \
                                      status as query parameters"
                    return new Response(error_msg, {status: 400,})  
                } 
        
                let shifts = await prisma.onCallShift.findMany({where: queryFilters})
                return new Response(JSON.stringify(shifts))
        } catch {
                return new Response('Error: An unexpected error occured', {
                        status: 500,
                      })
        }
}

