'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import AnnouncementsModalButton from "../../components/AnnouncementsModalButton";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import checkUser from "../../components/hooks/UserAuthHook"; 

const Announcements: React.FC = ()  => {
  checkUser("/announcements")
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={AnnouncementsModalButton}/></ThemeProvider>)
};

export default Announcements;