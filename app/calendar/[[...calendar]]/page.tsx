'use client'

import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import CalendarModalButton from "../../components/CalendarModalButton";
import Sidebar from "../../components/Sidebar";
import "../../globals.css";
import theme from '../../theme';

const Calendar: React.FC = () => {

  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={CalendarModalButton} /></ThemeProvider>)
};

export default Calendar;
