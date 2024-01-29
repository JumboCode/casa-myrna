import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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
      />
    </div>
  );
};

const calendar = () => {
  const events = [
    {
      start: new Date(2024, 0, 22, 10, 0),
      end: new Date(2024, 0, 22, 12, 0),
      title: 'Meeting with Client',
    },
    {
      start: new Date(2024, 0, 23, 14, 0),
      end: new Date(2024, 0, 23, 16, 0),
      title: 'Team Workshop',
    },
  ];

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
