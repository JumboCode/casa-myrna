'use client'

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement } from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";
import theme from './theme';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';


const Main = () => {
  return (<ThemeProvider theme={theme}><Router><Sidebar currentPageComponent={Typography}/></Router></ThemeProvider>)
};

export default Main;