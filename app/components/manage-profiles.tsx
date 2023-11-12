import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2' ;
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import profileList from "./profileList"
import Image from "next/image";
import Add from "app/images/9.png";

const BoxSx = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '90vh',
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        flexDirection: 'column', // Change flex direction to column
        justifyContent: 'flex-start', // Align items at the start
        alignItems: 'center', // Center items horizontally
        borderRadius: '5%',
        backgroundColor: '#f6f6f6',
        fontFamily: 'default',
        margin: '2%',
        marginLeft: '5%',
        marginRight: '5%'
      }}
    >
      <Stack spacing={35}>
        {/* Header content */}
        <Stack spacing={2}>
          <Grid container spacing={3} columns={20} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} margin={10} paddingTop='5%'>
                {/* Left side of header */}
                <Grid item xs={14} paddingBottom='5%'>
                  {/* Page Title */}
                  <Typography variant="h4" sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
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

                {/* Right side of header */}
                <Grid item xs={6}>
                  {/* Add new employee */}
                  <Grid container paddingBottom='23%'>
                    <Button fullWidth variant="outlined" sx={{ padding: '3%', borderRadius: '25px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': {borderColor:"#57228F"}, textTransform: 'none', display: 'flex', alignItems: 'center' }}>
                      <div style={{ flexGrow: 1 }}>Add New Employee</div>
                      <Image src={Add} alt="Error" width={30} height={30} />
                    </Button>
                  </Grid>

                  {/* Select filters */}
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

          {/* Profile List */}
          {profileList({firstName: "N", lastName: "P", role: "volunteer", imageUrl: "image"})}
        </Stack>

        {/* Pagination */}
        <Stack spacing={2} alignItems="center">
          <Pagination count={10} color="secondary" /> 
        </Stack>
      </Stack>
  </Box>);
}

export default BoxSx;
