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

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import theme from '../theme';

// Custom components and images
import profileList from "./ProfileList"
import Image from "next/image";
import Add from "../images/9.png"
import ClearIcon from '@mui/icons-material/Clear';
import { FC } from 'react';
import AddEmployeeModal  from './AddEmployeeModal'

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
  const [modal, setModal] = React.useState(false);

  // Move setActivePage to the outer scope
  const [activePage, setActivePage] = React.useState(1);

  const usePagination = (people: profileData[], page = 1, perPage = 5) => {
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

  const ModalStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999, // on top of everything else on the page
    width: '400px',
    height: '200px',
    padding: '20px',
    background: '#f6f6f6',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };
  
  // const toggleModal = () => {
  //   setModal(!modal);
  // };

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

                  {/* Search Bar */}
                  <Grid container spacing={3} columns={4}>
                    {/* Actual Search Bar */}
                    <Grid xs={3}>
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
                    {/* Search Button */}
                    <Grid xs={1}>
                      <Button fullWidth sx={{borderRadius:'15px', backgroundColor:"#89B839", '&:hover': {backgroundColor: theme.palette.primary.main}, textTransform: 'none'}} variant="contained">search</Button>
                    </Grid>
                  </Grid>

                  {/* Applied filters */}
                  <Grid container spacing={2} xs={12} paddingTop='2%' alignItems="center">
                    <Grid xs={2}>
                      <Typography variant="body2">applied filters:</Typography>
                    </Grid>
                    <Grid xs={10}>
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
                <Grid xs={6}>
                  {/* Add new employee */}
                  <Grid container>
                     <AddEmployeeModal/> 
                  </Grid>

                  {/* Select filters */}
                  <Grid container spacing={2} columns={3} paddingTop={'23%'}>
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
  </Box>
  )
}


export default BoxSx;


