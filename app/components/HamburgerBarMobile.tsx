/* 
 *  Authors: Carly Seigel and Bill Soronzonbold 
 *  Date   : 11/6/2023 
 * 
 *  File contains the mobile sidebar, used in the sidebar component
 *  
 */

"use client"

import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Announcements from "app/images/2.png";
import Calendar from "app/images/3.png";
import Groupchat from "app/images/4.png";
import Profile from "app/images/7.png";
import Logout from "app/images/5.png";
import Image from "next/image";
import Hamburger from "app/images/hamburger.png";
import { FC, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import CloseIcon from "app/images/closeIcon.svg";

const HamburgerBarMobile: FC = ({ }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        setShowMenu(false);
    }, []);

    /* switches the menu on or off */
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const buttonList = [
        {
            Name: "CalendarButton",
            Icon: Calendar,
            DisplayName: "Calendar",
            Link: "/calendar"
        },
        {
            Name: "AnnouncementsButton",
            Icon: Announcements,
            DisplayName: "Announcements",
            Link: "/announcements"
        },
        {
            Name: "GroupChatButton",
            Icon: Groupchat,
            DisplayName: "Groupchat",
            Link: "/group-chat"
        },
        {
            Name: "ProfileButton",
            Icon: Profile,
            DisplayName: "Profile",
            Link: "/"
        },
    ]; /* todo: assign types for type safety */

    return (<div style={{
        background: "linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%), linear-gradient(180deg, #C3DC98 42.71%, rgba(108, 187, 227, 0.99) 96.72%, rgba(108, 187, 227, 0) 99.99%)",
        height: "100vh",
        width: "100%",

    }}>
        {(!showMenu) ? (
            <div style={{
                background: "#AECC7E",
                paddingLeft: 25,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                width: "auto",
                height: "70px",
            }}>
                <Button onClick={toggleMenu}>
                    <Image src={Hamburger} alt="hamburgerIcon" style={{
                        height: "35px",
                        width: "35px",
                    }} />
                </Button>
            </div>
        ) : (
            <>
                <div style={{
                    background: "#AECC7E",
                    paddingLeft: 25,
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "auto",
                    height: "70px",
                }}>
                    <Button onClick={toggleMenu}>
                        <Image src={CloseIcon} alt="CloseIcon" style={{
                            height: "35px",
                            width: "35px",
                        }} />
                    </Button>

                </div>
                <MenuList style={{
                    width: "auto",
                    height: "400px",
                    background: "rgba(246, 246, 246, 0.5)",
                    padding: 10,
                }}>
                    <div style={{
                        marginTop: 60,
                    }}>
                        {buttonList.map((button) => {
                            return <MenuItem component="a" href={button.Link} 
                                    style={{
                                        background: "#FFFFFF",
                                        marginBottom: 10,
                                        width: "auto",
                                        height: 60,
                                        borderRadius: 20,
                                        fontSize: 20,
                                        boxShadow: "0px 5px rgba(128,128,128,0.3)",
                                    }}
                                    key={button.Name}
                                >
                                    <Image src={button.Icon} alt={button.Name} style={{
                                        height: 35,
                                        width: 35,
                                        marginRight: 15,
                                    }} />
                                    {button.DisplayName}
                                </MenuItem>
                        })}
                    </div>
                </MenuList>
            </>
        )}
        <div style={{
            height: "70px",
            position: "absolute",
            left: 10, 
            right: 10, 
            bottom: -1,
            background: "#5DAED7",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingRight: 25,
            overflowX: "hidden",
            overflowY: "hidden",
        }}>
            <Button style={{ width: "auto" }} onClick={() => {
                alert("logout indicated");
            }}>
                <Image src={Logout} alt="logoutButton" style={{
                    height: "35px",
                    width: "35px",
                    marginRight: 8,
                }} />
                <span style={{
                    color: "#2E0057",
                }}>Logout</span>
            </Button>
        </div>
    </div>)
}

export default HamburgerBarMobile