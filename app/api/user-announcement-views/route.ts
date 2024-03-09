import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import { Announcement } from '@mui/icons-material';
const prisma = new PrismaClient()


/* TODO: change comments 
 * GETs a user-announcement-view from the database. 
 * 
 */
export async function GET(req: NextRequest) {
    /* date range */
    const searchParams   = req.nextUrl.searchParams
    const userID         = searchParams.get('userID')  
    const announcementID = searchParams.get('announcementID')
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
    if (startBound){
        queryFilters.AND.push({date : {gte: startBoundDate,}})
    }
    if (endBound) {
            queryFilters.AND.push({date : {lte: endBoundDate,}})
    }
    let annoucements = await prisma.Announcement.findMany({where: queryFilters})
    return new Response(JSON.stringify(annoucements))
}



/* 
 * Inserts a new announcement into the database
 * Expects the request body to be json with the fields:
 *      
 */
export async function POST(req: Request) {
    // try {
        let data = await req.json();
        data = {
            ...data,
        };
        const shift = await prisma.UserAnnouncementView.create({data});
        return new Response(JSON.stringify(shift))
    // } catch (error) {
         return new Response('Error: An unexpected error occured', {
             status: 500,
         })
    // }
}

/* 
 * DELETEs a user from the database
 * Expects an Clerk user id to be provided as a query parameter 
 */
  export async function DELETE(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        let idString = searchParams.get('announcementID')
        let idNum = parseInt(idString as string, 10) // 10 = base 10 
    
        if ((isNaN(idNum))) {
          return new Response('Error: Please specify an integer announcement id', {
            status: 400,
          })
        }
    
        let announcement = await prisma.Announcement.delete({
          where: {
            announcementID: idNum,
          },
        })
        return Response.json(announcement)
     } catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError && 
             error.code === 'P2025') {
          return new Response('Error: Announcement not found', {
            status: 400,
          })
        } else {
            return new Response('Error: An unexpected error occured', {status: 500,})
        }
        }   
}