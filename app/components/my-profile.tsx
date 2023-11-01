
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { ClientReferenceManifestPlugin } from 'next/dist/build/webpack/plugins/flight-manifest-plugin';
import { grey } from '@mui/material/colors'; //imports grey series from materialUI website
import { deepPurple } from '@mui/material/colors';
import { lightGreen } from '@mui/material/colors';
import Grid from '@mui/material/Unstable_Grid2' ;
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import SvgIcon from '@mui/material/SvgIcon';
// import Icon from '@mui/material/Icon';
import PersonIcon from '@mui/icons-material/Person';
const color = "#f6f6f6"; //establishes where on the grey scale so we can use it later!
const hoverColor = "#f6f6f6"; //variable for darker shade that happens when yu hover!
const darkPurple = deepPurple[900];
const saveChangesGreen = lightGreen[300];
const BoxSx = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: "90vh",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: '5%', //makes rounded corners
        backgroundColor: color, //color is variable established above! (grey!)
        fontFamily: 'default',
        margin: '2%'
      }}
    >
        <Grid container spacing={5} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} justify-content='space-between' alignItems='flex-center' columns={12}  margin={4}>
        {/* <div style={{justifyContent:'center', alignItems:'center'}}> */}
        {/* <Grid container spacing={5}  justify-content='space-between' alignItems='flex-center' columns={12}> */}
           {/* This is column 0 */}
           {/* <div style={{alignItems:'center'}} align='top'>  */}
            <Grid container spacing={4} direction='column'>
                <Grid container xs={12} sm={12} md={12} lg={12} justifyContent='center' alignItems='flex-start' paddingBottom='20%'>
                    <Typography variant="h4" textAlign={'center'} justifyContent={'center'} sx={{fontWeight: 'bold'}}>
                        My Profile
                    </Typography>
                </Grid>
                <Grid xs={15} sm={12} md={12} lg={12}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 200, height: 200, justifyContent:'center', alignItems:'center'}}/>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12} textAlign={'center'} justifyContent='center'>
                    <Button fullWidth={true} variant="outlined" sx={{ borderRadius: '20px', textIndent:'10px'}}>Upload Picture</Button>
                </Grid>
            </Grid>
            {/* </div> */}
            <Grid>
            </Grid>
            {/* This is column 1 */}
            <Grid container spacing={4} direction='column' alignItems='flex-center' paddingTop='12%'>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                   <Typography sx={{fontWeight: 'bold',}} >
                        First Name
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Last Name
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Username
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Email
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
            </Grid>
            {/* This is column 2 */}
            <Grid container spacing={4} direction='column' alignItems='flex-start' paddingTop='12%' paddingBottom='10%'>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Pronouns
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Role
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold', }} >
                        Password
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12}>
                    <Typography sx={{fontWeight: 'bold',}} >
                        Phone Number
                    </Typography>
                    <TextField sx={{backgroundColor: '#FFFFFF', borderRadius:'10px'}} id="filled-basic" label="" variant="standard"/>
                </Grid>
                <Grid xs ={12} sm={12} md={12} lg={12} container justifyContent='flex-end' paddingTop='20%' paddingRight='15%'>
                    <Button variant="contained">Save Changes</Button>
                </Grid>
            </Grid>
            
        {/* </div> */}
        </Grid>
    </Box>
  );
}

export default BoxSx;
