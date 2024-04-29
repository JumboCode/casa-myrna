'use client'

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import theme from './theme';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Cal from "./components/Calendar"


const Main = () => {
  return (<ThemeProvider theme={theme}><Router><Sidebar currentPageComponent={Cal}/></Router></ThemeProvider>)
};

export default Main;