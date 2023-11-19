
"use client"
import { FC, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import SideNav from "@/app/components/sidebar"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const color = "#f6f6f6"; 



// import * as React from 'react';
// import Box from '@mui/material/Box';

// export default function BreakpointsAsObject() {
//   return (
//     <div>
//       <Box
//         sx={{
//           width: {
//             xs: 100, // theme.breakpoints.up('xs')
//             sm: 200, // theme.breakpoints.up('sm')
//             md: 300, // theme.breakpoints.up('md')
//             lg: 400, // theme.breakpoints.up('lg')
//             xl: 500, // theme.breakpoints.up('xl')
//           },
//         }}
//       >
//         This box has a responsive width.
//       </Box>
//     </div>
//   );
// }

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  bgcolor: "#f6f6f6",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '50px',
 
};

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <Button onClick={handleOpen}>View Announcement</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Box sx={{width: '50px', height: '50px', position: 'absolute', right: '5%'}}>
            <button
              onClick={() => {
              handleClose();
               }}
           ><CloseOutlinedIcon />
           </button>
            </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            This is the Announcements Title
          </Typography>
          <Box
            sx={{
                display: 'flex',
                minHeight: "350px",
                borderRadius: '20px', //makes rounded corners
                backgroundColor: '#ffffff', //color is variable established above! (grey!)
                fontFamily: 'default',
                margin: '2%',
                
            }}>
                <Stack direction="row" spacing={5}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 50, height: 50, ml: 5, mt: 3}} />

                    <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                    Sender Name
                    </Typography>   
                <Grid justifyContent= 'flex-end'></Grid>
                    <Typography id="modal-modal-description" sx={{ mt: 2}} >
                        12 November 2023
                    </Typography>
                </Stack>                
            </Box>
        </Box>
      </Modal>
        </div>
    )
}