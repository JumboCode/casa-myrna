"use client"

import { FC} from 'react'
import { SignIn } from "@clerk/nextjs";
import "../login/[[...login]]/login.css" 
import React from 'react';

const LoginForm: FC = ({ }) => {
    return <div style={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",  
        background: "linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%)",
        height: "100vh",
        width: "auto",
        padding: 0, 
    }}>
        <SignIn initialValues={{
            
        }} />
    </div>
}

export default LoginForm