import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Announcements from "app/images/2.png";
import Calendar from "app/images/3.png";
import Groupchat from "app/images/4.png";
import Profile from "app/images/7.png";
import Logout from "app/images/5.png";
import Image from "next/image";
import Logo from "app/images/1.png";
import Hamburger from "app/images/hamburger.png";
import HamburgerBarDesktop from "./HamburgerBarDesktop"
import HamburgerBarMobile from './HamburgerBarMobile';
import { FC, ReactElement } from 'react';
import { SignOutButton } from "@clerk/nextjs";
import "../globals.css"

interface SidebarProps {
  currentPageComponent: FC; // Update prop type to React Functional Component
}

const Sidebar: FC<SidebarProps> = ({ currentPageComponent }): ReactElement => {
  const CurrentComponent = currentPageComponent;
  const isMobile: boolean = window.innerWidth < 768;
  return (
    <>
      {(isMobile) ? ( 
         <HamburgerBarMobile currentPageComponent={CurrentComponent}/>
      ) : (
        <HamburgerBarDesktop currentPageComponent={CurrentComponent}/>
      )}
      
    </>
  )
};

export default Sidebar;

