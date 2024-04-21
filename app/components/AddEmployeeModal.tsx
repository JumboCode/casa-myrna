// @ts-nocheck
import * as React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2' ;
import Divider from '@mui/material/Divider';
import theme from '../theme';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from "next/image";
import Add from "../images/9.png"
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import UploadImage from '../images/6.png';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { profileData } from './types';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

// import {fetchPeopleData} from '/ManageProfiles.tsx';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:  {
          lg: 800,
          xs: '80%'
    },
    height: {
          lg: 400,
          xs: '70%'
    },
    bgcolor: "#f6f6f6",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '35px',
  }; 

  type AddEmployeeModalProps = {
      profiles: profileData[],
      onUpdate: Function;
  };

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({profiles, onUpdate})  => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Success Alert
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClick = () => {
        setOpenSnack(true);
      };
    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnack(false);
    };
    

    const initialFormData = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        role: '',
        pronouns: '',
        phoneNumber:''
      };

    // Phone number
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (value: string | undefined) => {
      setPhoneNumber(value);
      setFormData({ ...formData, phoneNumber: value });
    };

    // Email
    const [emailError, setEmailError] = useState('');

    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
      if (name === 'emailAddress') {
        if (!value.endsWith('@casamyrna.org')) {
            setEmailError('Email must end with @casamyrna.org');
        } else {
            setEmailError('');
        }
      }
    };
    const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
      const { name, value } = event.target;
    
        setFormData({
          ...formData,
          [name]: value,
        });
    };
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (emailError) {
        alert('Please correct the errors before submitting.');
        return;
    }
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add employee');
        }
  
        const user = await response.json();

        // Handle success - close the modal 
        setOpen(false);
        handleSnackClick(); // show a success message

        // Update the current profiles list without needing to refresh the page
        onUpdate([user, ...profiles]);
        
      } catch (error) {
        console.error('Error adding employee:', error);
      }
      setFormData(initialFormData);

    };

return (
    <div>
        <Button fullWidth variant="outlined" sx={{ padding: '3%', borderRadius: '25px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': { borderColor: theme.palette.primary.main }, textTransform: 'none', display: 'flex', alignItems: 'center' }}
        onClick= {handleOpen}> <div style={{ width: '160px' }}>Add New Employees</div>
        <Image src={Add} alt="Error" width={30} height={30} />
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
                <Typography sx={{ fontSize: {lg:'36px', xs:'22px'}}}>
                    Add New Employee Profile
                </Typography>
            </Box>
            <Box>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={5} columnSpacing={{xs: 10, sm:80, md:5, lg:5}} justify-content='flex-start' alignItems='flex-start' columns={12}  margin={{xs: 1, sm: 2, md: 3, lg: 4}}>

              {/* Outer Grid, 2 sections, left is profile, right are fields */}
              <Grid container spacing={4} direction='row' justifyContent='flex-start' alignItems='flex-start'>



                      {/* PROFILE SECTION */}
                      <Grid container spacing={4} direction='column' justifyContent='flex-start' alignItems='flex-start'>

                          <Grid xs={12} sm={12} md={12} lg={12} sx={{ justifyContent:'flex-start', alignItems:'flex-start', display: 'flex'}}>
                              <Avatar alt="Remy Sharp" sx={{ width: 150, height: 150 }} />
                          </Grid>

                          <Grid xs={12} sm={12} md={12} lg={12} textAlign={'center'}>
              
                              <Button variant="outlined" sx={{ textIndent: '2px' ,borderRadius: '20px',  borderColor: theme.palette.primary.main, color: "#000000", '&:hover': {borderColor: theme.palette.primary.main}, textTransform: 'none', paddingRight: '10%'}}>
                                  <Image src={UploadImage} alt="upload image" width={17} height={17} />
                                  Upload Picture
                              </Button>
                              
                          </Grid>

                      </Grid>


                      {/* FIELDS SECTION */}
                      <Grid container spacing={3} direction='column' justifyContent='flex-start' alignItems='flex-start'>

                          {/* First and Last Name Row */}
                          <Grid container spacing={4} direction='row' justifyContent='flex-start' alignItems='flex-start'>
                              {/* First Name */}
                              <Grid xs ={6} sm={6} md={6} lg={6} justifyContent ={'flex-start'}>
                                  <Typography variant="h4">
                                      First Name
                                  </Typography>
                                  <TextField 
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleInputChange} 
                                      InputProps={{disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                                      variant="standard"
                                      required/>
                              </Grid>
                              {/* Last Name */}
                              <Grid xs ={6} sm={6} md={6} lg={6}>
                                  <Typography variant="h4" >
                                      Last Name
                                  </Typography>
                                  <TextField 
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  InputProps={{disableUnderline: true, style: {paddingLeft: 8}  }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                                  variant="standard"
                                  required/>
                              </Grid>
      
                          </Grid>

                          {/* Pronouns and Role Row */}
                          <Grid container spacing={6} direction='row' justifyContent='flex-start' alignItems='flex-start'>
                                {/* Pronouns */}
                                <Grid direction='row' xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="h4" >
                                        Pronouns
                                    </Typography>
                                    <TextField
                                    name="pronouns"
                                    value={formData.pronouns}
                                    onChange={handleInputChange} 
                                    InputProps={{disableUnderline: true, style: {paddingLeft: 8}}} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                                    variant="standard"/>
                                </Grid>
                                {/* Role */}
                                <Grid xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="h4">
                                      Role
                                    </Typography>
                                    <Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleSelectChange}
                                        sx={{ borderRadius: '20px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
                                        required
                                    >
                                        <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                                        <MenuItem value={'Full-time Staff'}>Full-time Staff</MenuItem>
                                        <MenuItem value={'Part-time Staff'}>Part-time Staff</MenuItem>
                                        <MenuItem value={'Relief Staff'}>Relief Staff</MenuItem>
                                    </Select>
                                </Grid>
                          </Grid>

                          {/* Email and Phone Number Row */}
                          <Grid container spacing={5} direction='row' justifyContent='flex-start' alignItems='flex-start'>
                                {/* Email */}
                                <Grid xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="h4" >
                                        Email
                                    </Typography>
                                    <TextField 
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    InputProps={{disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                                    variant="standard"
                                    error={Boolean(emailError)}
                                    helperText={emailError}
                                    required/>
                                </Grid>
                                {/* Phone Number */}
                                <Grid xs={6} sm={6} md={6} lg={6}>
                                    <Typography variant="h4">
                                        Phone Number
                                    </Typography>
                                    <PhoneInput
                                        international
                                        countryCallingCodeEditable={false}
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        defaultCountry="US"
                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                                        required />
                                  </Grid>
                          </Grid>
                          {/* Submit Row */}
                          <Grid container spacing={4} direction='row' sx={{paddingLeft: '70%'}}>
                              <Grid xs={12} sm={12} md={12} lg={12}>
                                    <Button type="submit" sx={{ width: '130%', paddingLeft: '10%', textIndent:'5.5px', borderRadius:'25px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">Save Changes</Button>
                              </Grid>
                          </Grid>

                      </Grid>
              </Grid>
            </Grid> 
            </form>                           
            </Box>
          </Box>
        </Modal>

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert
                onClose={handleCloseSnack}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                A profile was created.
                </Alert>
            </Snackbar>
            </div> )
     
};

export default AddEmployeeModal
  
