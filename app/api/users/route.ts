import type { NextApiRequest, NextApiResponse } from 'next'
import { clerkClient } from '@clerk/nextjs';
import { type NextRequest } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()


interface ErrorResponse {
  clerkError: boolean;
  status: number;
  errors: ErrorItem[];
}

interface ErrorItem {
  code: string;
  message: string;
  longMessage: string;
  meta: Record<string, any>; 
}

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
    if (!('firstName' in data &&
          'lastName' in data && 'pronouns' in data && 'emailAddress' in data &&
          'phoneNumber' in data && 'role' in data)){
      return new Response('Error: Missing required field', {
        status: 404,
      })
    } 

    const user = await clerkClient.users.createUser({
      emailAddress: [data.emailAddress],
      firstName: data.firstName,
      lastName: data.lastName,
      publicMetadata: {pronouns: data.pronouns, role: data.role, phoneNumber: data.phoneNumber}
    });
    return new Response(JSON.stringify(user))
  } catch (error){
      const errorMessage: string = JSON.parse(JSON.stringify(error)).errors[0].longMessage;
      return new Response('Error: ' + errorMessage, {status: 500,})
    }
  }

/* 
 * Updates a user in the database
 * Expects an Clerk id to be provided as a query parameter 
 * Expects the request body to be json with the fields that should be updated
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

/* 
 * DELETEs a user from the database
 * Expects an Clerk user id to be provided as a query parameter 
 */
  export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    let idString = searchParams.get('id')
    if (!idString) {
      return new Response('Error: Please specify a Clerk User ID', {
      status: 400,
    })
  }
    try {
      let user = await clerkClient.users.deleteUser(idString);
      return new Response(JSON.stringify(user))
    } catch {
      return new Response('Error: User could not be found', {status: 500,})
    }
  }