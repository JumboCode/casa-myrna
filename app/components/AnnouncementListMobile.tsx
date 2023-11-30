"use client"
import * as React from 'react';

// Material-UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';


// Custom components and images
import profileList from "./ProfileList"
import Image from "next/image";
import Add from "../images/9.png"
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from 'react';
import theme from '../theme';

interface profileData {
  firstName: string;
  lastName: string;
  role: string;
  image: string;
}

interface NameListProps {
  people: profileData[];
  itemsPerPage: number;
}

const NameList: React.FC<NameListProps> = ({ people }) => (
  <div>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0}}>
      {people.map((person, index) => (
        <li key={index} style={{fontFamily: theme.typography.body2.fontFamily }}>
          <br/> 
          {profileList({
            firstName: person.firstName,
            lastName: person.lastName,
            role: person.role,
            imageUrl: person.image,
          })}
        </li>
      ))}
    </ul>
  </div>
);
      
// List of Employees
const peopleArray: profileData[] = [
  { firstName: 'Maddie', lastName: 'Rogers', role: 'Volunteer', image: 'nothing.jpg' },
  { firstName: 'Naomi', lastName: 'Gillis', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Jiyoon', lastName: 'Choi', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Pamela ', lastName: 'Melgar', role: 'Volunteer', image: 'jane.jpg' },
  { firstName: 'Bill', lastName: 'Soronzonbold', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Asli', lastName: 'Kocak', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Carly', lastName: 'Seigel', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'David', lastName: 'Chen', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Elizabeth', lastName: 'Foster', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Sean', lastName: 'Reilly', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Yara', lastName: 'Hamdan', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' },
  { firstName: 'Eliana', lastName: 'Longoria', role: 'Designer', image: 'jane.jpg' }
  // Add more people as needed
];


const BoxSx: FC = () => {
  // Items Per Page (Pagination)
  const itemsPerPage = 8;

  // Move setActivePage to the outer scope
  const [activePage, setActivePage] = React.useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const usePagination = (people: profileData[], page = 1, perPage = 5) => {
    const totalPages = Math.ceil(people.length / perPage);
    const offset = perPage * (page - 1);
    const paginatedItems = people.slice(offset, perPage * page);

    return {
      nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
      previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
      totalPages,
      totalItems: people.length,
      items: paginatedItems,
    };
  };

  const { nextPage, previousPage, totalPages, totalItems, items } = usePagination(
    peopleArray,
    activePage,
    itemsPerPage
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row', // Adjust to column layout for mobile
        minHeight: '87vh',
        borderRadius: '5vh',
        backgroundColor: '#f6f6f6',
        padding: isMobile ? '20px' : '40px', // Add padding for better spacing
      }}
    >
      {/* Header content */}
      <Stack spacing={2}>

        {/* Search Bar and Select filters */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputBase
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                padding: '3px',
                paddingLeft: '20px',
                paddingRight: '10px',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              value=""
              displayEmpty
              sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '38px' }}
            >
              <MenuItem value="" disabled>
                New to old
              </MenuItem>
              {/* Add more MenuItem components with filter options here */}
            </Select>
          </Grid>
        </Grid>
      </Stack>

      {/* Profile List */}
      {/* <NameList people={items} itemsPerPage={itemsPerPage} /> */}

      {/* Pagination */}
      <Stack spacing={2} alignItems="center" marginTop="auto">
        <Pagination
          color="secondary"
          count={totalPages}
          page={activePage}
          onChange={(event, value) => setActivePage(value)}
        />
      </Stack>
    </Box>
  );
};

export default BoxSx;