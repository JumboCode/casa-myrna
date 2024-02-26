"use client";

import Sidebar from "../../components/Sidebar";
import "../../globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { Typography } from "@mui/material";
import { Protect } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const Groupchat: React.FC = () => {
  //   return (<Protect role="org:admin:employee" fallback={<p>Only an admin or employee can access this content.</p>}>
  //           <ThemeProvider theme={theme}><Sidebar currentPageComponent={Typography}/></ThemeProvider>
  //         </Protect>
  //   )

  const { isSignedIn, user, isLoaded } = useUser();
  if (
    user?.publicMetadata.role == "Coordinator" ||
    user?.publicMetadata.role == "Full-time Staff" ||
    user?.publicMetadata.role == "Part-time Staff" ||
    user?.publicMetadata.role == "Relief Staff"
  ) {
    return (
      <ThemeProvider theme={theme}>
        <Sidebar currentPageComponent={Typography} />
      </ThemeProvider>
    );
  } else {
    return (
      <Protect
        role="org:admin:employee"
        fallback={<p>Only an admin or employee can access this content.</p>}
      >
        <ThemeProvider theme={theme}>
          <Sidebar currentPageComponent={Typography} />
        </ThemeProvider>
      </Protect>
    );
  }
};

export default Groupchat;
