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
    sm: "calc(80% - 50px)",
    md: "calc(33% - 50px)",
    lg: "calc(25% - 50px)",
  },
};

const announcments: FC = (
  {
    //   imageUrl,
    //   senderName,
    //   senderEmail,
    //   messageTitle,
    //   date,
    // }: {
    //   imageUrl: string;
    //   senderName: string;
    //   senderEmail: string;
    //   messageTitle: string;
    //   date: string;
  }
) => {
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
      {/* <Avatar alt={senderName} src={imageUrl} sx={{ width: 25, height: 25 }} />
      <Typography sx={breakpoints}>{truncate(senderName, 10)}</Typography> */}
      {/* <Typography sx={breakpoints}>{truncate(senderEmail, 30)}</Typography> */}
      {/* <Typography sx={breakpoints}>{truncate(messageTitle, 30)}</Typography>
      <Typography sx={breakpoints}>{date}</Typography> */}
      <Avatar
        alt={"senderName"}
        src={"imageUrl"}
        sx={{ alignItems: "center" }}
      />
      <Typography sx={breakpoints}>
        {truncate("senderNameThatIsTooLong", 10)}
      </Typography>
      <Typography sx={breakpoints}>
        {truncate("messageTitleThatIsWayTooLoooooooong", 30)}
      </Typography>
      <Typography sx={breakpoints}>{"date"}</Typography>
    </Box>
  );
};

export default announcments;

// const announcements = ({
//   senderName,
//   senderEmail,
//   messageTitle,
//   imageUrl,
//   date,
// }: {
//   senderName: string;
//   senderEmail: string;
//   messageTitle: string;
//   imageUrl: string;
//   date: string;
// }) => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "background.paper",
//         boxShadow: 1,
//         borderRadius: 2,
//         width: "95%",
//         height: "40px",
//         justifyContent: "space-around",
//       }}
//     >
//       <Stack justifyContent="space-around" direction="row" spacing={20}>
//         <Stack direction="row" spacing={3} alignItems={"center"}>
//           <Avatar alt="" src={imageUrl} sx={{ width: 10, height: 10 }} />

//           <Avatar
//             alt={senderName}
//             src={imageUrl}
//             sx={{ width: 25, height: 25 }}
//           />
//           <Box sx={breakpoints}>
//             <Typography
//               textAlign="center"
//               sx={{
//                 typography: "body1",
//                 fontSize: 16,
//                 fontFamily: "Montserrat",
//               }}
//             >
//               {truncate(senderName, 10)}
//             </Typography>
//           </Box>
//         </Stack>
//         <Box sx={breakpoints}>
//           <Typography
//             variant="h4"
//             textAlign="center"
//             sx={{
//               typography: "body1",
//               fontSize: 16,
//               fontFamily: "Montserrat",
//             }}
//           >
//             {truncate(senderEmail, 30)}
//           </Typography>
//         </Box>

//         <Typography
//           variant="h4"
//           textAlign="center"
//           sx={{ typography: "body1", fontSize: 16, fontFamily: "Montserrat" }}
//         >
//           {truncate(messageTitle, 30)}
//         </Typography>

//         <Typography
//           variant="h4"
//           textAlign="center"
//           sx={{ typography: "body1", fontSize: 16, fontFamily: "Montserrat" }}
//         >
//           {date}
//         </Typography>
//       </Stack>{" "}
//     </Box>
//   );
// };

// export default announcements;

// function createTheme(arg0: {
//   breakpoints: {
//     values: { mobile: number; tablet: number; laptop: number; desktop: number };
//   };
// }) {
//   throw new Error("Function not implemented.");
// }
