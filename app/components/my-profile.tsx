import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { ClientReferenceManifestPlugin } from "next/dist/build/webpack/plugins/flight-manifest-plugin";
import { grey } from "@mui/material/colors"; //imports grey series from materialUI website
import { deepPurple } from "@mui/material/colors";
import { lightGreen } from "@mui/material/colors";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
const color = "#f6f6f6"; //establishes where on the grey scale so we can use it later!
const hoverColor = "#f6f6f6"; //variable for darker shade that happens when yu hover!
const darkPurple = deepPurple[900];

const BoxSx = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5%", //makes rounded corners
        backgroundColor: color, //color is variable established above! (grey!)
        fontFamily: "default",
        margin: "2%",
      }}
    >
      <Grid
        container
        spacing={5}
        columnSpacing={{ xs: 20, sm: 80, md: 5, lg: 5 }}
        justify-content="space-between"
        alignItems="flex-start"
        columns={12}
        margin={4}
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
              variant="h4"
              textAlign={"center"}
              justifyContent={"center"}
              sx={{ fontWeight: "bold" }}
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
              src="/static/images/avatar/1.jpg"
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} textAlign={"center"}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                textIndent: "10px",
                borderColor: "#57228F",
                color: "#000000",
                "&:hover": { borderColor: "#57228F" },
                textTransform: "none",
                paddingRight: "10%",
              }}
            >
              Upload Picture
            </Button>
          </Grid>
        </Grid>
        <Grid></Grid>
        {/* This is column 1 */}
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="flex-center"
          paddingTop="12%"
        >
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>First Name</Typography>
            <TextField
              defaultValue="Jumbo"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Last Name</Typography>
            <TextField
              defaultValue="Code"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Username</Typography>
            <TextField
              defaultValue="Casa"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
            <TextField
              defaultValue="myrna@gmail.com"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
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
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Pronouns</Typography>
            <TextField
              defaultValue="casa/myrna"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Role</Typography>
            <TextField
              defaultValue="Employee"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Password</Typography>
            <TextField
              defaultValue="casa.myrna123"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
              label=""
              variant="standard"
            />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontWeight: "bold" }}>Phone Number</Typography>
            <TextField
              defaultValue="000-000-0000"
              InputProps={{ readOnly: true }}
              sx={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}
              id="filled-basic"
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
                backgroundColor: "#89B839",
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
