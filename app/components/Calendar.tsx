import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Modal from "@mui/material/Modal"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from '@mui/material/Button';
import theme from '../theme';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import { PrimaryShift, Status, Event } from '../types/types';
import { UserProfile, clerkClient } from "@clerk/nextjs"
import CalendarModalButton from './CalendarModalButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    lg: 600,
    xs: '80%'
  },
  height: {
    lg: 300,
    xs: '70%'
  },
  bgcolor: "#ffffff",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '35px',

  typography: {
    h1: {
      fontFamily: 'Montserrat',
      fontSize: '32',
      fontWeight: 'bold'
    },
    h4: {
      fontFamily: 'Montserrat',
      fontSize: '16',
      fontWeight: 'bold'
    },
    body1: {
      fontFamily: 'Montserrat',
      fontSize: '16',
      fontWeight: 'regular'
    },
    body2: {
      fontFamily: 'Montserrat',
      fontSize: '16',
      fontWeight: 'regular'
    }
  }
};

const localizer = momentLocalizer(moment);

const MyCalendar = (props: { events: PrimaryShift[]; }) => {
  const { events } = props; // Extract events from props


  // TODO: start of modal logic - abstract away into a different component (CalendarModalButton)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const showModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  const [shiftInfo, setShiftInfo] = useState<Event | null>(null);

  const [open, setOpen] = useState(false);
  const handleOpen = (e: Event) => {
    setOpen(true);
    setShiftInfo(e);
  };

  const handleClose = () => setOpen(false);

  const initialFormData = {
    phoneLine: '',
    startTime: '',
    endTime: '',
    assignedEmployee: '',
  };
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
  };
  // TODO: end of modal logic - abstract away into a different component (CalendarModalButton)


  return (
    <div style={{ height: '500px' }}>
      <Calendar
        dayLayoutAlgorithm='no-overlap'
        // selectable={true}
        onSelectEvent={(e: Event) => {
          handleOpen(e);
        }}
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

      {/* <Modal
        open={open}
        onClose={handleClose}>
          // Gray Modal Box 
        <Box sx={style}>
            // Button Box 
          <Box sx={{ width: 50, height: 50, position: 'absolute', right: '5%', fill: 'none' }}>
            <button
              onClick={() => {
                handleClose();
              }}>
              <CloseOutlinedIcon color="secondary" />
            </button>
          </Box>
          <Box sx={{ paddingLeft: 2, paddingRight: 6 }}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: { lg: '36px', xs: '22px' } }}>
              Sean Reilly
            </Typography>
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5} columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }} justify-content='flex-start' alignItems='flex-start' columns={12} margin={{ xs: 1, sm: 2, md: 3, lg: 4 }}>

                <Grid container spacing={4} direction='column' alignItems='flex-start' paddingBottom='13%'>
                  <Grid container direction="row" justifyContent={'flex-end'} xs={12} sm={12} md={12} lg={12} sx={{ marginLeft: '-130px' }}>
                    <Typography variant="h4">
                      Start Time:
                    </Typography>
                    <Button variant='outlined' sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}> Date</Button>
                    <Select
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleSelectChange}
                      sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}
                    >
                      <MenuItem value={'12:00 am'}>12:00 am</MenuItem>
                      <MenuItem value={'01:00 am'}>1:00 am</MenuItem>
                      <MenuItem value={'02:00 am'}>2:00 am</MenuItem>
                      <MenuItem value={'03:00 am'}>3:00 am</MenuItem>
                      <MenuItem value={'04:00 am'}>4:00 am</MenuItem>
                      <MenuItem value={'05:00 am'}>5:00 am</MenuItem>
                      <MenuItem value={'06:00 am'}>6:00 am</MenuItem>
                      <MenuItem value={'07:00 am'}>7:00 am</MenuItem>
                      <MenuItem value={'08:00 am'}>8:00 am</MenuItem>
                      <MenuItem value={'09:00 am'}>9:00 am</MenuItem>
                      <MenuItem value={'10:00 am'}>10:00 am</MenuItem>
                      <MenuItem value={'11:00 am'}>11:00 am</MenuItem>
                      <MenuItem value={'12:00 am'}>12:00 am</MenuItem>
                      <MenuItem value={'01:00 pm'}>1:00 pm</MenuItem>
                      <MenuItem value={'02:00 pm'}>2:00 pm</MenuItem>
                      <MenuItem value={'03:00 pm'}>3:00 pm</MenuItem>
                      <MenuItem value={'04:00 pm'}>4:00 pm</MenuItem>
                      <MenuItem value={'05:00 pm'}>5:00 pm</MenuItem>
                      <MenuItem value={'06:00 pm'}>6:00 pm</MenuItem>
                      <MenuItem value={'07:00 pm'}>7:00 pm</MenuItem>
                      <MenuItem value={'08:00 pm'}>8:00 pm</MenuItem>
                      <MenuItem value={'09:00 pm'}>9:00 pm</MenuItem>
                      <MenuItem value={'10:00 pm'}>10:00 pm</MenuItem>
                      <MenuItem value={'11:00 pm'}>11:00 pm</MenuItem>
                    </Select>
                  </Grid>
                  <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4" sx={{ marginRight: '7px' }}>
                      End Time:
                    </Typography>
                    <Button variant='outlined' sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}> Date</Button>
                    <Select
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleSelectChange}
                      sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}
                    >
                      <MenuItem value={'12:00 am'}>12:00 am</MenuItem>
                      <MenuItem value={'01:00 am'}>1:00 am</MenuItem>
                      <MenuItem value={'02:00 am'}>2:00 am</MenuItem>
                      <MenuItem value={'03:00 am'}>3:00 am</MenuItem>
                      <MenuItem value={'04:00 am'}>4:00 am</MenuItem>
                      <MenuItem value={'05:00 am'}>5:00 am</MenuItem>
                      <MenuItem value={'06:00 am'}>6:00 am</MenuItem>
                      <MenuItem value={'07:00 am'}>7:00 am</MenuItem>
                      <MenuItem value={'08:00 am'}>8:00 am</MenuItem>
                      <MenuItem value={'09:00 am'}>9:00 am</MenuItem>
                      <MenuItem value={'10:00 am'}>10:00 am</MenuItem>
                      <MenuItem value={'11:00 am'}>11:00 am</MenuItem>
                      <MenuItem value={'12:00 am'}>12:00 am</MenuItem>
                      <MenuItem value={'01:00 pm'}>1:00 pm</MenuItem>
                      <MenuItem value={'02:00 pm'}>2:00 pm</MenuItem>
                      <MenuItem value={'03:00 pm'}>3:00 pm</MenuItem>
                      <MenuItem value={'04:00 pm'}>4:00 pm</MenuItem>
                      <MenuItem value={'05:00 pm'}>5:00 pm</MenuItem>
                      <MenuItem value={'06:00 pm'}>6:00 pm</MenuItem>
                      <MenuItem value={'07:00 pm'}>7:00 pm</MenuItem>
                      <MenuItem value={'08:00 pm'}>8:00 pm</MenuItem>
                      <MenuItem value={'09:00 pm'}>9:00 pm</MenuItem>
                      <MenuItem value={'10:00 pm'}>10:00 pm</MenuItem>
                      <MenuItem value={'11:00 pm'}>11:00 pm</MenuItem>
                    </Select>
                  </Grid>
                  <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4" sx={{ marginRight: '114px' }}>
                      Assigned Employee:
                    </Typography>
                    <Select
                      name="assignedEmployee"
                      value={formData.assignedEmployee}
                      onChange={handleSelectChange}
                      sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}
                    >
                      <MenuItem value={'Carly Seigel'}>Carly Seigel</MenuItem>
                      <MenuItem value={'Eliana Longoria-Valenzuela'}>Eliana Longoria-Valenzuela</MenuItem>
                    </Select>
                  </Grid>
                  <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4" sx={{ marginRight: '182px' }}>
                      Phone Line:
                    </Typography>
                    <Select
                      name="phoneLine"
                      value={formData.phoneLine}
                      onChange={handleSelectChange}
                      sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px' }}
                    >
                      <MenuItem value={'1'}>1</MenuItem>
                      <MenuItem value={'2'}>2</MenuItem>
                      <MenuItem value={'3'}>3</MenuItem>
                      <MenuItem value={'4'}>4</MenuItem>
                      <MenuItem value={'5'}>5</MenuItem>
                      <MenuItem value={'6'}>6</MenuItem>

                    </Select>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type="submit" sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button>
                    <Button type="submit" sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Assign Shift</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>

        </Box>
      </Modal> */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {/* closes the outer modal */}
          <Box sx={{ width: 50, height: 50, position: 'absolute', right: '5%', fill: 'none' }}>
            <button
              onClick={() => {
                handleClose();
              }}>
              <CloseOutlinedIcon color="secondary" />
            </button>
          </Box>
          <Box sx={{ paddingLeft: 2, paddingRight: 6 }}>
            <Typography sx={{ fontFamily: "Montserrat", fontSize: { lg: '25px', xs: '22px' } }}>
              Shift Details
            </Typography>
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }} justify-content='flex-start' alignItems='flex-start' columns={12} margin={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{width:"100%"}}>
                <Grid container spacing={4} direction='column' alignItems='flex-start' paddingBottom='13%' sx={{width: "100%"}}>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width:"100%"}}>
                    <Typography variant="h4" sx={{marginRight: 1, width: "100"}}>
                      Start Time:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", flex: 1, width:"100%" }}> <Typography sx={{display: "flex", justifyContent: "center"}}> {shiftInfo ? shiftInfo.start.toString().substring(0, shiftInfo.start.toString().indexOf(' GMT')) : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width: "100%"}}>
                    <Typography variant="h4" sx={{marginRight: "15px", width: "100"}}>
                      End Time:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{display: "flex", justifyContent: "center"}}> {shiftInfo ? shiftInfo.end.toString().substring(0, shiftInfo.end.toString().indexOf(' GMT')) : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width:"100%"}}>
                    <Typography variant="h4" sx={{marginRight: 10}}>
                      Assigned Employee:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{marginLeft: 1}}> {shiftInfo ? shiftInfo.title : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -1, width:"100%" }}>
                    <Typography variant="h4" sx={{marginRight: "148px"}}>
                      Phone Line:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{marginLeft: 1}}> {shiftInfo ? shiftInfo.phoneLine : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -1, width:"100%" }}>
                    <Typography variant="h4" sx={{marginRight: "190px"}}>
                      Status: 
                    </Typography>
                    <Box sx={{ flex: 1, border: 1, borderColor: shiftInfo?.style.backgroundColor == "gray" ? "red" : shiftInfo?.style.backgroundColor, borderRadius: "5px", width: "100%", color: shiftInfo?.style.backgroundColor == "gray" ? "red" : shiftInfo?.style.backgroundColor }}> <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center"}}> {shiftInfo?.style.backgroundColor == "green" ? "Assigned" : (shiftInfo?.style.backgroundColor == "gray" ? "Cancelled" : "Pending")} </Typography> </Box>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/* {/* <Button type="submit" sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button> */}
                    {/* <Button sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Assign Shift</Button> */}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>
    </div >
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
    (async function () {
      try {
        const response = await fetch('api/shifts?from=' + firstDayOfWeek.toISOString() + "&to=" + lastDayOfWeek.toISOString);
        const data = await response.json();
        setShiftInfo(data);
      } catch (e) {
        throw new Error('Failed to fetch shift data');
      }
    })();
  }, [])

  const events = shiftInfo?.map((shift: PrimaryShift, _) => {

    let background_color = 'green';

    if (shift.status.toString() === 'CANCELLED') {
      background_color = 'gray';
    } else if (shift.status.toString() === 'PENDING') {
      background_color = 'orange';
    }

    return {
      start: new Date(shift.from),
      end: new Date(shift.to),
      title: shift.firstName + " " + shift.lastName, // we don't know what to assign this right now 
      style: {
        opacity: .5,
        backgroundColor: background_color,
      },
      phoneLine: shift.phoneLine,
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

      <Grid paddingBottom={'4%'}>
        <MyCalendar events={events} />
      </Grid>
    </Box>
  );
};

export default calendar;