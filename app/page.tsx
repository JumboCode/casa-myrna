'use client'

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import theme from './theme';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Cal from "./components/Calendar"
import { Protect, useUser } from '@clerk/nextjs';


const Main = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (
    user?.publicMetadata.role == "Coordinator" ||
    user?.publicMetadata.role == "Full-time Staff" ||
    user?.publicMetadata.role == "Part-time Staff" ||
    user?.publicMetadata.role == "Relief Staff"
  ) {
    return (
      <ThemeProvider theme={theme}>
        <Sidebar currentPageComponent={Cal} />
      </ThemeProvider>
    );
  } else {
    return (
      <Protect
        role="org:admin:employee"
        fallback={<p>Only an admin or employee can access this content.</p>}
      >
        <ThemeProvider theme={theme}>
          <Sidebar currentPageComponent={Cal} />
        </ThemeProvider>
      </Protect>
    );
  }
};

export default Main;