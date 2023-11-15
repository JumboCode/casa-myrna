import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';

const profileList = ({ firstName, lastName, role, imageUrl }: { firstName: string; lastName: string; role: string; imageUrl: string }) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        width: '1000px',
        height: '40px',
        justifyContent: 'center',
      }}
    >
      <Stack direction="row" spacing={20} justifyContent={'space-around'} paddingLeft='2%' paddingRight='2%' alignItems="stretch">
        <Stack direction="row" spacing={3} alignItems={'center'} flexGrow={1}>
          <Avatar alt="Remy Sharp" src={imageUrl} sx={{ width: 25, height: 25 }} />
          <Typography textAlign="center" sx={{ typography: 'body1', fontSize: 24 }}>
            {firstName}
          </Typography>
        </Stack>
        
        <Typography variant="h4" textAlign="center" sx={{ typography: 'body1', fontSize: 24, flexGrow: 1 }}>
          {lastName}
        </Typography>

        <Typography variant="h4" textAlign="center" sx={{ typography: 'body1', fontSize: 24, flexGrow: 1 }}>
          {role}
        </Typography>

        <Stack direction="row" spacing={0} alignItems={'center'}>
          <Button color="secondary"> edit </Button>
          <IconButton color="secondary" aria-label="add an create">
            <CreateIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default profileList;
