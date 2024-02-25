import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Modal from "@mui/material/Modal"
import TextField from '@mui/material/TextField';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from '@mui/material/Button';
import theme from '../theme';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import { PrimaryShift, Status, Event, CalendarInfo } from '../types/types';
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

const MyCalendar = (props: {}) => {
  const { isSignedIn, user, isLoaded } = useUser();
  if (user){ /* TODO: used for testing, remove */
    user.publicMetadata = {"role": "Coordinator"}
  }

  // TODO: start of modal logic - abstract away into a different component (CalendarModalButton)
  const [shiftInfo, setShiftInfo] = useState<CalendarInfo[] | null>(null);
  const [updateInfo, setUpdateInfo] = useState<CalendarInfo | null>(null);


  const [formData, setFormData] = useState<CalendarInfo | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const showModal = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
  const [fetchShiftsTrigger, setFetchShiftsTrigger] = useState(0);


  const [open, setOpen] = useState(false);
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
  }, [fetchShiftsTrigger])

  const events = shiftInfo?.map((shift: CalendarInfo, _) => {

    let background_color = 'green';

    if (shift.status.toString() === 'CANCELLED') {
      background_color = 'gray';
    } else if (shift.status.toString() === 'PENDING') {
      background_color = 'orange';
    }
    return {
      /*******************************************************
       *        associated fields for PrimaryShiftInfo       *
       ******************************************************/ 
      primaryShiftID: shift.primaryShiftID,
      userID:         shift.userID,
      onCallShiftID:    shift.onCallShiftID,
      from:           new Date(shift.from),
      to:             new Date(shift.to), 
      firstName:      shift.firstName,
      lastName:       shift.lastName,
      date:           new Date(shift.from).setHours(0,0,0,0),
      status:         shift.status,
      phoneLine:      shift.phoneLine, 
      message:        shift.message,
      created_at:     new Date(), 
  
      /*******************************************************
       *            associated fields for Event              *
       ******************************************************/
      start:          new Date(shift.from),
      end:            new Date(shift.to),
      title:          shift.firstName + " " + shift.lastName, // we don't know what to assign this right now 
      style: {
        opacity: .5,
        backgroundColor: background_color,
      }
    }
  });

  const handleOpen = (e: CalendarInfo) => {
    // console.log("TESTING 1");
    setOpen(true);
    // setUpdateInfo(e);
    setFormData(e)
  };

  const handleClose = () => {setOpen(false);
                             setFormData(null)}

  // const initialFormData = {
  //   phoneLine: '',
  //   startTime: '',
  //   endTime: '',
  //   assignedEmployee: '',
  // };
  // const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (formData){
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    if (formData){
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // TODO: any type is work around, change to actual type
  const handleSubmit = async (e: any , modifiedData : any) => {
      Object.keys(modifiedData).forEach(key => {
        if (e.hasOwnProperty(key)) {
          e[key] = modifiedData[key];
        }
      });

      const keysToDelete = [ 'start', 'end', 'title', 'style', 'sourceResource' ]
      keysToDelete.forEach((key : string, _) => {
        if (formData) { delete (formData as {[key: string]: any})[key]; }
      }) 

      const response = await fetch('api/shifts?shiftID=' + formData?.primaryShiftID.toString(), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) 
      });
    setFetchShiftsTrigger(prev => prev + 1);
    handleClose()
    console.log(response); 
  }

  const renderShiftButtons = () => {
    console.log("In render shift buttons")
    console.log(formData)
    if (formData?.status === 'ACCEPTED'){
        return <Button onClick={() => {handleSubmit(formData, {'status': Status.CANCELLED, 'firstName': '', 'lastName': ''})}} sx={{ marginRight: '5%', paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button>;
    } else if (formData?.status === 'CANCELLED'){
        return <Button onClick={() => {handleSubmit(formData, {'status': Status.PENDING, 'firstName': user?.firstName, 'lastName': user?.lastName})}} sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Request Shift</Button>
    } else if (formData?.status === 'PENDING'){
        if (user?.publicMetadata.role == 'Coordinator'){
          return <>
                <Button onClick={() => {handleSubmit(formData, {'status': Status.CANCELLED, 'firstName': '', 'lastName': ''})}} sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Reject Request</Button>
                <Button onClick={() => {handleSubmit(formData, {'status': Status.ACCEPTED})}} sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Approve Request</Button>
                </>
        } 
    }
    
    // {formData?.status === 'ACCEPTED' && <Button onClick={() => {handleSubmit(formData, {'status': Status.CANCELLED})}} sx={{ marginRight: '5%', paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button>}
    // {formData?.status === 'CANCELLED' && <Button onClick={() => {handleSubmit(formData, {'status': Status.PENDING})}} sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Request Shift</Button>}
    // if (complexCondition1) return <ComponentForComplexCondition1 />;
    // if (complexCondition2) return <ComponentForComplexCondition2 />;
    // return <DefaultComponent />;
  };
  
  // const handleCancel = (newStatus : Status) => {
  //   console.log(" IN HANDLE CANCEL")
  //   if (formData){
  //     console.log("IN form data conditional")
  //     console.log(newStatus.toString())
  //     setFormData({
  //       ...formData,
  //       ['status']: newStatus,
  //       ['phoneLine']: 123
  //       // ['status']: Status.CANCELLED,
  //     }, () => {/*do something after the state has been updated*/});
  //   }
  //   console.log(formData)
  //   handleSubmit(formData)
  // }

  // TODO: end of modal logic - abstract away into a different component (CalendarModalButton)
  return (
    <div style={{ height: '500px' }}>
      <Calendar
        dayLayoutAlgorithm='no-overlap'
        // selectable={true}
        onSelectEvent={(e: CalendarInfo) => {
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
            <form>
              <Grid container spacing={2} columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }} justify-content='flex-start' alignItems='flex-start' columns={12} margin={{ xs: 1, sm: 2, md: 3, lg: 4 }} sx={{width:"100%"}}>
                <Grid container spacing={4} direction='column' alignItems='flex-start' paddingBottom='13%' sx={{width: "100%"}}>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width:"100%"}}>
                    <Typography variant="h4" sx={{marginRight: 1, width: "100"}}>
                      Start Time:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", flex: 1, width:"100%" }}> <Typography sx={{display: "flex", justifyContent: "center"}}> {formData ? formData.from.toString().substring(0, formData.from.toString().indexOf(' GMT')) : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width: "100%"}}>
                    <Typography variant="h4" sx={{marginRight: "15px", width: "100"}}>
                      End Time:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{display: "flex", justifyContent: "center"}}> {formData ? formData.to.toString().substring(0, formData.to.toString().indexOf(' GMT')) : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: -1, width:"100%"}}>
                    <Typography variant="h4" sx={{marginRight: 10}}>
                      Assigned Employee:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{marginLeft: 1}}> {formData ? formData.title : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -1, width:"100%" }}>
                    <Typography variant="h4" sx={{marginRight: "148px"}}>
                      Phone Line:
                    </Typography>
                    <Box sx={{ border: 1, borderColor: "black", borderRadius: "5px", width: "100%", flex: 1 }}> <Typography sx={{marginLeft: 1}}> {formData ? formData.phoneLine : ""} </Typography> </Box>
                  </Grid>
                  <Grid container direction="row" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: -1, width:"100%" }}>
                    <Typography variant="h4" sx={{marginRight: "190px"}}>
                      Status: 
                    </Typography> {/* TODO: fix border below */}
                    <Box sx={{ flex: 1, border: 1, borderColor:formData?.style.backgroundColor == "gray" ? "red" : formData?.style.backgroundColor, borderRadius: "5px", width: "100%", color: formData?.style.backgroundColor == "gray" ? "red" : formData?.style.backgroundColor }}> <Typography sx={{display: "flex", alignItems: "center", justifyContent: "center"}}> {formData?.style.backgroundColor == "green" ? "Assigned" : (formData?.style.backgroundColor == "gray" ? "Cancelled" : "Pending")} </Typography> </Box>
                  </Grid>
                  <Grid xs={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign='center' paddingTop='5%'  sx={{ display: 'flex', justifyContent: 'center' }}>
                    {renderShiftButtons()}
                    {/* {formData?.status === 'ACCEPTED' && <Button onClick={() => {handleSubmit(formData, {'status': Status.CANCELLED})}} sx={{ marginRight: '5%', paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button>}
                    {formData?.status === 'CANCELLED' && <Button onClick={() => {handleSubmit(formData, {'status': Status.PENDING})}} sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }} variant="contained">Request Shift</Button>} */}
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

  const [shiftInfo, setShiftInfo] = useState<CalendarInfo[] | null>(null);
  const [updateInfo, setUpdateInfo] = useState<CalendarInfo | null>(null);

  const today = new Date();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());
  firstDayOfWeek.setHours(0, 0, 0);

  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59);

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await fetch('api/shifts?from=' + firstDayOfWeek.toISOString() + "&to=" + lastDayOfWeek.toISOString);
  //       const data = await response.json();
  //       setShiftInfo(data);
  //     } catch (e) {
  //       throw new Error('Failed to fetch shift data');
  //     }
  //   })();
  // }, [updateInfo])

  // const events = shiftInfo?.map((shift: CalendarInfo, _) => {

  //   let background_color = 'green';

  //   if (shift.status.toString() === 'CANCELLED') {
  //     background_color = 'gray';
  //   } else if (shift.status.toString() === 'PENDING') {
  //     background_color = 'orange';
  //   }
  //   return {
  //     /*******************************************************
  //      *        associated fields for PrimaryShiftInfo       *
  //      ******************************************************/ 
  //     primaryShiftID: shift.primaryShiftID,
  //     userID:         shift.userID,
  //     onCallShiftID:    shift.onCallShiftID,
  //     from:           new Date(shift.from),
  //     to:             new Date(shift.to), 
  //     firstName:      shift.firstName,
  //     lastName:       shift.lastName,
  //     date:           new Date(shift.from).setHours(0,0,0,0), // TODO: confirm work 
  //     status:         shift.status,
  //     phoneLine:      shift.phoneLine, 
  //     message:        shift.message,
  //     created_at:     new Date(), 
  
  //     /*******************************************************
  //      *            associated fields for Event              *
  //      ******************************************************/
  //     start:          new Date(shift.from),
  //     end:            new Date(shift.to),
  //     title:          shift.firstName + " " + shift.lastName, // we don't know what to assign this right now 
  //     style: {
  //       opacity: .5,
  //       backgroundColor: background_color,
  //     }
  //   }
  // });

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
        <MyCalendar />
      </Grid>
    </Box>
  );
};

export default calendar;