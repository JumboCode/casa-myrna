
import React from "react";
import { ClerkProvider } from '@clerk/nextjs'
 
export const metadata = {
  title: 'Shift Manager',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}