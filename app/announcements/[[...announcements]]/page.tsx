
"use client"
import { FC, useState } from 'react'

import SideNav from "@/app/components/sidebar"

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
 
};


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

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
            <Box sx={{width: '50px', height: '50px', position: 'absolute', right: '5%'}}>
            help
            </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
        </div>
    )
}