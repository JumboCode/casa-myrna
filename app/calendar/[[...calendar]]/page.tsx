'use client'

import { ThemeProvider } from '@mui/material/styles';
import React from "react";
// import CalendarModalButton from "../../components/CalendarModalButton";
import Cal from "../../components/Calendar";
import Sidebar from "../../components/Sidebar";
import "../../globals.css";
import theme from '../../theme';

const Calendar: React.FC = () => {
  // return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={CalendarModalButton} /></ThemeProvider>)
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Cal} /></ThemeProvider>)
};

export default Calendar;
