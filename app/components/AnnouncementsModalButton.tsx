"use client"

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2' ;
import Divider from '@mui/material/Divider';
import theme from '../theme';

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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '35px',
};

const AnnouncementsModalButton: React.FC = ()  => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <Button variant='contained' sx={{position: 'absolute' as 'absolute',top: '50%', left: '50%',}} onClick={handleOpen}>View Announcement</Button>
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
                    This is the Announcement Title:
                </Typography>
            </Box>
            {/* White Box */}
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '80%',
                    borderRadius: '20px', //makes rounded corners
                    backgroundColor: '#ffffff', //white inner box color
                    fontFamily: 'default',
                    margin: '2%',
                    justifyContent: 'flex-center',
                    
                }}>
                <Box>
                <Grid>
                    <Grid container sx= {{display: 'flex', p:2.5}}>
                        {/* Grid column 0 */}
                        <Grid container>
                            <Avatar sx={{width: {xs:40, lg:50}, height: {xs:40, lg:50}}}alt="Bemy Sharp" src="/static/images/avatar/1.jpg" />
                        </Grid>

                        {/* Grid column 1 */}
                        <Grid container sx={{width:{xs: '40%',lg:'30%'}, direction: 'column', ml: '2%'}}>
                            <Grid sx={{width: '100%', justifyContent: 'flex-start'}}>
                                <Typography sx={{ fontSize: {lg:'18px', xs:'14px'}}}>
                                    Sender Name
                                </Typography> 
                            </Grid>
                            <Grid sx={{justifyContent: 'flex-start'}}>
                                <Typography sx={{ fontSize: {lg:'18px', xs:'12px'}}}>
                                    To: <i>All Groups</i>
                                </Typography> 
                            </Grid>
                        </Grid>
                        
                        {/* Grid column 2 */}
                        <Grid sx={{width: {xs: '40%',lg:'60%'}, direction: 'column'}}>
                            <Grid container sx={{justifyContent: 'flex-end'}}>
                                {/* Date */}
                                <Typography sx={{ fontSize: {lg:'16px', xs:'10px'}}}>
                                    12 November Sun
                                </Typography> 
                            </Grid>
                            <Grid container sx={{justifyContent: 'flex-end'}}>
                                {/* Time */}
                                <Typography sx={{ fontSize: {lg:'16px', xs:'10px'}}}>
                                    6:00 PM
                                </Typography> 
                            </Grid>
                        </Grid>
                        </Grid>

                        <Grid>
                            <Divider sx={{direction:'row', mx:'3%', orientation: 'horizontal'}} />  
                        </Grid> 
                        <Grid sx={{mt:3, ml: 3, mr: 3, maxWidth: {xs: '90%'}}}>
                            <Typography sx={{justifyContent: 'center'}}>
                            Lorem Epsum FFolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                             Lorem Epsum FFolor sit amet,
                            </Typography> 
                        </Grid> 

                </Grid>                                
                </Box>
                {/* <Box> hello</Box> */}
            </Box>
        </Box>
      </Modal>
    </div>
    )
}
export default AnnouncementsModalButton;