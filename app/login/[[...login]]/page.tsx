'use client'

import { ThemeProvider } from '@mui/material/styles';
import React from "react";
import LoginForm from "../../components/LoginForm";
import "../../globals.css";
import theme from '../../theme';

const Login: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
        <LoginForm />
    </ThemeProvider>)
};

export default Login;
