import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/* 
 * GETS a user from the database
 * Expects an integer id to be provided as a path parameter 
 */
export async function GET(req: Request,
  { params }: { params: { id: string } }) {
  try {
    let idString = params.id
    let idNum = parseInt(idString as string, 10) // 10 = base 10 

    if ((isNaN(idNum))) {
      return new Response('Error: Please specify an integer user id', {
        status: 400,
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: idNum,
      },
    })

    if (!user) {
      return new Response('Error: User not found', {
        status: 404,
      })
    }
    return Response.json(user)
 } catch {
     return new Response('Error: An unexpected error occured', {
       status: 500,
     })
 }
}
