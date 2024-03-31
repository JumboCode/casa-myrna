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
import AddEmployeeModal from './AddEmployeeModal';
import { profileData } from './types';

// Custom components and images
import profileList from "./profileList"



import Image from "next/image";
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useEffect, useState } from 'react';
import theme from '../theme';

interface NameListProps {
  people: profileData[];
  itemsPerPage: number;
  // updateProfiles: Function;
}

// const NameList: React.FC<NameListProps> = ({ people }) => (
//   <div>
//     <ul style={{ listStyle: 'none', padding: 0, margin: 0}}>
//       {people.map((person, index) => (
//         <li key={index} style={{fontFamily: theme.typography.body2.fontFamily }}>
//           <br/> 
//           {profileList({
//             firstName: person.firstName,
//             lastName: person.lastName,
//             role: person.publicMetadata["role"],
//             imageUrl: person.imageUrl,
//             email: person.emailAddresses[0].emailAddress,
//             id: person.id
//           })}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

const BoxSx: FC = () => {
  // Items Per Page (Pagination)
  const itemsPerPage = 8;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null> ("All");
  // Move setActivePage to the outer scope
  const [activePage, setActivePage] = React.useState(1); 
  const [peopleArray, setPeopleArray] = useState<profileData[]>([]);

  const NameList: React.FC<NameListProps> = ({ people }) => (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0}}>
        {people.map((person, index) => (
          <li key={index} style={{fontFamily: theme.typography.body2.fontFamily }}>
            <br/> 
            {profileList({
              firstName: person.firstName,
              lastName: person.lastName,
              role: person.publicMetadata["role"],
              imageUrl: person.imageUrl,
              email: person.emailAddresses[0].emailAddress,
              id: person.id, 
              profiles: peopleArray,
              updateProfiles: setPeopleArray,

            })}
          </li>
        ))}
      </ul>
    </div>
  );
  
  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const response = await fetch('api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch people data');
        }
        
        const data = await response.json();
        setPeopleArray(data);
        
      } catch (error) {
        console.error('Error fetching people data:', error);
      }
    };

    fetchPeopleData();
  }, []);

  const handleChange = (event: any) => {
    setSelectedFilter(event.target.value)
  };

    const usePagination = (people: profileData[], page = 1, perPage = 5) => {
    const filteredPeople = people.filter((person) =>
      [
        person.firstName,
        person.lastName,
        person.publicMetadata["role"], // Check if 'role' property exists
        person.emailAddresses[0]?.emailAddress,
      ].some((value) =>
      value?.toLowerCase().includes(searchTerm.toLowerCase())
      ) 
      && (selectedFilter === "All" || person.publicMetadata["role"] === selectedFilter)
    );

    const totalPages = Math.ceil(filteredPeople.length / perPage);
    const offset = perPage * (page - 1);
    const paginatedItems = filteredPeople.slice(offset, perPage * page);

    return {
      nextPage: () => setActivePage((p) => (p < totalPages ? p + 1 : p)),
      previousPage: () => setActivePage((p) => (p > 1 ? p - 1 : p)),
      totalPages,
      totalItems: filteredPeople.length,
      items: paginatedItems,
    };
  };


  const { nextPage, previousPage, totalPages, totalItems, items } = usePagination(peopleArray, activePage, itemsPerPage);

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: "87vh",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: '5vh', //makes rounded corners
        backgroundColor: "#f6f6f6", //color is variable established above! (grey!)
      }}
    >
      <Stack spacing={10}>
        {/* Header content */}
        <Stack spacing={2}>
          <Grid container spacing={3} columns={20} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} margin={10} paddingTop='5%'>
                {/* Left side of header */}
                <Grid xs={14}>
                  {/* Page Title */}
                  <Typography variant="h1" sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
                      Manage Profiles
                  </Typography>

                  <Grid container spacing={3} columns={4}>
                    <Grid xs={3}>
                    <InputBase
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '10px',
                      padding: '3px',
                      paddingLeft: '20px',
                      paddingRight: '10px',
                    }}
                  />
                    </Grid>
                    <Grid xs={1}>
                    <Button fullWidth sx={{ borderRadius: '15px', backgroundColor: "#89B839", '&:hover': { backgroundColor: theme.palette.primary.main }, textTransform: 'none' }} variant="contained">search</Button>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right side of header */}
                <Grid xs={6}>
                  {/* Add new employee */}
                  <Grid container>
                     <AddEmployeeModal profiles={peopleArray} onUpdate={setPeopleArray}/> 
                  </Grid>

                  {/* Select filters */}
                  <Grid container spacing={2} columns={3} paddingTop={'23%'}>
                <Grid xs={2}>
                  <Select
                    fullWidth={false}
                    onChange={handleChange}
                    defaultValue="All"
                    displayEmpty
                    sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '38px', minWidth: '150%'}}
                  >
                    <MenuItem value="All"> All </MenuItem>
                    <MenuItem value="Relief Staff"> Relief Staff </MenuItem>
                    <MenuItem value="Management"> Management </MenuItem>
                    <MenuItem value="Full-time Staff"> Full-time Staff </MenuItem>
                    <MenuItem value="Part-time Staff"> Part-time Staff </MenuItem>
                  </Select>
                </Grid>
              </Grid>
                </Grid>

                
          </Grid>


          {/* Profile List */}
          <NameList people={items} itemsPerPage={itemsPerPage}/>
        </Stack>

        {/* Pagination */}
        <Stack spacing={2} alignItems="center" paddingBottom='5%'>
          <Pagination color="secondary" count={totalPages} page={activePage} onChange={(event, value) => setActivePage(value)} />
        </Stack>
      </Stack>
  </Box> );
}

export default BoxSx;