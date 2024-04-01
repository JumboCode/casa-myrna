"use client";

import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Announcements from "../images/2.png";
import Calendar from "../images/3.png";
import Groupchat from "../images/4.png";
import Profile from "../images/7.png";
import Logout from "../images/5.png";
import Image from "next/image";
import Hamburger from "../images/hamburger.png";
import { FC, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "../images/closeIcon.svg";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface MobileBarProps {
  currentPageComponent: FC; // Update prop type to React Functional Component
}
const HamburgerBarMobile: FC<MobileBarProps> = ({ currentPageComponent }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const CurrentComponent = currentPageComponent;

  useEffect(() => {
    setShowMenu(false);
  }, []);

  /* switches the menu on or off */
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const buttonList = [
    {
      Name: "CalendarButton",
      Icon: Calendar,
      DisplayName: "Calendar",
      Link: "/calendar",
    },
    {
      Name: "AnnouncementsButton",
      Icon: Announcements,
      DisplayName: "Announcements",
      Link: "/announcements",
    },
    {
      Name: "ProfileButton",
      Icon: Profile,
      DisplayName: "Profile",
      Link: "/my-profile",
    }
  ];

  /* used as work around for a rerouting issue */
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      {!showMenu ? (
        <div
          style={{
            background: "#AECC7E",
            paddingLeft: 25,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "auto",
            height: "70px",
          }}
        >
          <Button onClick={toggleMenu}>
            <Image
              src={Hamburger}
              alt="hamburgerIcon"
              style={{
                height: "35px",
                width: "35px",
              }}
            />
          </Button>
        </div>
      ) : (
        <>
          <div
            style={{
              background: "#AECC7E",
              paddingLeft: 25,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              width: "auto",
              height: "70px",
            }}
          >
            <Button onClick={toggleMenu}>
              <Image
                src={CloseIcon}
                alt="CloseIcon"
                style={{
                  height: "35px",
                  width: "35px",
                }}
              />
            </Button>
          </div>
          <MenuList
            style={{
              width: "auto",
              height: "30%",
              background: "rgba(246, 246, 246, 0.5)",
              padding: 10,
            }}
          >
            <div
              style={{
                marginTop: '10%',
                marginBottom: '10%'
              }}
            >
              {buttonList.map((button) => {
                if (
                  button.Name == "ManageProfilesButton" &&
                  user?.publicMetadata.role == "Coordinator"
                ) {
                  return (
                    <MenuItem
                      component="a"
                      href={button.Link}
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
                      <Image
                        src={button.Icon}
                        alt={button.Name}
                        style={{
                          height: 35,
                          width: 35,
                          marginRight: 15,
                        }}
                      />
                      {button.DisplayName}
                    </MenuItem>
                  );
                } else if (button.Name != "ManageProfilesButton") {
                  return (
                    <MenuItem
                      component="a"
                      href={button.Link}
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
                      <Image
                        src={button.Icon}
                        alt={button.Name}
                        style={{
                          height: 35,
                          width: 35,
                          marginRight: 15,
                        }}
                      />
                      {button.DisplayName}
                    </MenuItem>
                  );
                }
              })}
            </div>
          </MenuList>
        </>
      )}
      <div className="mobileSidebar">
        <CurrentComponent />
      </div>
      <SignOutButton signOutCallback={() => router.push("/login")}>
        <div
          style={{
            height: "70px",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -1,
            background: "#5DAED7",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            paddingRight: 25,
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          <Image
            src={Logout}
            alt="logoutButton"
            style={{
              height: "35px",
              width: "35px",
              marginRight: 8,
            }}
          />
          <span
            style={{
              color: "#2E0057",
              fontFamily: "Inter",
            }}
          >
            Logout
          </span>
        </div>
      </SignOutButton>
    </div>
  );
};

export default HamburgerBarMobile;
