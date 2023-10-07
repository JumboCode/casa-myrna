"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import React from "react";


export default function Component() {
  const { data: session } = useSession()
  if (session?.user) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
