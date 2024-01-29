"use client"

import { FC, useState } from 'react'
import Button from '@mui/material/Button';
import "@/app/calendar/[[...calendar]]/calendar.css"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Stack from '@mui/material/Stack';
import React from 'react';
import { Grid, MenuItem, Select, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import theme from '../theme';
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
const CalendarModalButton: FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    const initialFormData = {
        
        phoneLine:'',
        startTime:'',
        endTime:'',
        assignedEmployee:'',
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
    //   e.preventDefault();
    //   try {
    //     const response = await fetch('/api/users', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(formData),
    //     });
  
    //     if (!response.ok) {
    //       throw new Error('Failed to add employee');
    //     }
  
    //     const user = await response.json();
    //     console.log('New user:', user);
    //     // Handle success - maybe close the modal or show a success message
    //   } catch (error) {
    //     console.error('Error adding employee:', error);
    //   }
    //   setFormData(initialFormData);

    };

    return (
        <>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
            >
                Open Modal
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
                <Grid container direction="row" justifyContent={'flex-end'} xs ={12} sm={12} md={12} lg={12}sx={{ marginLeft: '-130px' }}>
                    <Typography variant="h4">
                      Start Time: 
                    </Typography>
                    <Button variant= 'outlined'sx={{borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}> Date</Button>
                    <Select
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleSelectChange}
                        sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
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
                <Grid container direction="row" xs ={12} sm={12} md={12} lg={12} sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4"sx={{marginRight: '7px' }}>
                       End Time: 
                    </Typography>
                    <Button variant= 'outlined'sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}> Date</Button>
                    <Select
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleSelectChange}
                        sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
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
                <Grid container direction="row" xs ={12} sm={12} md={12} lg={12}sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4"sx={{marginRight: '114px' }}>
                       Assigned Employee: 
                    </Typography>
                    <Select
                        name="assignedEmployee"
                        value={formData.assignedEmployee}
                        onChange={handleSelectChange}
                        sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
                    >
                    <MenuItem value={'Carly Seigel'}>Carly Seigel</MenuItem>
                    <MenuItem value={'Eliana Longoria-Valenzuela'}>Eliana Longoria-Valenzuela</MenuItem>
                </Select>
                </Grid>
                <Grid container direction="row" xs ={12} sm={12} md={12} lg={12}sx={{ marginLeft: '-130px', justifyContent: 'flex-end' }}>
                    <Typography variant="h4" sx={{marginRight: '182px' }}>
                       Phone Line: 
                    </Typography>
                        <Select
                        name="phoneLine"
                        value={formData.phoneLine}
                        onChange={handleSelectChange}
                        sx={{ borderRadius: '10px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
                    >
                    <MenuItem value={'1'}>1</MenuItem>
                    <MenuItem value={'2'}>2</MenuItem>
                    <MenuItem value={'3'}>3</MenuItem>
                    <MenuItem value={'4'}>4</MenuItem>
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'6'}>6</MenuItem>

                </Select>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign ='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx = {{ display:'flex', justifyContent:'center'}}>
                <Button type="submit" sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'10px', backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor:"#2E0057"}, textTransform: 'none'}}variant="contained">Cancel Shift</Button>
                    <Button type="submit" sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'10px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">Assign Shift</Button>
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