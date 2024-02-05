'use client'

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from "react";
import Sidebar from "./components/sidebar";
import "./globals.css";
import theme from './theme';

const Main = () => {
  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Typography}/></ThemeProvider>)
};

export default Main;