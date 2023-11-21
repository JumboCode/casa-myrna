import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2' ;
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
import { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import UploadImage from '../images/6.png';
const color = "#f6f6f6"; //establishes where on the grey scale so we can use it later!

const BoxSx: FC = () => {
    const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: "87vh",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: '5vh', //makes rounded corners
        backgroundColor: color, //color is variable established above! (grey!)
      }}
    >
        <Grid container spacing={5} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} justify-content='space-between' alignItems='flex-start' columns={12}  margin={4}>
           <Grid container spacing={4} direction='column' justifyContent='center' alignItems='center'>
                <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='center' alignItems='flex-start' paddingBottom='15%'>
                    <Typography variant="h1" textAlign={'center'} justifyContent={'center'}>
                        My Profile
                    </Typography>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} sx={{ justifyContent:'center', alignItems:'center', display: 'flex'}}>
                    <Avatar alt="Remy Sharp" sx={{ width: 200, height: 200 }} />
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} textAlign={'center'}>
                    <Button variant="outlined" sx={{ borderRadius: '20px', textIndent: '10px', borderColor: theme.palette.primary.main, color: "#000000", '&:hover': {borderColor: theme.palette.primary.main}, textTransform: 'none', paddingRight: '10%'}}>
                        <Image src={UploadImage} alt="upload image" width={20} height={20} />
                        Upload Picture
                    </Button>
                </Grid>
            </Grid>
            <Grid>
            </Grid>
            {/* This is column 1 */}
            <Grid container spacing={4} direction='column' alignItems='flex-center' paddingTop='12%'>
                <Grid xs ={12} sm={12} md={12} lg={12}>
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
                        Username
                    </Typography>
                    <TextField defaultValue="Casa" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}   }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Email
                    </Typography>
                    <TextField defaultValue="myrna@gmail.com" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
            </Grid>
            {/* This is column 2 */}
            <Grid container spacing={4} direction='column' alignItems='flex-start' paddingTop='12%' paddingBottom='10%'>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Pronouns
                    </Typography>
                    <TextField defaultValue="casa/myrna" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}}} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"></TextField>
                    <Button variant="text" sx={{ borderRadius: '20px', textIndent: '10px', borderColor: theme.palette.primary.main, color: "#000000", '&:hover': {borderColor: theme.palette.primary.main}, textTransform: 'none', paddingRight: '10%'}}>
                        <Image src={UploadImage} alt="upload image" width={20} height={20} /></Button>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Role
                    </Typography>
                    <TextField defaultValue="Employee" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8} }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" >
                        Password
                    </Typography>
                    <TextField defaultValue="casa.myrna123" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}  }} sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4">
                        Phone Number
                    </Typography>
                    <TextField defaultValue="000-000-0000" InputProps={{readOnly: true, disableUnderline: true, style: {paddingLeft: 8}  }}sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="outlined-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' paddingTop='20%' paddingRight='15%' sx = {{ display:'flex', justifyContent:'flex-end'}}>
                    <Button sx={{paddingLeft:'10%', paddingRight:'10%', borderRadius:'25px', backgroundColor: theme.palette.secondary.main, '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">Save Changes</Button>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}

export default BoxSx;
