import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import profileList from "./profileList"
import { profileData } from './types';
import {useEffect, useState } from 'react';



export default function ComboBox() {

  const [peopleArray, setPeopleArray] = useState<profileData[]>([]);
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


  const options = peopleArray.map(({ firstName, lastName }) => ({
    label: `${firstName} ${lastName}`,
  }));


  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Assigned Employee" />}
    />
  );
}
