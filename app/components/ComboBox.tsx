/*
 * ComboBox.tsx
 * Written by: Eliana Longoria-Valenzuela and Pamela Melgar
 * 4-4-24
 * Used to create dropdown of first and last names for Select component in Calendar Shifts Modal
 */

// @ts-nocheck
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';

import profileList from "./profileList"
import { profileData } from './types';
import {useEffect, useState } from 'react';


interface ComboBoxProps {
  onSelect: (selectedValue: string) => void;
  boxWidth: number;
  value: string;
  label: string;
}

export default function ComboBox({ onSelect, boxWidth, value, label }: ComboBoxProps) {

  // Fetch the array of profileData from backend
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

  // onChange event to store the selected name of the employee form dropdown list
  const handleSelect = (event: React.ChangeEvent<{}>, value: profileData | null) => {
    if (value) {
      // const fullName = `${value.firstName} ${value.lastName}`;
      // onSelect(fullName);
      onSelect(value); 
    } else {
      onSelect('');
    }
  };


  // parse through the peopleArray and store firstname and last name
  const people = peopleArray.map(({ firstName, lastName, id }) => ({
    label: `${firstName} ${lastName}`,
    firstName,
    lastName,
    id
  }));

  return (
    <Autocomplete
      value={value}
      id="combo-box-demo"
      options={people}
      sx={{ width: boxWidth}}
      onChange={handleSelect}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
