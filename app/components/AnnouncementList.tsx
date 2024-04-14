// @ts-nocheck
import Announcement from "../components/announcements";
import { FC } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
// import AnnouncementsModalButton from './AnnouncementsModalButton';
import { profileData } from './types';
import theme from '../theme';
import ClearIcon from '@mui/icons-material/Clear';
import Add from "../images/9.png"
import Image from "next/image";
import React from "react";

const AnnouncementList: FC = () => {

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '90vh',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: '5%',
        backgroundColor: '#f6f6f6',
        fontFamily: 'default',
        margin: '2%',
        marginLeft: '5%',
        marginRight: '5%',
        padding: '3%'
      }}
    >
      <Stack spacing={10}>
        {/* Header content */}
        <Stack spacing={2}>
          <Grid container spacing={3} columns={20} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} margin={10} paddingTop='5%'>
                {/* Left side of header */}
                <Grid xs={13}>
                  {/* Page Title */}
                  <Typography variant="h1" sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
                      Announcements
                  </Typography>

                  {/* Search Bar */}
                  <Grid container spacing={3} columns={4}>
                    {/* Actual Search Bar */}
                    <Grid xs={3}>
                      <InputBase 
                        fullWidth
                        endAdornment={
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        }
                        sx={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          padding: '3px',
                          paddingLeft: '20px',
                          paddingRight: '10px',
                        }}
                      />
                    </Grid>
                    {/* Search Button */}
                    <Grid xs={1}>
                      <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor: theme.palette.primary.main}, textTransform: 'none'}} variant="contained">search</Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right side of header */}
                <Grid xs={7}>
                  {/* Add new announcement */}
                  <Grid container>
                     {/* <AddEmployeeModal profiles={peopleArray} onUpdate={setPeopleArray}/>  */}
                    <Button fullWidth variant="outlined" sx={{ padding: '3%', borderRadius: '25px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': { borderColor: theme.palette.primary.main }, textTransform: 'none', display: 'flex', alignItems: 'center' }}> 
                      <div style={{ paddingRight: '35px' }}>Add New Announcement</div>
                      <Image src={Add} alt="Error" width={30} height={30} />
                    </Button>
                  </Grid>

                  {/* Select filters */}
                  <Grid container spacing={2} columns={3} paddingTop={'16%'}>
                    <Grid xs={2}>
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
                    <Grid xs={1}>
                      <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">filter</Button>
                    </Grid>
                  </Grid>
                </Grid>
          </Grid>


          {/* Announcement List */}
          <div style={{ paddingLeft: '4%' }}>
            {/* Pass arguments to Announcemnet Component*/}
            <div style={{ paddingBottom: 10 }}>
              <Announcement
                imageUrl="imageUrl"
                senderName="SenderNameThatIsTooLong"
                messageTitle="This is a sample announement title"
                date="1/12/23"
              />
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Announcement
                imageUrl="imageUrl"
                senderName="Carly"
                messageTitle="message Title That Is Way Too Loooooooong"
                date="4/5/16"
              />
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Announcement
                imageUrl="imageUrl"
                senderName="Casa Myrna"
                messageTitle="short title"
                date="12/10/23"
              />
            </div>

            <div style={{ paddingBottom: 10 }}>
              <Announcement
                imageUrl="imageUrl"
                senderName="Taylor Swift"
                messageTitle="Free Eras Tour Tickets"
                date="2/20/24"
              />
            </div>
          </div>
        </Stack>

        {/* Pagination */}
        <Stack spacing={2} alignItems="center">
          <Pagination color="secondary" />
        </Stack>
      </Stack>
    
    </Box>
  );
};

export default AnnouncementList;
