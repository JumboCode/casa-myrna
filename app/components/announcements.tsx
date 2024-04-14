import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Transform } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";

//truncates text if it's too long
const truncate = (input: string, num: number) =>
  input.length > num ? `${input.substring(0, num)}...` : input;

//Trying to use breakpoints for different screen sizes
const breakpoints = {
  margin: 2,
  fontFamily: "Montserrat",
  fontSize: "16",
  flex: {
    xs: "100%",
    sm: "80%",
    md: "10%",
    lg: "10%",
  },
};

//Declare types for announcment component arguments
type announcementProps = {
  imageUrl: string;
  senderName: string;
  messageTitle: string;
  date: string;
};

const Announcement: React.FC<announcementProps> = ({
  imageUrl,
  senderName,
  messageTitle,
  date,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 3,
        width: "95%",
        height: "auto",
        display: "flex",
        flexWrap: "wrap",
        textAlign: "center",
      }}
    >
      <Avatar alt={senderName} src={imageUrl} sx={{ alignItems: "center" }} />
      <Typography sx={breakpoints}>
        {/* {truncate("senderNameThatIsTooLong", 10)} */}
        {truncate(senderName, 10)}
      </Typography>
      <Typography sx={breakpoints}>
        {/* {truncate("messageTitleThatIsWayTooLoooooooong", 30)} */}
        {truncate(messageTitle, 30)}
      </Typography>
      <Typography sx={breakpoints}>{date}</Typography>
    </Box>
  );
};

export default Announcement;
