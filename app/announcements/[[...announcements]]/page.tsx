'use client'

import Sidebar from "../../components/Sidebar"; 
import * as React from 'react';
import { FC, ReactElement } from 'react';
import "../../globals.css"
import theme from '../../theme';
import AnnouncementList from "../../components/AnnouncementList";
import AnnouncementListMobile from "../../components/AnnouncementListMobile";
import AnnouncementsModalButton from "../../components/AnnouncementsModalButton";
import { ThemeProvider } from '@mui/material/styles';

interface AnnouncementProps {
  currentPageComponent: FC;
}

const Announcements: FC<AnnouncementProps> = ({ currentPageComponent }): ReactElement => {
  const CurrentComponent = currentPageComponent;
  const isMobile: boolean = window.innerWidth < 768;

  return (
    <>
      {(isMobile) ? ( 
        <ThemeProvider theme={theme}><Sidebar currentPageComponent={AnnouncementListMobile}/></ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}><Sidebar currentPageComponent={AnnouncementList}/></ThemeProvider>
      )}
      
    </>
  )
};

export default Announcements;