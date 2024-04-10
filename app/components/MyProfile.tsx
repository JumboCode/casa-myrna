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
import DeleteImage from "../images/trashcan.png"
import DefaultImage from "../images/default-profile-pic.png";
import { useUser } from "@clerk/nextjs";
import Clerk from '@clerk/clerk-js';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// import InputFileUpload from "./UploadPic";


const BoxSx: FC = () => {
  const theme = useTheme();
  const { isSignedIn, user, isLoaded } = useUser();
  /* Default initial form data, prior to updates */
  const initialFormData = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    role: '',
    pronouns: '',
    phoneNumber:''
};

/* This updates the submit form data with the fetched user data */
const [formData, setFormData] = useState(initialFormData);

  if (!user) {
    console.error('User data is not loaded yet.');
    return;
  }
  const [imageUrl, setImageUrl] = useState("");

    // Success Alert

    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClick = () => {
        setOpenSnack(true);
      };

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnack(false);
    };
  


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
      // Insert onclickOpen snackbar here
      handleSnackClick();



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
            uploadProfileImage(file)
        }
      };
  
      // Start reading the file as Data URL
      reader.readAsDataURL(file);
    }
  };
  /* Handle input change */
const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
const handleSubmit = async (e: { preventDefault: () => void; }) => {
    if (!user) {
        console.error('User data is not loaded yet.');
        return;
      }
      console.log(formData)
    e.preventDefault();
    try {

        /* Match specification of database, different from form data formatting */
        const finalFormData = {
            publicMetadata: {
                firstName: user?.firstName,
                lastName: user?.lastName,
                emailAddress: user?.emailAddresses,
                role: user?.publicMetadata.role,
                pronouns: formData.pronouns,
                phoneNumber: user?.publicMetadata.phoneNumber,
            },
        };
        
        let uid = user?.emailAddresses
        /* Update the database with the new fields*/
        const response = await fetch(`/api/users?id=${user?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalFormData),
        });

        if (!response.ok) {
            throw new Error('Failed to edit employee');
        }


        /* Close the modal and show a success message */
        console.log("Employee was successfully added - refresh the page");
        location.reload(); /* Reload page to see change was successful */
    } catch (error) {
        console.error('Error editing employee:', error);
    }
};

const handleDeleteProfilePicture = async () => {
  try {
    await user.setProfileImage({
      file: null,
      contentType: 'image/png',
    });
    console.log('Profile image deleted successfully');
    handleSnackClick();
  } catch (error) {
    console.error('Failed to delete profile image:', error);
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
          <Grid xs={12} sm={12} md={13} lg={13} textAlign={"center"}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="avatar-input"
            />
            {/* Change Profile Picture */}
            <Button
              fullWidth
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
              <label htmlFor="avatar-input">Change Profile Picture</label>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={13} lg={13} textAlign={"center"}>
            {/* Delete Profile Picture */}
            <Button
              onClick={handleDeleteProfilePicture}
              sx={{
                borderRadius: "20px",
                textIndent: "10px",
                borderColor: theme.palette.primary.main,
                color: "#000000",
                "&:hover": { borderColor: theme.palette.primary.main },
                textTransform: "none",
                paddingLeft: "9%",
                paddingRight: "12%",
                marginTop: '-10%'
              }}
              variant="outlined"
            >
              <Image
                src={DeleteImage}
                alt="delete profile picture"
                width={20}
                height={20}
              />
              <label htmlFor="avatar-input">Delete Profile Picture</label>
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
              name = "pronouns"
              onChange={handleInputChange}
              defaultValue={user?.publicMetadata.pronouns}
              InputProps={{
                readOnly: false,
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
              onClick={handleSnackClick}
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
              onClick={handleSubmit}
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
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert
        onClose={handleCloseSnack}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
        >
        Your changes were saved.
        </Alert>
      </Snackbar>
    </Box>

  );
};

export default BoxSx;