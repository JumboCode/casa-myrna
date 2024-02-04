'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import Profile from "../../components/MyProfile";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { Protect } from "@clerk/nextjs";

const myProfile: React.FC = ()  => {

  return (<Protect role="org:admin:employee" fallback={<p>Only an admin or employee can access this content.</p>}>
          <ThemeProvider theme={theme}><Sidebar currentPageComponent={Profile}/></ThemeProvider>
          </Protect>)
};

export default myProfile;
