'use client'

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import theme from './theme';

interface MainProps {
  currentPage: string; // Define prop type for currentPage
}

const Main: React.FC<MainProps> = ({ currentPage }): ReactElement => {  

  return (<ThemeProvider theme={theme}>
      <Sidebar currentPageComponent={Typography}/> 
    </ThemeProvider>)
};

export default Main;