// big calendar related imports
import React, { useState, useMemo} from "react";
import Popper, { PopperPlacementType } from '@mui/material/Popper';
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
import Select, { SelectChangeEvent } from '@mui/material/Select';


import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

// const containsText = (text, searchText) => text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
const employeeOptions = ["Ana Quieros", "Anna Seifield", "Anne Brown", "Angel Ferrian"];


export const Calendar: React.FC<{}> = ({}) => {

  const [view, setView] = useState(Views.WEEK as View);

  // const [filterOptions, setFilterOption] = React.useState<string[]>([]);

  // const handleChange = (event: SelectChangeEvent<typeof filterOptions>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //     setFilterOption(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const [filterState, setFilter] = React.useState({
    partTime: false,
    fullTime: false,
    manager: false,
    lineOne: false,
    lineTwo: false,
    lineThree: false,
    onCall: false,
    approved: false,
    pending: false,
    cancelled: false,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filterState,
      [event.target.name]: event.target.checked,
    });
  };

  const {partTime, fullTime, manager, lineOne, lineTwo, lineThree, onCall, approved, pending, cancelled} = filterState;


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
      <Grid container spacing={2} columns={20} paddingTop="2%" marginRight='4%'>
        <Grid xs={15} paddingBottom="5%">
          <Typography variant="h1" sx={{ fontWeight: 'bold', paddingLeft: '8%', paddingTop: '5%' }}>
            Calendar
          </Typography>
        </Grid>

        <Grid xs={5} paddingTop="8%">
            {/* Controls the width of the box Select Box */}
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel htmlFor="grouped-select">Choose Filters</InputLabel>
                  {/* Menu props align the popup */}
                  <Select autoWidth={true} defaultValue={''} id="grouped-select" label="Grouping" MenuProps={{disableAutoFocusItem: true, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, transformOrigin: { vertical: 'top', horizontal: 'right' }}}>
                      <Grid container direction='row' spacing={1} marginRight={2}>

                          {/* EMPLOYEE NAME Column */}
                          <Grid container direction='column' spacing={1}>
                              <Grid sx={{ml:2}}>
                                  <ListSubheader> <b>Employee Name</b></ListSubheader>
                                  <Autocomplete
                                    options={employeeOptions}
                                    sx={{ width: 175 }}
                                    renderInput={(params) => <TextField {...params} label="Employee Name" />}
                                  />
                              </Grid>
                          </Grid>

                          {/* EMPLOYEE TYPE Column */}
                          <Grid container direction='column' spacing={1}>
                              <Grid>
                                  <ListSubheader> <b>Employee Type</b></ListSubheader>
                                  <FormGroup sx={{px:1.5}}>
                                      <FormControlLabel control={<Checkbox checked={partTime} onChange={handleFilterChange} name="partTime" />} label="Part Time"/>
                                      <FormControlLabel control={<Checkbox checked={fullTime} onChange={handleFilterChange} name="fullTime"/>} label="Full Time" />
                                      <FormControlLabel control={<Checkbox checked={manager} onChange={handleFilterChange} name="manager" />} label="Manager" />
                                  </FormGroup>
                              </Grid>
                          </Grid>

                          {/* PHONE LINE Column */}
                          <Grid container direction='column' spacing={1}>
                              <Grid>
                                  <ListSubheader> <b>Phone Line</b></ListSubheader>
                                  <FormGroup sx={{px:1.5}}>
                                      <FormControlLabel control={<Checkbox checked={lineOne} onChange={handleFilterChange} name="lineOne"/>} label="Line 1" />
                                      <FormControlLabel control={<Checkbox checked={lineTwo} onChange={handleFilterChange} name="lineTwo"/>} label="Line 2" />
                                      <FormControlLabel control={<Checkbox checked={lineThree} onChange={handleFilterChange} name="lineThree"/>} label="Line 3" />
                                      <FormControlLabel control={<Checkbox checked={onCall} onChange={handleFilterChange} name="onCall"/>} label="On Call" />
                                  </FormGroup>
                              </Grid>
                          </Grid>

                          {/* SHIFT STATUS Column */}
                          <Grid container direction='column' spacing={1}>
                              <Grid>
                                  <ListSubheader> <b>Shift Status</b></ListSubheader>
                                  <FormGroup sx={{px:1.5}}>
                                      <FormControlLabel control={<Checkbox checked={approved} onChange={handleFilterChange} name="approved"/>} label="Approved" />
                                      <FormControlLabel control={<Checkbox checked={pending} onChange={handleFilterChange} name="pending"/>} label="Pending" />
                                      <FormControlLabel control={<Checkbox checked={cancelled} onChange={handleFilterChange} name="cancelled"/>} label="Cancelled" />
                                  </FormGroup>
                              </Grid>
                          </Grid>
                          
                      </Grid>
                  </Select>
            </FormControl>
          {/* <Select
            value=""
            displayEmpty
            sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', width: '200px', height: '38px' }}
          >
            <MenuItem value="">
              Choose filters
            </MenuItem>
            <MenuItem value="">
              Choose me
            </MenuItem>
          </Select> */}
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
