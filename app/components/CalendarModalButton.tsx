// @ts-nocheck
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { profileData } from './types';
import ComboBox from './ComboBox';

// import "../calendar/[[...calendar]]/calendar.css"
import "../calendar/[[...calendar]]/calendar.css" 

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

const initialFormData = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    assignedEmployee: '',
    phoneLine: ''
};

const CalendarModalButton: FC<any> = ({ callback }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formData, setFormData] = useState(initialFormData);

    // For ComboBox Emplyee Selection
    // const [selectedEmployee, setSelectedEmployee] = useState<profileData | null>(null);

    // const handleSelectEmployee = (selectedValue: profileData | null) => {
    //   setSelectedEmployee(selectedValue);
    // };

    const handleSelectEmployee = (selectedValue: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            assignedEmployee: selectedValue,
        }));
    };

    // Handle form input change
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission (IN PROGRESS)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdAt = new Date().toISOString();

        // format start and end date/times
        startDate.setHours(parseInt(formData.startTime))
        endDate.setHours(parseInt(formData.endTime))

        console.log(startDate.toISOString())
        console.log(endDate.toISOString())

        // const [firstName, lastName] = formData.assignedEmployee.split(' ');
        let firstName, lastName;
        if (formData.assignedEmployee) {
            [firstName, lastName] = formData.assignedEmployee.split(' ');
        } else {
            firstName = '';
            lastName = '';
        }

        const requestData = {
            // ...formData,
            firstName: firstName,
            lastName: lastName,
            phoneLine: parseInt(formData.phoneLine),
            date: startDate.toString(), // not necessary anymore
            from: startDate.toISOString(),
            to: endDate.toISOString(),
            created_at: createdAt,
            userID: "2",
            message: 'hello',
            status: firstName === '' && lastName === '' ? 'CANCELLED' : 'ACCEPTED',
            onCallShiftID: 1
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
            callback(Date.now())
            handleClose();
        } catch (error) {
            console.error('Error assigning shift:', error);
        }
    };

    return (
        <div sx={{ position: "relative"}}>

            <Button
                variant="contained"
                onClick={handleOpen}
                className="add-shift-btn"  
                style={{ marginBottom: '10px', marginLeft: '10px', textTransform: 'none', minWidth: 180, minHeight: 70, fontFamily: 'Montserrat', fontSize: '16', fontWeight: 'bold', color: 'black', backgroundColor: "white", border: true, borderRadius: "35px", border: '1px solid purple' }} 
                display={{ sm:"absolute", top: 80, right:0 }}
                top={{sm:0}}
                right={{sm:0}}
            >
                <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className="add-shift-svg">
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#0a0a0a"
                        strokeWidth="1.392"></g>
                    <g id="SVGRepo_iconCarrier">
                        <rect width="8" height="8" fill="white"></rect>
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                            fill="#3c0085"></path>
                    </g>
                </svg>
                Add Shift
            </Button>
            <Modal
                open={open}
                onClose={handleClose}>
                {/* Gray Modal Box */}
                <Box sx={style}>
                    {/* Button Box */}
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
                            Add Shift
                        </Typography>
                    </Box>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={5} columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }} justify-content='flex-start' alignItems='flex-start' columns={12} margin={{ xs: 1, sm: 2, md: 3, lg: 4 }}>

                                <Grid container spacing={4} direction='column' alignItems='flex-start' paddingBottom='13%'>
                                    <Grid container direction="row" justifyContent={'flex-end'} xs={12} sm={12} md={12} lg={12} sx={{ marginTop: '20px', marginLeft: '-130px' }}>
                                        <Typography variant="h4" sx={{ marginTop: '15px', marginRight: '10px' }}>
                                            Start Time: <span style={{ color: 'red' }}>*</span>
                                        </Typography>

                                        {/* Start Date */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Start Date"
                                                onChange={(newValue) => setStartDate(new Date(newValue))}
                                                sx={{ marginRight: '10px', width: '180px' }}
                                            />
                                        </LocalizationProvider>

                                        <Select
                                            name="startTime"
                                            value={formData.startTime}
                                            onChange={handleInputChange}
                                            required
                                            sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px' }}
                                        >
                                            <MenuItem value={0}>12:00 am</MenuItem>
                                            <MenuItem value={1}>1:00 am</MenuItem>
                                            <MenuItem value={2}>2:00 am</MenuItem>
                                            <MenuItem value={3}>3:00 am</MenuItem>
                                            <MenuItem value={4}>4:00 am</MenuItem>
                                            <MenuItem value={5}>5:00 am</MenuItem>
                                            <MenuItem value={6}>6:00 am</MenuItem>
                                            <MenuItem value={7}>7:00 am</MenuItem>
                                            <MenuItem value={8}>8:00 am</MenuItem>
                                            <MenuItem value={9}>9:00 am</MenuItem>
                                            <MenuItem value={10}>10:00 am</MenuItem>
                                            <MenuItem value={11}>11:00 am</MenuItem>
                                            <MenuItem value={12}>12:00 pm</MenuItem>
                                            <MenuItem value={13}>1:00 pm</MenuItem>
                                            <MenuItem value={14}>2:00 pm</MenuItem>
                                            <MenuItem value={15}>3:00 pm</MenuItem>
                                            <MenuItem value={16}>4:00 pm</MenuItem>
                                            <MenuItem value={17}>5:00 pm</MenuItem>
                                            <MenuItem value={18}>6:00 pm</MenuItem>
                                            <MenuItem value={19}>7:00 pm</MenuItem>
                                            <MenuItem value={20}>8:00 pm</MenuItem>
                                            <MenuItem value={21}>9:00 pm</MenuItem>
                                            <MenuItem value={22}>10:00 pm</MenuItem>
                                            <MenuItem value={23}>11:00 pm</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                                        <Typography variant="h4" sx={{ marginTop: '15px', marginRight: '15px' }}>
                                            End Time: <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div component={['DatePicker']} >
                                                <DatePicker
                                                    label="End Date"
                                                    onChange={(newValue) => setEndDate(new Date(newValue))}
                                                    sx={{ marginRight: '10px', width: '180px' }}
                                                />
                                            </div>
                                        </LocalizationProvider>

                                        <Select
                                            name="endTime"
                                            value={formData.endTime}
                                            onChange={handleInputChange}
                                            required
                                            sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px' }}
                                        >
                                            <MenuItem value={0}>12:00 am</MenuItem>
                                            <MenuItem value={1}>1:00 am</MenuItem>
                                            <MenuItem value={2}>2:00 am</MenuItem>
                                            <MenuItem value={3}>3:00 am</MenuItem>
                                            <MenuItem value={4}>4:00 am</MenuItem>
                                            <MenuItem value={5}>5:00 am</MenuItem>
                                            <MenuItem value={6}>6:00 am</MenuItem>
                                            <MenuItem value={7}>7:00 am</MenuItem>
                                            <MenuItem value={8}>8:00 am</MenuItem>
                                            <MenuItem value={9}>9:00 am</MenuItem>
                                            <MenuItem value={10}>10:00 am</MenuItem>
                                            <MenuItem value={11}>11:00 am</MenuItem>
                                            <MenuItem value={12}>12:00 pm</MenuItem>
                                            <MenuItem value={13}>1:00 pm</MenuItem>
                                            <MenuItem value={14}>2:00 pm</MenuItem>
                                            <MenuItem value={15}>3:00 pm</MenuItem>
                                            <MenuItem value={16}>4:00 pm</MenuItem>
                                            <MenuItem value={17}>5:00 pm</MenuItem>
                                            <MenuItem value={18}>6:00 pm</MenuItem>
                                            <MenuItem value={19}>7:00 pm</MenuItem>
                                            <MenuItem value={20}>8:00 pm</MenuItem>
                                            <MenuItem value={21}>9:00 pm</MenuItem>
                                            <MenuItem value={22}>10:00 pm</MenuItem>
                                            <MenuItem value={23}>11:00 pm</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                                        <Typography variant="h4" sx={{ marginTop: '15px', marginRight: '21px' }}>
                                            Assigned Employee:
                                        </Typography>
                                        {/* Dropdown list for employee name selection to update useState of formdata information*/}
                                        <ComboBox onSelect={handleSelectEmployee} />
                                    </Grid>
                                    <Grid container direction="row" xs={12} sm={12} md={12} lg={12} sx={{ marginTop: '18px', marginLeft: '-130px', justifyContent: 'flex-end' }}>
                                        <Typography variant="h4" sx={{ marginTop: '15px', marginRight: '188px' }}>
                                            Phone Line: <span style={{ color: 'red' }}>*</span>
                                        </Typography>
                                        <Select
                                            name="phoneLine"
                                            value={formData.phoneLine}
                                            onChange={handleInputChange}
                                            required
                                            sx={{ borderRadius: '10px', width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '56px' }}
                                        >
                                            <MenuItem value={'1'}>1</MenuItem>
                                            <MenuItem value={'2'}>2</MenuItem>
                                            <MenuItem value={'3'}>3</MenuItem>
                                            <MenuItem value={'4'}>4</MenuItem>
                                            <MenuItem value={'5'}>5</MenuItem>
                                            <MenuItem value={'6'}>6</MenuItem>

                                        </Select>
                                    </Grid>
                                    <Grid xs={12} sm={12} md={12} lg={12} container spacing={6} justifyContent='flex-end' textAlign='center' sx={{ marginTop: '1px', display: 'flex', justifyContent: 'center' }}>
                                        <Grid item xs={3}>
                                            <Button type="submit" sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: "#2E0057" }, textTransform: 'none' }} variant="contained">Cancel Shift</Button>
                                        </Grid>
                                        {/* ASSIGN SHIFT CONFIRMATION BUTTON (where we post shift) */}
                                        <Grid item xs={3}>
                                            <Button type="submit" variant="contained" sx={{ paddingLeft: '10%', textIndent: '5.5px', paddingRight: '10%', borderRadius: '10px', backgroundColor: theme.palette.secondary.main, '&:hover': { backgroundColor: "#89B839" }, textTransform: 'none' }}>Assign Shift</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>

                </Box>
            </Modal>
        </div>
    )

}

export default CalendarModalButton