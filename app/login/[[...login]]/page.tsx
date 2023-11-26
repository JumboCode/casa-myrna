'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import LoginForm from "../../components/LoginForm";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const Login: React.FC = ()  => {
  return (<ThemeProvider theme={theme}><LoginForm></LoginForm></ThemeProvider>)
};

export default Login;

// /* 
//  *      Login Page overview 
//  * 
//  *      Author:  Bill Soronzonbold 
//  *      Date:    11/13/2023  
//  *      
//  *      Contains the login component and page. 
//  */ 

// import LoginForm from "@/app/components/LoginForm"

// export default function Home() {
//     return (
//         <LoginForm />
//     )
// }