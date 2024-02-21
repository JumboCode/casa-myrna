"use client";
import Sidebar from "../../components/Sidebar";
import React, { useState, useEffect, ReactElement } from "react";
import AnnouncementsModalButton from "../../components/AnnouncementsModalButton";
import AnnouncementList from "../../components/AnnouncementList";
import Announcement from "../../components/announcements";
import "../../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Protect } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Announcements: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (
    user?.publicMetadata.role == "Coordinator" ||
    user?.publicMetadata.role == "Full-time Staff" ||
    user?.publicMetadata.role == "Part-time Staff" ||
    user?.publicMetadata.role == "Relief Staff"
  ) {
    return (
      <ThemeProvider theme={theme}>
        <Sidebar currentPageComponent={AnnouncementList} />
      </ThemeProvider>
    );
  } else {
    return (
      <Protect
        role="org:admin:employee"
        fallback={<p>Only an admin or employee can access this content.</p>}
      >
        <ThemeProvider theme={theme}>
          <Sidebar currentPageComponent={AnnouncementList} />
        </ThemeProvider>
      </Protect>
    );
  }
};

export default Announcements;
