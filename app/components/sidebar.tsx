
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


const SideNav = () => {
  return(

  <Stack direction="row" spacing={2}>
      <div className = "sidenav" style= {{
        background:"#F6F6F6",
        width: "20%",
        height: "750px",
        alignItems: "center",
        justifyContent: "center"
      }}>
            <MenuList>
              <MenuItem component = 'a' href = ''>  
                <Image src = {Hamburger} alt = "Error" width = {20} height= {20} /> 
              </MenuItem>
          </MenuList>

      <div style = {{paddingTop: 55, display: "flex",alignItems: "center",
        justifyContent: "center"}}><Image src = {Logo} alt = "Error" width = {160} height= {160} /> </div>

         <MenuList style= {{paddingTop: 100}}>
            <MenuItem style = {{background: "#FFFFFF", borderRadius: 20, color:"#2E0057"}} component = 'a' href = 'calendar' >  
            <Image src = {Calendar} alt = "Error" width = {30} height= {30}/>
            Calendar </MenuItem>

            <div style = {{paddingBottom: 15, background: "#F6F6F6"}}></div>

            <MenuItem style = {{background: "#FFFFFF", borderRadius: 20, color:"#2E0057"}} component = 'a' href = 'announcements'>
            <Image src = {Announcements} alt = "Error" width = {30} height= {30}/>
               Announcements </MenuItem>
            <div style = {{paddingBottom: 15, background: "#F6F6F6"}}></div>

            <MenuItem style = {{background: "#FFFFFF", borderRadius: 20, color:"#2E0057"}} component = 'a' href = 'group-chat'> 
            <Image src = {Groupchat} alt = "Error" width = {30} height= {30}/>
            Groupchat </MenuItem>
            <div style = {{paddingBottom: 15, background: "#F6F6F6"}}></div>

            <MenuItem style = {{background: "#FFFFFF", borderRadius: 20, color:"#2E0057"}} component = 'a' href = 'my-profile'>  
            <Image src = {Profile} alt = "Error" width = {30} height= {30}/>
            Profile</MenuItem>
        </MenuList>

         <MenuList style= {{paddingTop: 75, alignItems: "center",
        justifyContent: "center",display: "flex",color:"#2E0057"}}>  
          <MenuItem component = 'a' href = '' >  
              <Image src = {Logout} alt = "Error" width = {30} height= {30}/>
              Logout 
            </MenuItem>
        </MenuList>
      </div>
      <div style = {{background: "linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%)",
      width: "80%", 
      display: "flex", 
      alignItems: "center",
      justifyContent: "center"
    }}>  
      </div> 
  </Stack>
  ); 
};


export default SideNav;

