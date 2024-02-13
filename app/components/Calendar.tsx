// big calendar related imports
import React, { useState } from "react";
import { render } from "react-dom";
import { 
  Calendar as BigCalendar, 
  CalendarProps, 
  momentLocalizer,
  type View, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// MUI imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const localizer = momentLocalizer(moment);

// Sample Events
const myEventsList = [
  // {
  //   start: moment("2024-02-22T10:00:00"),  // February 22, 2024, 10:00 AM
  //   end: moment("2024-02-22T11:00:00"),   // February 22, 2024, 12:00 PM
  //   title: 'Meeting with Client',
  // },
  // {
  //   start: moment("2024-02-23T14:00:00"),  // February 23, 2024, 2:00 PM
  //   end: moment("2024-02-23T16:00:00"),   // February 23, 2024, 4:00 PM
  //   title: 'Team Workshop',
  // },
];

// export default function Calendar(props: Omit<CalendarProps, "localizer">){
export const Calendar: React.FC<{}> = ({}) => {

  const [view, setView] = useState(Views.WEEK as View);

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
      <Grid container spacing={2} columns={{lg:20, xs:30}} paddingTop="2%" marginRight='4%'>
        <Grid xs={15} paddingBottom="5%">
          <Typography display={{xs: 'none', md: 'block', lg: 'block'}} variant="h1" sx={{ fontWeight: 'bold', paddingLeft: '8%', paddingTop: '5%' }}>
            Calendar
          </Typography>
        </Grid>

        <Grid xs={5} paddingTop='8%'>
          <Select
            value=""
            displayEmpty
            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', width: {lg:'95%'}, height: {lg:'65%', xs:'35%'},}}
          >
            <MenuItem value="" disabled>
              Choose filters
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      
      {/* Calendar */}
      <Grid paddingBottom={'4%'}>
        <div style={{height: '500px',  margin: '6%'}}>
          <BigCalendar
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
            defaultView={'month'}
            views={['month', 'week', 'day']}
          />
        </div>
      </Grid>
    </Box>
  );
};

export default Calendar;
