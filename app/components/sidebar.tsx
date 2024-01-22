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
  const [isMobile, setMobile] = useState(false);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 768);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

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

