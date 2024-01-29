import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
      /******************************************
       * todo: remove the api route from public * 
       ******************************************/ 
      publicRoutes: ["/login", "/sign-up", "/api/shifts"],

      afterAuth(auth, req, evt) {

            if (!auth.userId && !auth.isPublicRoute) {
                  const loginUrl = new URL("/login", req.url);  
                  return NextResponse.redirect(loginUrl);
            }

            if (auth.userId && req.nextUrl.pathname === "/login") {
                  const home = new URL("/", req.url);  
                  return NextResponse.redirect(home);
            }

            if (auth.userId && req.nextUrl.pathname === "/sign-up") {
                  const home = new URL("/", req.url);  
                  return NextResponse.redirect(home);
            }

            return NextResponse.next(); 
      }
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
