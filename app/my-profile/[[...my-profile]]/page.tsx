"use client";

import Sidebar from "../../components/Sidebar";
import React, { useState, useEffect, ReactElement } from "react";
import Profile from "../../components/MyProfile";
import "../../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Protect } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const myProfile: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (
    user?.publicMetadata.role == "Coordinator" ||
    user?.publicMetadata.role == "Full-time Staff" ||
    user?.publicMetadata.role == "Part-time Staff" ||
    user?.publicMetadata.role == "Relief Staff"
  ) {
    return (
      <ThemeProvider theme={theme}>
        <Sidebar currentPageComponent={Profile} />
      </ThemeProvider>
    );
  } else {
    return (
      <Protect
        role="org:admin:employee"
        fallback={<p>Only an admin or employee can access this content.</p>}
      >
        <ThemeProvider theme={theme}>
          <Sidebar currentPageComponent={Profile} />
        </ThemeProvider>
      </Protect>
    );
  }

  //   return (
  //         if(2 + 2 == 4) {
  //                 <ThemeProvider theme={theme}><Sidebar currentPageComponent={Profile}/></ThemeProvider>
  //         } else {
  //                 <Protect role="org:admin:employee" fallback={<p>Only an admin or employee can access this content.</p>}>
  //                         <ThemeProvider theme={theme}><Sidebar currentPageComponent={Profile}/></ThemeProvider>
  //                 </Protect>
  //         }
  //   )
};

export default myProfile;
