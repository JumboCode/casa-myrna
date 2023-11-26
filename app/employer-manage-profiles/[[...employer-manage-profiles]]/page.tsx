'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import ManageProfiles from "../../components/manageProfiles";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

const employerManageProfiles: React.FC = ()  => {
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={ManageProfiles}/></ThemeProvider>)
};

export default employerManageProfiles;
