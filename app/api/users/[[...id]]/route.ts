import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
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

/* 
 * Inserts a new user into the database
 * Expects json with the fields username, firstName, lastName, pronouns, role, 
 * and created_at, with these fields corresponding to the fields in the user
 * model in schema.prisma
 */
export async function POST(req: Request) {
  try {
    let data = await req.json();
    data = {
      ...data,
      "created_at": new Date(data.created_at)
    };
    const user = await prisma.user.create({data});
    return new Response(JSON.stringify(user))
  } catch (error){
    if (error instanceof Prisma.PrismaClientValidationError) {
      return new Response('Error: ' + error.message, {status: 400,})
    } else {
      return new Response('Error: An unexpected error occured', {status: 500,})
    }
  }
}