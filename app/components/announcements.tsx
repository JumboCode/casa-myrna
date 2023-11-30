import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Transform } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
//import useMediaQuery from '@mui/material/useMediaQuery';

//truncates text if it's too long
const truncate = (input: string, num: number) =>
  input.length > num ? `${input.substring(0, num)}...` : input;

const announcements = ({
  senderName,
  senderEmail,
  messageTitle,
  imageUrl,
  date,
}: {
  senderName: string;
  senderEmail: string;
  messageTitle: string;
  imageUrl: string;
  date: string;
}) => {
  // const Desktop = useMediaQuery('(min-width:1200px)');
  // const Mobile = useMediaQuery('(min-width:800px)');
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        width: "95%",
        height: "40px",
        justifyContent: "space-around",
      }}
    >
      <Stack justifyContent="space-around" direction="row" spacing={20}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Avatar alt="" src={imageUrl} sx={{ width: 10, height: 10 }} />

          <Avatar
            alt={senderName}
            src={imageUrl}
            sx={{ width: 25, height: 25 }}
          />

          <Typography
            textAlign="center"
            sx={{
              typography: "body1",
              fontSize: 16,
              fontFamily: "Montserrat",
            }}
          >
            {truncate(senderName, 10)}
          </Typography>
        </Stack>

        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            typography: "body1",
            ffontSize: 16,
            fontFamily: "Montserrat",
          }}
        >
          {truncate(senderEmail, 30)}
        </Typography>

        <Typography
          variant="h4"
          textAlign="center"
          sx={{ typography: "body1", fontSize: 16, fontFamily: "Montserrat" }}
        >
          {truncate(messageTitle, 30)}
        </Typography>

        <Typography
          variant="h4"
          textAlign="center"
          sx={{ typography: "body1", fontSize: 16, fontFamily: "Montserrat" }}
        >
          {date}
        </Typography>
      </Stack>{" "}
    </Box>
  );
};

export default announcements;
