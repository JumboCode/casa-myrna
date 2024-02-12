"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import EditEmployeeModal from './EditEmployeeModal'



const ProfileList = ({ firstName, lastName, role, imageUrl, email, id }: { firstName: string; lastName: string; role: string; imageUrl: string; email: string; id: string; }) => {
  const truncate = (input: string | undefined, num: number): string => {
    return input ? (input.length > num ? `${input.substring(0, num)}...` : input) : '';
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        minWidth: '93vh',
        justifyContent: 'flex-start',
      }}
    >
      <Stack direction="row" spacing={20} justifyContent={'space-around'} paddingLeft='2%' paddingRight='15%%' >
        <Stack direction="row" spacing={3} alignItems={'center'} flexGrow={1}>
          <Avatar alt="Remy Sharp" src={imageUrl} sx={{ width: 25, height: 25 }}/>
            <Typography variant="body2" align = "left" sx={{ width: 175, height: 25}}>
              {truncate(firstName, 20)}
            </Typography>
          <Typography variant="body2" align = "left" sx={{ width: 175, height: 25}}>
          {truncate(lastName, 20)}
            </Typography>
          <Typography variant="body2" align = "left" sx={{ width: 175, height: 25}}>
          {truncate(role, 20)}
            </Typography>
        </Stack>
        <Stack direction="row" spacing={0} alignItems={'center'}>
          {/* Edit Employee modal here!! */}
          {/* <Button color="secondary"> edit </Button> */}
          
          <EditEmployeeModal emailAddress={email} id={id}/>
          <IconButton color="secondary" aria-label="add and create">
            <CreateIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>






  );
};

export default ProfileList;
