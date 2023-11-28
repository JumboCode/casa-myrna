'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import ManageProfiles from "../../components/manageProfiles";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import checkUser from "../../components/hooks/UserAuthHook"; 

const employerManageProfiles: React.FC = ()  => {
  checkUser("/employer-manage-profiles")
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={ManageProfiles}/></ThemeProvider>)
};

export default employerManageProfiles;
