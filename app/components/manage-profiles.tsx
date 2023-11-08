import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2' ;
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
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
        margin: '2%',
        marginLeft: '5%',
        marginRight: '5%'
      }}
    >
      {/* everything above the profile list */}
      <Grid container spacing={3} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} margin={10}>
        <div className='headerContent'>
          <Grid container spacing={3} columns={20} paddingBottom='10%'>
            {/* Left side of header */}
            <Grid item xs={12}>
              {/* Page Title */}
              <Typography variant="h4" justifyContent='center' sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
                  Manage Profiles
              </Typography>

              {/* Search Bar */}
              <Grid container spacing={3} columns={4}>
                {/* Actual Search Bar */}
                <Grid item xs={3}>
                  <TextField fullWidth InputProps={{readOnly: true }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px', padding:'4px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                {/* Search Button */}
                <Grid item xs={1}>
                  <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">search</Button>
                </Grid>
              </Grid>

              {/* Applied filters */}
              <Grid container spacing={2} item xs={12} paddingTop='2%' alignItems="center">
                <Grid item xs={2}>
                  applied filters:
                </Grid>
                <Grid item xs={10}>
                  <TextField defaultValue="All" InputProps={{ readOnly: true }} sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }} id="filled-basic" label="" variant="standard" />
                </Grid>
              </Grid>


            </Grid>

            <Grid item xs={1} />
            
            {/* Right side of header */}
            <Grid item xs={6}>
              {/* Add new employee */}
              <Grid container paddingBottom='16%'>
                <Button fullWidth variant="outlined" sx={{ padding: '5%', borderRadius: '25px', textIndent: '10px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': {borderColor:"#57228F"}, textTransform: 'none'}}>
                    Add New Employee
                </Button>
              </Grid>

              {/* Select filters */}
              {/* MUI Multiple values: https://mui.com/material-ui/react-autocomplete/#multiple-values */}
              <Grid container spacing={2} columns={3}>
                <Grid item xs={2}>
                  <Select
                    fullWidth
                    value="" // Set the initial value to an empty string
                    displayEmpty // Display the selected value even when it's empty
                    sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '38px'}}
                  >
                    <MenuItem value="" disabled>
                      Select filters
                    </MenuItem>
                    {/* Add more MenuItem components with filter options here */}
                  </Select>
                </Grid>
                {/* Filter button */}
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
