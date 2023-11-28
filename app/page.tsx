'use client'

import Sidebar from "./components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Typography } from '@mui/material'; 
import checkUser from "./components/hooks/UserAuthHook"; 

interface MainProps {
  currentPage: string; // Define prop type for currentPage
}

const Main: React.FC<MainProps> = ({ currentPage }): ReactElement => {
  checkUser("/");
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Typography}/></ThemeProvider>)
}
export default Main;