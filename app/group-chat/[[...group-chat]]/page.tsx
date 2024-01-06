'use client'

import Sidebar from "../../components/Sidebar"; 
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { Typography } from '@mui/material'

const Groupchat: React.FC = ()  => {

  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Typography}/></ThemeProvider>)
};

export default Groupchat;