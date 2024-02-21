import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import UploadImage from "../images/6.png";
import { useUser } from "@clerk/nextjs";
import Clerk from '@clerk/clerk-js';

// import InputFileUpload from "./UploadPic";

const BoxSx: FC = () => {
  const theme = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();

  if (!user) {
    console.error('User data is not loaded yet.');
    return;
  }
  const [imageUrl, setImageUrl] = useState("");
  


// Add or update a profile image to a Clerk user
async function uploadProfileImage(imageFile) {
    const params = {
      file: imageFile, 
    };
  
    try {
      // Call the setProfileImage function with the params
      const result = await user.setProfileImage(params);
  
      // Handle the result
      console.log('Profile image set successfully:', result);
    } catch (error) {
      // Handle any errors that occur during the image upload
      console.error('Failed to set profile image:', error);
    }
  }

const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      // Convert the onloadend handler into an async function
      reader.onloadend = async () => {
        if (reader.result !== null) {
          const imageUrl = reader.result as string;
          setImageUrl(imageUrl);
            console.log("image: ", imageUrl)
            console.log("user:", user)
            uploadProfileImage(imageUrl)
        }
      };
  
      // Start reading the file as Data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "87vh",
        justifyContent: "flex",
        alignItems: "center",
        borderRadius: "5vh",
        backgroundColor: "#f6f6f6",
      }}
    >
      <Grid
        container
        spacing={5}
        columnSpacing={{ xs: 20, sm: 80, md: 5, lg: 5 }}
        justify-content="space-between"
        alignItems="flex-start"
        columns={12}
        margin={{ xs: 1, sm: 4, md: 5, lg: 12 }}
      >
        <Grid
          container
          spacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            justifyContent="center"
            alignItems="flex-start"
            paddingBottom="15%"
          >
            <Typography
              variant="h1"
              textAlign={"center"}
              justifyContent={"center"}
            >
              My Profile
            </Typography>
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={user.imageUrl}
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} textAlign={"center"}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="avatar-input"
            />
            <Button
              sx={{
                borderRadius: "20px",
                textIndent: "10px",
                borderColor: theme.palette.primary.main,
                color: "#000000",
                "&:hover": { borderColor: theme.palette.primary.main },
                textTransform: "none",
                paddingRight: "10%",
              }}
              component="label"
              variant="outlined"
            >
              <Image
                src={UploadImage}
                alt="upload image"
                width={20}
                height={20}
              />
              <label htmlFor="avatar-input">Upload Picture</label>
            </Button>
          </Grid>
        </Grid>
        {/* This is column 1 */}
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="flex-center"
          paddingTop="12%"
        >
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">First Name</Typography>
            <TextField
              defaultValue={user?.firstName}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h4">Pronouns</Typography>
            <TextField
              defaultValue={user?.publicMetadata.pronouns}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            ></TextField>
            <Button
              variant="text"
              sx={{
                borderRadius: "20px",
                textIndent: "10px",
                borderColor: theme.palette.primary.main,
                color: "#000000",
                "&:hover": { borderColor: theme.palette.primary.main },
                textTransform: "none",
                paddingRight: "10%",
              }}
            >
              <Image
                src={UploadImage}
                alt="upload image"
                width={20}
                height={20}
              />
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">Email</Typography>
            <TextField
              defaultValue={user?.emailAddresses}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            />
          </Grid>
        </Grid>
        {/* This is column 2 */}
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="flex-start"
          paddingTop="12%"
          paddingBottom="10%"
        >
          <Grid direction="row" xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h4">Last Name</Typography>
            <TextField
              defaultValue={user?.lastName}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            />





            
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">Role</Typography>
            <TextField
              defaultValue={user?.publicMetadata.role}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h4">Phone Number</Typography>
            <TextField
              defaultValue={user?.publicMetadata.phoneNumber}
              InputProps={{
                readOnly: true,
                disableUnderline: true,
                style: { paddingLeft: 8 },
              }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="outlined-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            container
            justifyContent="flex-end"
            paddingTop="20%"
            paddingRight="15%"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              sx={{
                paddingLeft: "10%",
                paddingRight: "10%",
                borderRadius: "25px",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: "#89B839" },
                textTransform: "none",
              }}
              variant="contained"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxSx;