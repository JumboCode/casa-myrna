import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AbcIcon from '@mui/icons-material/Abc';


const SideNav = (props) => {
  return(
  <Stack direction="row" spacing={2}>
      <div className = "sidenav" > 
         <MenuList>
          <MenuItem component = 'a' href = 'calendar'> 
            <IconButton color = "inherit" href = "calendar">
              <AbcIcon />
            </IconButton>
            Calendar 
          </MenuItem>
          <MenuItem component = 'a' href = 'announcements'> Announcements </MenuItem>
          <MenuItem component = 'a' href = 'groupchat'> Groupchat </MenuItem>
          <MenuItem component = 'a' href = 'profile'> Profile </MenuItem>
        </MenuList>
      </div>
  </Stack>
  ); 
};

export default SideNav;


// export default function sidebar() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   // const handleToggle = () => {
//   //   setOpen((prevOpen) => !prevOpen);
//   // };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   // function handleListKeyDown(event) {
//   //   if (event.key === 'Tab') {
//   //     event.preventDefault();
//   //     setOpen(false);
//   //   } else if (event.key === 'Escape') {
//   //     setOpen(false);
//   //   }
//   // }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <Stack direction="row" spacing={2}>
//       <Paper>
//       <MenuList>
//           <MenuItem>Calendar</MenuItem>
//           <MenuItem>Announcements</MenuItem>
//           <MenuItem>Groupchat</MenuItem>
//           <MenuItem>Profile</MenuItem>
//         </MenuList>
//       </Paper>
//     </Stack>
//   );
// }
