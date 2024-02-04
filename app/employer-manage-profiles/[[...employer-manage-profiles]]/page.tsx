'use client'

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import ManageProfiles from "../../components/ManageProfiles";
import "../../globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { Protect } from "@clerk/nextjs";

const employerManageProfiles: React.FC = ()  => {
  return (<Protect> role="org:admin" fallback={<p>Only an admin can access this content.</p>}
              <ThemeProvider theme={theme}><Sidebar currentPageComponent={ManageProfiles}/></ThemeProvider>
          </Protect>)
};

export default employerManageProfiles;

