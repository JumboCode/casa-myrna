"use client"
import { FC, ReactElement, useEffect, useState } from 'react';
import "../globals.css";
import HamburgerBarDesktop from "./HamburgerBarDesktop";
import HamburgerBarMobile from './HamburgerBarMobile';

interface SidebarProps {
  currentPageComponent: FC;
}

const Sidebar: FC<SidebarProps> = ({ currentPageComponent }): ReactElement => {

  const CurrentComponent = currentPageComponent;

  /* abstracted the isMobile into a use effect because of the undefined error */
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, [])

  return (
    <>
      {(isMobile) ? (
        <HamburgerBarMobile currentPageComponent={CurrentComponent} />
      ) : (
        <HamburgerBarDesktop currentPageComponent={CurrentComponent} />
      )}

    </>
  )
};

export default Sidebar;

