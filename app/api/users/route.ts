import type { NextApiRequest, NextApiResponse } from 'next'
import { clerkClient } from '@clerk/nextjs';
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

/* 
 * GETs a list of users from the database. Users can be filtered by their 
 * emails and usernames
 * Expects a username to be provided as a query parameter 
 */
export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams
    let username = searchParams.get('username')
    let email = searchParams.get('emailAddress')
    let queryFilters: { [key: string]: any } = {}
    if (username){
      queryFilters["username"] = [username]
    }
    if (email){
      queryFilters["emailAddress"] = [email]
    }
    try {
      const users = await clerkClient.users.getUserList(queryFilters);
      return Response.json(users)
    } catch {
      return new Response('Error: user not found', {
        status: 404,
      })
    }
}

/* 
 * Inserts a new user into the database
 * Expects the request body to be json with the fields username, password,
 * firstName, lastName, pronouns, role, emailAddress & phoneNumber
 */
export async function POST(req: Request) {
  try {
    let data = await req.json();
    if (!('username' in data && 'password' in data && 'firstName' in data &&
          'lastName' in data && 'pronouns' in data && 'emailAddress' in data &&
          'phoneNumber' in data && 'role' in data)){
      return new Response('Error: Missing required field', {
        status: 404,
      })
    } 

    const user = await clerkClient.users.createUser({
      // emailAddress: data.emailAddress,
      // phoneNumber: data.phoneNumber,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: {pronouns: data.pronouns, role: data.role}
    });
    return new Response(JSON.stringify(user))
  } catch (error){
      return new Response('Error: An unexpected error occured', {status: 500,})
    }
  }

/* 
 * Upserts a user into the database
 * Expects an integer id to be provided as a query parameter 
 * Expects the request body to be json with the fields username, firstName, 
 * lastName, pronouns, role, and created_at, with these fields corresponding 
 * to the fields in the user model in schema.prisma
 */
export async function PUT(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    let idString = searchParams.get('id')
    if (!idString) {
      return new Response('Error: Please specify a Clerk User ID', {
      status: 400,
    })
  }
    try {
      let data = await req.json();
      const user = await clerkClient.users.updateUser(idString, data);
      return new Response(JSON.stringify(user))
    } catch {
      return new Response('Error: An unexpected error occured', {status: 500,})
    }
  }

// /* 
//  * DELETEs a user from the database
//  * Expects an integer id to be provided as a query parameter 
//  */
// export async function DELETE(req: NextRequest) {
//   try {
//     const searchParams = req.nextUrl.searchParams
//     let idString = searchParams.get('id')
//     let idNum = parseInt(idString as string, 10) // 10 = base 10 

//     if ((isNaN(idNum))) {
//       return new Response('Error: Please specify an integer user id', {
//         status: 400,
//       })
//     }

//     const user = await prisma.user.delete({
//       where: {
//         id: idNum,
//       },
//     })

//     return Response.json(user)
//  } catch (error) {
//      if (error instanceof Prisma.PrismaClientKnownRequestError && 
//          error.code === 'P2025') {
//       return new Response('Error: Error: User not found', {
//         status: 400,
//       })
//     } else {
//         return new Response('Error: An unexpected error occured', {status: 500,})
//     }
//     }   
//  }