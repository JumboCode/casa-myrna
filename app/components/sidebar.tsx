"use client"
import * as React from 'react';
import HamburgerBarDesktop from "./HamburgerBarDesktop"
import HamburgerBarMobile from './HamburgerBarMobile';
import { FC, ReactElement } from 'react';
import "../globals.css"
import theme from '../theme';

interface SidebarProps {
  currentPageComponent: FC;
}

const Sidebar: FC<SidebarProps> = ({ currentPageComponent }): ReactElement => {
  const CurrentComponent = currentPageComponent;

  const isMobile: boolean = window.innerWidth > 768; 

  return (
    <>
      {(false) ? ( 
         <HamburgerBarMobile currentPageComponent={CurrentComponent}/>
      ) : (
        <HamburgerBarDesktop currentPageComponent={CurrentComponent}/>
      )}
      
    </>
  )
};

export default Sidebar;

