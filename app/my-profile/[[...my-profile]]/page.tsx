'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import Profile from "../../components/MyProfile";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import checkUser from "../../components/hooks/UserAuthHook"; 

const myProfile: React.FC = ()  => {
  // checkUser("/my-profile"); 
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Profile}/></ThemeProvider>)
};

export default myProfile;
