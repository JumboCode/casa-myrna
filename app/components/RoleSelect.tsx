import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import theme from '../theme';



export default function BasicSelect() {
  const [role, setRole] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size = "small">
        <InputLabel id="demo-select-small-label"></InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small-label"
          value={role}
          onChange={handleChange}
          sx={{ borderRadius: '20px',  width: "190px", backgroundColor: "#FFFFFF", outlineColor: "#000000", height: '32px'}}
        >
          <MenuItem value={10}>Coordinator</MenuItem>
          <MenuItem value={20}>Full-time Staff</MenuItem>
          <MenuItem value={30}>Part-time Staff</MenuItem>
          <MenuItem value={40}>Relief Staff</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};