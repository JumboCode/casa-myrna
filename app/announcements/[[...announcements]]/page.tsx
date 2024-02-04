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

const Announcements: React.FC = () => {
  return ( <Protect role="org:admin:employee" fallback={<p>Only an admin or employee can access this content.</p>}>
    <ThemeProvider theme={theme}>
      {/* <Sidebar currentPageComponent={AnnouncementsModalButton} /> */}
      <Sidebar currentPageComponent={AnnouncementList} />
      {/* <Sidebar currentPageComponent={Announcement} /> */}
    </ThemeProvider>
    </Protect>
  );
};

export default Announcements;
