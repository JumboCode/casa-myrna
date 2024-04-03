import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import profileList from "./profileList"
import { profileData } from './types';
import {useEffect, useState } from 'react';


interface ComboBoxProps {
  onSelect: (selectedValue: string) => void;
}

export default function ComboBox({ onSelect }: ComboBoxProps) {

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
 
  const handleSelect = (event: React.ChangeEvent<{}>, value: profileData | null) => {
    if (value) {
      const fullName = `${value.firstName} ${value.lastName}`;
      onSelect(fullName);
    } else {
      onSelect('');
    }
  };


  const people = peopleArray.map(({ firstName, lastName }) => ({
    label: `${firstName} ${lastName}`,
    firstName,
    lastName,
  }));

  console.log("people\n " + people);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={people}
      sx={{ width: 300 }}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} label="Assigned Employee" />}
    />
  );
}
