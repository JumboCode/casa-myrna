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
    const searchParams         = req.nextUrl.searchParams
    const userID               = searchParams.get('userID')  
    const announcementIDString = searchParams.get('announcementID')
    let announcementID = parseInt(announcementIDString as string, 10)
    if (announcementIDString && (isNaN(announcementID))) {
      return new Response('Error: Invalid announcementID', {
              status: 400,
      })
    }
    
    let queryFilters  = {
        AND: [{}]
    }
    if (userID){
        queryFilters.AND.push({userID : userID})
    }
    if (announcementID) {
        queryFilters.AND.push({announcementID : announcementID})
    }
    let annoucements = await prisma.userAnnouncementView.findMany({where: queryFilters})
    return new Response(JSON.stringify(annoucements))
}

/* 
 * Inserts a new announcement into the database
 * Expects the request body to be json with the fields:
 *      
 */
export async function POST(req: Request) {
    try {
        let data = await req.json();
        data = {
            ...data,
        };
        const shift = await prisma.userAnnouncementView.create({data});
        return new Response(JSON.stringify(shift))
    } catch (error) {
         return new Response('Error: An unexpected error occured', {
             status: 500,
         })
    }
}