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
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import UploadImage from '../images/6.png';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { profileData } from './types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
    type EditEmployeeModalProps = {
        emailAddress: string,
        profiles: profileData[],
        updateProfiles: Function;
    };
      
const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ emailAddress, profiles, updateProfiles}) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    
       
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', role: '', pronouns: '', phoneNumber: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [idString, setidString] = useState({ id: ''});

    // Success Alert
    const [openSnack, setOpenSnack] = React.useState(false);
    const handleSnackClick = () => {
        console.log("in snack click");
        setOpenSnack(true);
      };
    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      console.log("in closing snack click");

      setOpenSnack(false);
    };

    // Success alert 2 for deleting:
    const [openSnack2, setOpenSnack2] = React.useState(false);
    const handleSnackClick2 = () => {
        console.log("in handle click2");
        setOpenSnack2(true);
      };
    

    const handleCloseSnack2 = (event?: React.SyntheticEvent | Event, reason?: string) => {
        console.log("in closing snack click2");
      if (reason === 'clickaway') {
        return;
      }
      
  
      setOpenSnack2(false);
    };

      
    
    /* Fetches user data when 'edit' button is clicked for that user email passed into Modal */
    const fetchUserByEmail = async () => {
        setOpen(true);
        setLoading(true);

        try {
            const response = await fetch(`/api/users?emailAddress=${encodeURIComponent(emailAddress)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }

            const userDataArray = await response.json();

            /* Since the response is in array form, access the first element */
            const userObject = userDataArray[0];
    
            setidString({
                ...idString,
                id: userObject.id
            });

            /* Pre-fill the form for edit employee modal to fetched user data */
            setFormData({
                    ...formData, // Keep other form data intact
                    firstName: userObject.firstName, // Set the firstName after fetching
                    lastName: userObject.lastName, // Assuming you also have the last name from the fetched data
                    emailAddress: emailAddress,
                    role: userObject.publicMetadata.role,
                    pronouns: userObject.publicMetadata.pronouns,
                    phoneNumber: userObject.publicMetadata.phoneNumber,
                    hasImgae: true
                    
            });

            setUser({
                    ...user, // Spread the existing user state
                    firstName: userObject.firstName,
            });
    
        } catch (error) {
                setError('Error fetching user: ' + error.message);
        } finally {
                setLoading(false);
        }
    };

        
    /* Default initial form data, prior to updates */
    const initialFormData = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            role: '',
            pronouns: '',
            phoneNumber:'',
            hasImgae: false
    };
 
    /* This updates the submit form data with the fetched user data */
    const [formData, setFormData] = useState(initialFormData);

    /* Handle input change */
    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    /* Handle Select Change, e.g. role selection */
    const handleSelectChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    /* Handle Deleting an employee */
    const handleDelete = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {

            /* Show a success message and reload the page immediately */
            setOpen(false);
            handleSnackClick2();            
            /* Delete user from the database with specified unique id*/
            const response = await fetch(`/api/users?id=${encodeURIComponent(idString.id)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
  
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
  
            const user = await response.json();

            /* Update the state of the profile list on the page to remove deleted profile*/
            const updatedProfiles = profiles.filter(a => a.id !== idString.id);
    
            const updateResult = await updateProfiles(updatedProfiles);
            
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    /* Creates data to send to the database in the proper format upon submission */
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setOpen(false);
            handleSnackClick(); // show a success message

            /* Match specification of database, different from form data formatting */
            const finalFormData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                emailAddress: formData.emailAddress,
                publicMetadata: {
                    role: formData.role,
                    pronouns: formData.pronouns,
                    phoneNumber: formData.phoneNumber,
                },
                
                hasImgae: false
            };
            
            /* Update the database with the new fields*/
            const response = await fetch(`/api/users?id=${encodeURIComponent(idString.id)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalFormData),
            });
  
            if (!response.ok) {
                throw new Error('Failed to edit employee');
            }
  
            const user = await response.json();

            const updatedProfiles = profiles.map(p => {
                if (p.id === idString.id) {
                    // Create a new object with changes
                    return { ...p, firstName: user.firstName, lastName: user.lastName, emailAddress: user.emailAddress, publicMetaData: user.publicMetadata };
                } else {
                    // No changes
                    return p;
                }
            });
    
            const result = await updateProfiles(updatedProfiles);
            window.location.reload(false);

        } catch (error) {
            console.error('Error editing employee:', error);
        }

        setFormData(initialFormData);

    };

return (
    <div>
        {/* visible Edit Button */}
        <Button color="secondary" onClick={fetchUserByEmail} disabled={loading}>  <Image src={UploadImage} alt="upload image" width={20} height={20} /> </Button>
        <Modal 
            open={open}
            onClose={handleClose}>
        {/* Gray Modal Box */}
        <Box sx={style}>
            {/* Button Box */}
            {/* <Box sx={{width: 50, height: 50, position: 'absolute', right: '5%', fill:'none'}}>
                <button 
                    onClick={() => {
                    handleClose();
                    }}>
                    <CloseOutlinedIcon color="secondary" />
                </button> */}
            {/* </Box> */}
            <Box sx={{paddingLeft: 2, paddingRight: 6}}>
                <Typography sx={{ fontSize: {lg:'36px', xs:'22px'}}}>
                    Edit Employee Profile
                </Typography>
            </Box>
            <Box>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={5} columnSpacing={{xs: 10, sm:80, md:5, lg:5}} justify-content='flex-start' alignItems='flex-start' columns={12}  margin={{xs: 1, sm: 2, md: 3, lg: 4}}>
           <Grid container spacing={4} direction='column' justifyContent='flex-start' alignItems='flex-start'>
                <Grid xs={12} sm={12} md={12} lg={12} sx={{ justifyContent:'flex-start', alignItems:'flex-start', display: 'flex'}}>
                    <Avatar alt="Remy Sharp" sx={{ width: 150, height: 150 }} />
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} textAlign={'center'}>
    
                    <Button variant="outlined" sx={{ textIndent: '2px' ,borderRadius: '20px',  borderColor: theme.palette.primary.main, color: "#000000", '&:hover': {borderColor: theme.palette.primary.main}, textTransform: 'none', paddingRight: '10%'}}>
                <Image src={UploadImage} alt="upload image" width={17} height={17} />
                        delete photo
                    </Button>
                    
                </Grid>
            </Grid>
            {/* This is column 1 */}
            <Grid container spacing={4} direction='column' alignItems='flex-center'>
                <Grid xs ={12} sm={12} md={12} lg={12} justifyContent ={'flex-start'}>
                   <Typography variant="h4">
                        First Name
                    </Typography>
                    <TextField 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange} 
                        InputProps={{disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                        variant="standard"/>
                </Grid>
                <Grid direction='row' xs ={12} sm={12} md={12} lg={12}>
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
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Email
                    </Typography>
                    <TextField 
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    InputProps={{disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                    variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign ='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx = {{ display:'flex', justifyContent:'right'}}>
                    <Button type="button" onClick={handleDelete} sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'25px', backgroundColor: theme.palette.primary.main, '&:hover': {backgroundColor:"#2E0057"}, textTransform: 'none'}}variant="contained">Delete Employee</Button>
                </Grid>
            </Grid>
            {/* This is column 2 */}
            
            <Grid container spacing={4} direction='column' alignItems='flex-start'  paddingBottom='13%'>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Last Name
                    </Typography>
                    <TextField 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    InputProps={{disableUnderline: true, style: {paddingLeft: 8}  }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                    variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4">
                       Role
                    </Typography>
                    <Select
                        name="role"
                        value={formData.role}
                        onChange={handleSelectChange}
                        sx={{ borderRadius: '20px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
                    >
                    <MenuItem value={'Coordinator'}>Coordinator</MenuItem>
                    <MenuItem value={'Full-time Staff'}>Full-time Staff</MenuItem>
                    <MenuItem value={'Part-time Staff'}>Part-time Staff</MenuItem>
                    <MenuItem value={'Relief Staff'}>Relief Staff</MenuItem>
                </Select>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4">
                        Phone Number
                    </Typography>
                    <TextField 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    InputProps={{disableUnderline: true, style: {paddingLeft: 8}  }}sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} 
                    variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign ='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx = {{ display:'flex', justifyContent:'center'}}>
                    <Button type="submit" sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'25px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">Save Changes</Button>
                </Grid>
                </Grid>    
                </Grid> 
                </form>                           
                </Box>
           
            </Box>
            </Modal>
            <Snackbar open={openSnack} autoHideDuration={15000} onClose={handleCloseSnack}>
                <Alert
                onClose={handleCloseSnack}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                Your changes were saved.
                </Alert>
            </Snackbar>


            {/* Condense and modularize later.... */}
            <Snackbar open={openSnack2} autoHideDuration={6000} onClose={handleCloseSnack2}>
                <Alert
                onClose={handleCloseSnack2}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                A profile was deleted.
                </Alert>
            </Snackbar>
            </div> )
     
};

export default EditEmployeeModal
  








