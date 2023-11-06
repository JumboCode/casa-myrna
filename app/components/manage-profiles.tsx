import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2' ;
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import profileList from "./profileList"

const BoxSx = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '90vh',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: '5%',
        backgroundColor: '#f6f6f6',
        fontFamily: 'default',
        margin: '2%'
      }}
    >
      {/* everything above the profile list */}
      <Grid container spacing={5} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} columns={12} margin={8}>
        <div class='headerContent'>
          <Grid container spacing={6} columns={20} paddingBottom='10%'>
            {/* Left side of header */}
            <Grid item xs={14} paddingRight='15%'>
              {/* Page Title */}
              <Typography variant="h4" justifyContent='center' sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
                  Manage Profiles
              </Typography>

              {/* Search Bar */}
              <Grid container spacing={2} columns={4}>
                <Grid item xs={3}>
                  <TextField fullWidth defaultValue="Search" InputProps={{readOnly: true }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid item xs={1}>
                  <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">search</Button>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Right side of header */}
            <Grid item xs={6}>
              {/* Add new employee */}
              <Grid container paddingBottom='16%'>
                <Button fullWidth variant="outlined" sx={{ padding: '5%', borderRadius: '25px', textIndent: '10px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': {borderColor:"#57228F"}, textTransform: 'none'}}>
                    Add New Employee
                </Button>
              </Grid>

              {/* Select filters */}
              <Grid container spacing={2} columns={3}>
                <Grid item xs={2}>
                  <TextField fullWidth defaultValue="Select filters" InputProps={{readOnly: true }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid item xs={1}>
                  <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">filter</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* profile list component */}
          <div class='profileList' sx={{ justifyContent:'center' }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {profileList({firstName: "N", lastName: "P", role: "volunteer", imageUrl: "image"})}
            </Grid>
          </div>

        </div>
        
        
      </Grid>
  </Box>);
}

export default BoxSx;
