// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useTheme } from "@mui/material/styles";
// import Image from "next/image";
// import UploadImage from "../images/6.png";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

// export default function InputFileUpload() {
//   const theme = useTheme();
//   return (
//     <Button
//       sx={{
//         borderRadius: "20px",
//         textIndent: "10px",
//         borderColor: theme.palette.primary.main,
//         color: "#000000",
//         "&:hover": { borderColor: theme.palette.primary.main },
//         textTransform: "none",
//         paddingRight: "10%",
//       }}
//       component="label"
//       variant="outlined"
//     >
//       <Image src={UploadImage} alt="upload image" width={20} height={20} />
//       Upload Picture
//       <VisuallyHiddenInput type="file" />
//     </Button>
//   );
// }
