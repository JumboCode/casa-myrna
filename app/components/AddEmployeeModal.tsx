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
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import RoleSelect from './RoleSelect'


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

   //function MenuSimple() {
    const createHandleMenuClick = (menuItem: string) => () => {
        return("");
    }
    //   return () => {
    //     console.log(`Clicked on ${menuItem}`);
    //   };
//     };
// }
const AddEmployeeModal: React.FC = ()  => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

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
        <Grid container spacing={5} columnSpacing={{xs: 10, sm:80, md:5, lg:5}} justify-content='flex-start' alignItems='flex-start' columns={12}  margin={{xs: 1, sm: 2, md: 3, lg: 4}}>
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
            {/* This is column 1 */}
            <Grid container spacing={4} direction='column' alignItems='flex-center'>
                <Grid xs ={12} sm={12} md={12} lg={12} justifyContent ={'flex-start'}>
                   <Typography variant="h4">
                        First Name
                    </Typography>
                    <TextField defaultValue="Jumbo" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Last Name
                    </Typography>
                    <TextField defaultValue="Code" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}  }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Email
                    </Typography>
                    <TextField defaultValue="myrna@gmail.com" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
            </Grid>
            {/* This is column 2 */}
            <Grid container spacing={4} direction='column' alignItems='flex-start'  paddingBottom='13%'>
                <Grid direction='row' xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Pronouns
                    </Typography>
                    <TextField defaultValue="casa/myrna" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}}} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"></TextField>
                    <Button variant="text" sx={{ borderRadius: '20px', textIndent: '10px', borderColor: theme.palette.primary.main, color: "#000000", '&:hover': {borderColor: theme.palette.primary.main}, textTransform: 'none', paddingRight: '10%'}}>
                        <Image src={UploadImage} alt="upload image" width={20} height={20} /></Button>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4">
                       Role
                    </Typography>
                    <RoleSelect/>                    
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4">
                        Phone Number
                    </Typography>
                    <TextField defaultValue="000-000-0000" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}  }}sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' textAlign ='center' paddingTop='15%' paddingRight='15%' paddingLeft='20%' sx = {{ display:'flex', justifyContent:'center'}}>
                    <Button sx={{ paddingLeft: '10%', textIndent:'5.5px', paddingRight:'10%', borderRadius:'25px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">Save Changes</Button>
                </Grid>
                </Grid>    
                </Grid>                            
                </Box>
           
            </Box>
            </Modal>
            </div> )
    
      
  
    
}

export default AddEmployeeModal
  
