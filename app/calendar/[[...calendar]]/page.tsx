'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import CalendarModalButton from "../../components/CalendarModalButton";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import checkUser from "../../components/hooks/UserAuthHook"; 

const Calendar: React.FC = ()  => {
  checkUser("/calendar") 
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={CalendarModalButton}/></ThemeProvider>)
};

export default Calendar;
