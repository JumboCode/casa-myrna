
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const buttonStyle = {
    fontFamily: "Arial"
};
export default function ButtonUsage() {
  return <Box textAlign='center'>
    <Button variant="contained" color="secondary" style={buttonStyle}> LOGIN </Button>
        </Box>;
 
}
