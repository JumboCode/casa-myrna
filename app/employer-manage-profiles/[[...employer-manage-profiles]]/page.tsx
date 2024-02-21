"use client";

import Sidebar from "../../components/Sidebar"; 
import React, { useState, useEffect, ReactElement } from "react";
import ManageProfiles from "../../components/ManageProfiles";
import "../../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Protect } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const employerManageProfiles: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (user?.publicMetadata.role == "Coordinator") {
    return (
      <ThemeProvider theme={theme}>
        <Sidebar currentPageComponent={ManageProfiles} />
      </ThemeProvider>
    );
  } else {
    return (
      <Protect
        role="org:admin:employee"
        fallback={<p>Only an admin or employee can access this content.</p>}
      >
        <ThemeProvider theme={theme}>
          <Sidebar currentPageComponent={ManageProfiles} />
        </ThemeProvider>
      </Protect>
    );
  }
};

export default employerManageProfiles;
