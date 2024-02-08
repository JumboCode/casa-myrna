'use client'

import { ThemeProvider } from '@mui/material/styles';
import Cal from "../../components/Calendar";
import React, { useState, useEffect } from "react";
import CalendarModalButton from "../../components/CalendarModalButton";
import Sidebar from "../../components/sidebar";
import "../../globals.css";
import theme from '../../theme';
import { PrimaryShift } from '../../types/types'; 


const Calendar: React.FC = () => {
  const [shiftArray, setShiftArray] = useState<PrimaryShift [] | null>(null);
  useEffect(() => { setShiftArray(null); }, [])

  const fetchShiftData = async (startTime: Date, endTime: Date) => {
    try {
      const response = await fetch('api/shifts');
      if (!response.ok) {
        throw new Error('Failed to fetch shift data');
      }
      const data = await response.json();
      console.log(data)
      console.log(data.length)
      console.log(typeof data)
      setShiftArray(data);

    } catch (error) {
      console.error('Error fetching shift data:', error);
    }
  };

  const handler = async () => {
    // Dummy function to temporaily hold code that finds beginning  & end of 
    // day, week, month 
    
    const today = new Date()
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0, 11, 59, 59)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0))
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999))

    // should we break this up for readability or keep everything together? 
    // const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay(), 0, 0, 0)
    // const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - today.getDay() + 6), 11, 59, 59); 

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    firstDayOfWeek.setHours(0, 0, 0);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23, 59, 59);

    console.log(firstDayOfWeek); 
    console.log(lastDayOfWeek); 
    fetchShiftData(new Date("1969-01-01"), new Date("2024-01-01")); 
  }
  

  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={Cal} />
    <div className="post-btn">
      <button className="post-btn-retrieve" onClick={handler}>retrieve info</button>
      {(!shiftArray) ? (
        <></>
      ) : (
        <div className="">
          results here
          {shiftArray.map((shift: PrimaryShift, index: number) => <li key={shift.primaryShiftID}>{shift.status}</li>)}
        </div>
      )}
    </div>
  </ThemeProvider>)
};

export default Calendar;
