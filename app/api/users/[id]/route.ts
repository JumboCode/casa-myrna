import type { NextApiRequest, NextApiResponse } from 'next'
import { type NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(req: Request,
  { params }: { params: { id: string } }) {

  let idString = params.id
  let idNum = parseInt(idString as string, 10) // 10 = base 10 
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
}


