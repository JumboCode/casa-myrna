"use client";

import Sidebar from "../../components/Sidebar";
import React, { useState, useEffect, ReactElement } from "react";
import AnnouncementsModalButton from "../../components/AnnouncementsModalButton";
import AnnouncementList from "../../components/AnnouncementList";
import Announcement from "../../components/announcements";
import "../../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";

const Announcements: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Sidebar currentPageComponent={AnnouncementsModalButton} /> */}
      <Sidebar currentPageComponent={AnnouncementList} />
      {/* <Sidebar currentPageComponent={Announcement} /> */}
    </ThemeProvider>
  );
};

export default Announcements;
