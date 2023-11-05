'use client'

import sidebar from "./components/sidebar"; 
import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Hamburger from "app/images/hamburger.png";
import Image from "next/image";


export default function Home(){

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!showButton)
  {
    return (
            <MenuList>
            <MenuItem component = 'a' href = '' style = {{background: "#F6F6F6"}}>  
              <Image src = {Hamburger} alt = "Error" width = {20} height= {20} /> 
            </MenuItem>
        </MenuList>
        )  
  }
  return sidebar()  
};

