import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs"  
import { redirect } from "next/navigation" 

/* 
 * 1. protect routes
 * 2. show a permission denied page with button to login 
 * 3. login -> login again should not work
 */ 


const checkUser = (currUrl: string) => {
    const { isSignedIn, sessionId } = useAuth();

    console.log(isSignedIn);
    // redirect("/login");
    useEffect(() => {
        if (!isSignedIn) {
            return redirect("/"); 
        }
    }, []) 
}

export default checkUser  