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
import { PrimaryShift, Status } from '../types/types';

const localizer = momentLocalizer(moment);

const MyCalendar = (props: { events: any; }) => {
  const { events } = props; // Extract events from props

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: '50px' }}
        defaultView={'week'}
        eventPropGetter={() => {
          const backgroundColor = 'green'
          const opacity = .5
          return { style: { backgroundColor, opacity } }
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
        setShiftInfo(data); 
      } catch (e) {
        throw new Error('Failed to fetch shift data'); 
      }
    })();
  }, [])

  const events = shiftInfo?.map((shift, _) => {
    return {
      start: new Date(shift.from), 
      end: new Date(shift.to), 
      title: shift.primaryShiftID.toString(), // we don't know what to assign this right now 
      style: {
        backgroundColor: (shift.status == Status.ACCEPTED ? 'green' : (shift.status == Status.CANCELLED ? 'gray' : 'orange'))  
      }, 
    }
  });
  
  
  if (events != undefined) {
    console.log(typeof(events[0].start)); 
  }

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
