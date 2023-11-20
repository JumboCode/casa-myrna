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
import usePagination from '@mui/material/usePagination';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';

// Custom components and images
import profileList from "./profileList";
import Image from "next/image";
import Add from "app/images/9.png";
import ClearIcon from '@mui/icons-material/Clear';

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
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {people.map((person, index) => (
        <li key={index}>
          {/* {person.firstName} {person.lastName} - {person.role} */}
          <br /> {/* Add a line break between the two lines */}
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


const BoxSx = () => {
  // Items Per Page (Pagination)
  const itemsPerPage = 8;
  
  // Move setActivePage to the outer scope
  const [activePage, setActivePage] = React.useState(1);

  const usePagination = (people, page = 1, perPage = 5) => {
    const totalPages = Math.ceil(people.length / perPage);
    const offset = perPage * (page - 1);
    const paginatedItems = people.slice(offset, perPage * page);

    return {
      nextPage: () => setActivePage(p => p < totalPages ? p + 1 : p),
      previousPage: () => setActivePage(p => p > 1 ? p - 1 : p),
      totalPages,
      totalItems: people.length,
      items: paginatedItems,
    };
  };

  const { nextPage, previousPage, totalPages, totalItems, items } = usePagination(peopleArray, activePage, itemsPerPage);


  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '90vh',
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
        borderRadius: '5%',
        backgroundColor: '#f6f6f6',
        fontFamily: 'default',
        margin: '2%',
        marginLeft: '5%',
        marginRight: '5%'
      }}
    >
      <Stack spacing={10}>
        {/* Header content */}
        <Stack spacing={2}>
          <Grid container spacing={3} columns={20} columnSpacing={{xs: 20, sm:80, md:5, lg:5}} margin={10} paddingTop='5%'>
                {/* Left side of header */}
                <Grid item xs={14} paddingBottom='5%'>
                  {/* Page Title */}
                  <Typography variant="h4" sx={{fontWeight: 'bold', paddingBottom:'10%'}}>
                      Manage Profiles
                  </Typography>

                  {/* Search Bar */}
                  <Grid container spacing={3} columns={4}>
                    {/* Actual Search Bar */}
                    <Grid item xs={3}>
                      <InputBase 
                        fullWidth
                        variant="outlined"
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
                    {/* Search Button */}
                    <Grid item xs={1}>
                      <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}} variant="contained">search</Button>
                    </Grid>
                  </Grid>

                  {/* Applied filters */}
                  <Grid container spacing={2} item xs={12} paddingTop='2%' alignItems="center">
                    <Grid item xs={2}>
                      applied filters:
                    </Grid>
                    <Grid item xs={10}>
                      <TextField
                        defaultValue="    All"
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <ClearIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          width: '70%',
                        }}
                        variant="standard"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right side of header */}
                <Grid item xs={6}>
                  {/* Add new employee */}
                  <Grid container paddingBottom='23%'>
                    <Button fullWidth variant="outlined" sx={{ padding: '3%', borderRadius: '25px', borderColor: "#57228F", backgroundColor: '#FFFFFF', color: "#000000", '&:hover': {borderColor:"#57228F"}, textTransform: 'none', display: 'flex', alignItems: 'center' }}>
                      <div style={{ flexGrow: 1 }}>Add New Employee</div>
                      <Image src={Add} alt="Error" width={30} height={30} />
                    </Button>
                  </Grid>

                  {/* Select filters */}
                  <Grid container spacing={2} columns={3}>
                    <Grid item xs={2}>
                      <Select
                        fullWidth
                        value="" // Set the initial value to an empty string
                        displayEmpty // Display the selected value even when it's empty
                        sx={{ backgroundColor: '#FFFFFF', borderRadius: '10px', height: '38px'}}
                      >
                        <MenuItem value="" disabled>
                          Select filters
                        </MenuItem>
                        {/* Add more MenuItem components with filter options here */}
                      </Select>
                    </Grid>
                    {/* Filter button */}
                    <Grid item xs={1}>
                      <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor:"#89B839"}, textTransform: 'none'}}variant="contained">filter</Button>
                    </Grid>
                  </Grid>
              </Grid>
          </Grid>

          {/* Profile List */}
          <NameList people={items} itemsPerPage={itemsPerPage} />
        </Stack>

        {/* Pagination */}
        <Stack spacing={2} alignItems="center" paddingBottom='5%'>
          <Pagination color="secondary" count={totalPages} page={activePage} onChange={(event, value) => setActivePage(value)} />
        </Stack>
      </Stack>
  </Box>);
}

export default BoxSx;
