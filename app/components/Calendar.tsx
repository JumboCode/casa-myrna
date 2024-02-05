import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import { PrimaryShift, Status, Event } from '../types/types';
import { UserProfile, clerkClient } from "@clerk/nextjs" 

const localizer = momentLocalizer(moment);

const MyCalendar = (props: { events: PrimaryShift[]; }) => {
  const { events } = props; // Extract events from props

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        dayLayoutAlgorithm='no-overlap'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        defaultView={'week'}
        eventPropGetter={(event: Event) => {
          return { style: event.style }
        }}
      />
    </div>
  );
};

const calendar = () => {

  const [shiftInfo, setShiftInfo] = useState<PrimaryShift[] | null>(null); 

 
  const today = new Date(); 
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());
  firstDayOfWeek.setHours(0, 0, 0);

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59);

  useEffect(() => {
    (async function() {
      try {
        const response = await fetch('api/shifts?from=' + firstDayOfWeek.toISOString() + "&to=" + lastDayOfWeek.toISOString); 
        const data = await response.json(); 
        console.log(data)
        setShiftInfo(data); 
      } catch (e) {
        throw new Error('Failed to fetch shift data'); 
      }
    })();
  }, [])

  // const getNames = async (userID: number) => {
  //   await clerkClient.users.getUser(userID.toString())
  //     .then((user) => {
  //       return user.firstName + user.lastName; 
  //     })
  //     .catch((err) => {
  //       throw new Error("could not fetch the user's name from given id: " + userID, err); 
  //     });
  // }

  const events = shiftInfo?.map((shift: PrimaryShift, _) => {

    let background_color = 'green'; 
    
    if (shift.status.toString() === 'CANCELLED') {
      background_color = 'gray'; 
    } else if (shift.status.toString() === 'PENDING') {
      background_color = 'orange'; 
    }

    // console.log(getNames(shift.userID))

    return {
      start: new Date(shift.from), 
      end: new Date(shift.to), 
      title: shift.firstName + " " + shift.lastName, // we don't know what to assign this right now 
      style: {
        opacity: .5,
        backgroundColor: background_color, 
      }, 
    }
  });
  
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
      }}
    >
      <Grid container spacing={2} columns={20} paddingTop="2%">
        <Grid xs={15} paddingBottom="5%">
          <Typography variant="h1" sx={{ fontWeight: 'bold', paddingLeft: '8%', paddingTop: '5%' }}>
            Calendar
          </Typography>
        </Grid>

        <Grid xs={5} paddingTop="8%">
          <Select
            value=""
            displayEmpty
            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', width: '200px', height: '38px' }}
          >
            <MenuItem value="" disabled>
              Choose filters
            </MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid paddingBottom={'4%'}>
        <MyCalendar events={events} />
      </Grid>
    </Box>
  );
};

export default calendar;
