'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import CalendarModalButton from "../../components/CalendarModalButton";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const Calendar: React.FC = ()  => {
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={CalendarModalButton}/></ThemeProvider>)
};

export default Calendar;



// /* 
//  *      Calendar Page overview 
//  * 
//  *      Author:  Bill Soronzonbold 
//  *      Date:    10/31/2023  
//  *      comp(s): Calendar Modal Button and Calendar Modal
//  */ 

// import CalendarModalButton from "@/app/components/CalendarModalButton"

// export default function Home() {
//     return (
//         <div className="center">
//             <CalendarModalButton/>
//         </div>
//     )
// }
