  "use client"

import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Announcements from "../images/5.png"
import Calendar from "app/images/3.png";
import Groupchat from "app/images/4.png";
import Profile from "app/images/7.png";
import Logout from "app/images/5.png";
import Image from "next/image";
import { FC, useState} from 'react'
import Logo from "app/images/1.png";
import { Stack } from '@mui/material';
import React from 'react';
import { SignOutButton, useClerk } from '@clerk/nextjs';

interface DesktopBarProps {
    currentPageComponent: FC; // Update prop type to React Functional Component
  }
const HamburgerBarDesktop: FC<DesktopBarProps> = ({ currentPageComponent }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const CurrentComponent = currentPageComponent;
    const { signOut } = useClerk(); 

    return(
        <Stack direction="row" spacing={0}>
          <div className="sidenav">
           {/* <br></br>
           <br></br>
           <br></br> */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "25%"
            }}><Image src={Logo} alt="Error" width={160} height={160} /> </div>

            <MenuList style={{ paddingTop: 100, paddingLeft: 8, paddingRight: 8 }}>
              <MenuItem style={{ background: "#FFFFFF", borderRadius: 20, color: "#2E0057" }} component='a' href='calendar' >
                <Image src={Calendar} alt="Error" width={30} height={30} />
                <div style={{ paddingRight: 8, background: "#F6F6F6" }}></div>
                Calendar </MenuItem>

              <div style={{ paddingBottom: 15, background: "#F6F6F6" }}></div>

              <MenuItem style={{ background: "#FFFFFF", borderRadius: 20, color: "#2E0057" }} component='a' href='announcements'>
                <Image src={Announcements} alt="Error" width={30} height={30} />
                <div style={{ paddingRight: 8, background: "#F6F6F6" }}></div>
                Announcements </MenuItem>
              <div style={{ paddingBottom: 15, background: "#F6F6F6" }}></div>

              <MenuItem style={{ background: "#FFFFFF", borderRadius: 20, color: "#2E0057" }} component='a' href='group-chat'>
                <Image src={Groupchat} alt="Error" width={30} height={30} />
                <div style={{ paddingRight: 8, background: "#F6F6F6" }}></div>
                Groupchat </MenuItem>
              <div style={{ paddingBottom: 15, background: "#F6F6F6" }}></div>

              <MenuItem style={{ background: "#FFFFFF", borderRadius: 20, color: "#2E0057" }} component='a' href='my-profile'>
                <Image src={Profile} alt="Error" width={30} height={30} />
                <div style={{ paddingRight: 8, background: "#F6F6F6" }}></div>
                Profile</MenuItem>
            </MenuList>

            <MenuList style={{
              paddingTop: 75, alignItems: "center",
              justifyContent: "center", display: "flex", color: "#2E0057"
            }}>
              <SignOutButton
                signOutCallback={() => signOut()}
              >
                <MenuItem component='a' href='' >
                <Image src={Logout} alt="Error" width={30} height={30} />
                <div style={{ paddingRight: 8, background: "#F6F6F6" }}></div>
                Logout
              </MenuItem>
              </SignOutButton>
            </MenuList>
          </div>
          <div className='sidebar'>
            <CurrentComponent/>
          </div>
        </Stack>
      )}
      

export default HamburgerBarDesktop;