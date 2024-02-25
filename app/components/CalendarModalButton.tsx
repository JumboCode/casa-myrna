"use client"

// Import necessary dependencies and components
import { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { format, parse } from 'date-fns';
import theme from '../theme';
// Add employee modal functionality imports
// import { POST } from '../api/shifts/route';
import { PrismaClient } from '@prisma/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:  {
          lg: 600,
          xs: '80%'
    },
    height: {
          lg: 450,
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
        h4:{
          fontFamily: 'Montserrat',
          fontSize: '16',
          fontWeight: 'bold'
        },
        body1:{
          fontFamily: 'Montserrat',
          fontSize: '16',
          fontWeight: 'regular'
        },
        body2:{
          fontFamily: 'Montserrat',
          fontSize: '16',
          fontWeight: 'regular'
        }
    }
  }; 

const initialFormData = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    assignedEmployee: '',
    phoneLine: ''
};

const CalendarModalButton: FC = () => {
    const prisma = new PrismaClient();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formData, setFormData] = useState(initialFormData);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formatDateAndTime = (date: Date, time: string): string => {
        const formattedDate = date.toISOString().split('T')[0];
        const [timeString, period] = time.split(' ');
    
        let [hours, minutes] = timeString.split(':');
        hours = parseInt(hours, 10);
    
        if (period.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12;
        } else if (period.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }
    
        const formattedTime = `${formattedDate}T${hours.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
        return formattedTime;
    };
    
    // Handle form submission (IN PROGRESS)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formattedStartDate = startDate.toISOString();
        const formattedStartTime = formatDateAndTime(startDate, formData.startTime);
        // const formattedEndDate = endDate.toISOString();
        const formattedEndTime = formatDateAndTime(endDate, formData.endTime);
        const createdAt = new Date().toISOString();

        console.log("start date and time")
        console.log(startDate)
        // console.log(formattedStartDate)
        console.log(formattedStartTime)

        console.log("end date and time")
        console.log(endDate)
        // console.log(formattedEndDate)
        console.log(formattedEndTime)

        const requestData = {
            // ...formData,
            // firstName: 'Jiyoon',
            // lastName: 'Choi',
            phoneLine: 1,
            date: startDate,
            from: formattedStartTime,
            to: formattedEndTime,
            created_at: createdAt,
            userID: 2,
            message: 'hello',
            status: 'ACCEPTED',
            onCallShiftID: 3
            // date: formattedStartDate,
            // from: formattedStartTime,
            // to: formattedEndTime,
            // created_at: createdAt,
            // userID: 2,
            // message: 'hello',
            // status: 'ACCEPTED',
            // onCallShiftID: 3
        };

        // See console to see the form data being sent to POST
        console.log('Request Payload:', requestData);
        console.log("TESTING PRINT")

        try {
            const response = await fetch('api/shifts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData),
            });
            console.log('after retrieving response')
            if (!response.ok) {
                throw new Error(`Failed to assign shift. Status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Shift assigned successfully:', result);

            // Reset form data after successful submission
            setFormData(initialFormData);
            handleClose();
        } catch (error) {
            console.error('Error assigning shift:', error);
        }
    };

    useEffect(() => {
        return () => prisma.$disconnect();
      }, []);

    return (
        <>

            <Button
                variant="contained"
                // color="#FFFFFF"
                onClick={handleOpen}
                style={{marginBottom: '10px', marginLeft: '10px', textTransform: 'none', minWidth: 160, fontFamily: 'Montserrat', fontSize: '16', fontWeight: 'bold', color: '#FFFFFF'}} 
            >
                Add Shift
            </Button>
            <Modal 
            open={open}
            onClose={handleClose}>
        {/* Gray Modal Box */}
        <Box sx={style}>
            {/* Button Box */}
            <Box sx={{width: 50, height: 50, position: 'absolute', right: '5%', fill:'none'}}>
                <button 
                    onClick={() => {
                    handleClose();
                    }}>
                    <CloseOutlinedIcon color="secondary" />
                </button>
            </Box>
            <Box sx={{paddingLeft: 2, paddingRight: 6}}>
                <Typography sx={{ fontFamily: "Montserrat", fontSize: {lg:'36px', xs:'22px'}}}>
                    Add Shift
                </Typography>
            </Box>
            <Box>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={5} columnSpacing={{xs: 10, sm:80, md:5, lg:5}} justify-content='flex-start' alignItems='flex-start' columns={12}  margin={{xs: 1, sm: 2, md: 3, lg: 4}}>
                
                <Grid container spacing={4}  direction='column' alignItems='flex-start'  paddingBottom='13%'>
                    <Grid container direction="row" justifyContent={'flex-end'} xs ={12} sm={12} md={12} lg={12}sx={{marginTop: '20px', marginLeft: '-130px' }}>
                        <Typography variant="h4"  sx={{marginTop: '15px', marginRight: '10px'}}>
                        Start Time: 
                        </Typography>

                        {/* Start Date */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                label="Start Date"
                                onChange={(newValue) => setStartDate(newValue)} 
                                sx={{  marginRight: '10px',width: '180px' }}
                                />
                        </LocalizationProvider>
                        
                        <Select
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px'}}
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
                    <Grid container direction="row" xs ={12} sm={12} md={12} lg={12} sx={{marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                        <Typography variant="h4" sx={{marginTop: '15px', marginRight: '10px' }}>
                        End Time: 
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div component={['DatePicker']} >
                                <DatePicker 
                                    label="End Date"
                                    onChange={(newValue) => setEndDate(newValue)} 
                                    sx={{ marginRight: '10px',width: '180px' }}
                                />
                            </div>
                        </LocalizationProvider>
                        
                        <Select
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px'}}
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
                    <Grid container direction="row" xs ={12} sm={12} md={12} lg={12}sx={{ marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                        <Typography variant="h4" sx={{ marginTop: '15px', marginRight: '114px' }}>
                        Assigned Employee: 
                        </Typography>
                        <Select
                            name="assignedEmployee"
                            value={formData.assignedEmployee}
                            onChange={handleInputChange}
                            sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px'}}
                        >
                        <MenuItem value={'Carly Seigel'}>Carly Seigel</MenuItem>
                        <MenuItem value={'Eliana Longoria-Valenzuela'}>Eliana Longoria-Valenzuela</MenuItem>
                    </Select>
                    </Grid>
                    <Grid container direction="row" xs ={12} sm={12} md={12} lg={12}sx={{ marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                        <Typography variant="h4" sx={{ marginTop: '15px',marginRight: '182px' }}>
                        Phone Line: 
                        </Typography>
                            <Select
                            name="phoneLine"
                            value={formData.phoneLine}
                            onChange={handleInputChange}
                            sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px'}}
                            >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                            <MenuItem value={'4'}>4</MenuItem>
                            <MenuItem value={'5'}>5</MenuItem>
                            <MenuItem value={'6'}>6</MenuItem>

                        </Select>
                    </Grid>
                    <Grid xs ={12} sm={12} md={12} lg={12} container spacing={6} justifyContent='flex-end' textAlign='center' sx ={{ marginTop: '1px', display:'flex', justifyContent:'center'}}>
                        <Grid item xs={3}>
                            <Button type="submit" sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'10px', backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor:"#2E0057"}, textTransform: 'none'}} variant="contained">Cancel Shift</Button>
                        </Grid>
                        {/* ASSIGN SHIFT CONFIRMATION BUTTON (where we post shift) */}
                        <Grid item xs={3}>
                            <Button type="submit" variant="contained" sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'10px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}} variant="contained">Assign Shift</Button>
                        </Grid>
                    </Grid>
                    </Grid>    
                    </Grid> 
                </form>                           
                </Box>
           
            </Box>
            </Modal>
        </>
    )

}

export default CalendarModalButton