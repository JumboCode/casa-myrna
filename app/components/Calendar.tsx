import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const calendar = () => {
  return (
    <Box
    sx={{
      display: 'flex',
      minHeight: '90vh',
      flexDirection: 'column', 
      justifyContent: 'flex-start',
      // alignItems: 'center', 
      borderRadius: '5%',
      backgroundColor: '#f6f6f6',
      fontFamily: 'default',
      margin: '2%',
      marginLeft: '5%',
      marginRight: '5%'
    }}
  >

    <Grid container spacing={2} columns={20} paddingTop='2%'>
      <Grid item xs={15} paddingBottom='5%'>
        <Typography variant="h1" sx={{fontWeight: 'bold', paddingLeft:'8%', paddingTop:'5%'}}>
            Calendar
        </Typography>
      </Grid>

      <Grid item xs={5} paddingTop='8%'> 
        <Select
          value="" // Set the initial value to an empty string
          displayEmpty // Display the selected value even when it's empty
          sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', width: '200px', height: '38px'}}
        >
          <MenuItem value="" disabled>
            Choose filters
          </MenuItem>
          {/* Add more MenuItem components with filter options here */}
        </Select>
      </Grid>
    </Grid>
    
  </Box>)
  }

export default calendar;