'use client'

import { ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import CalendarModalButton from "../../components/CalendarModalButton";
import Sidebar from "../../components/Sidebar";
import "../../globals.css";
import theme from '../../theme';

const Calendar: React.FC = () => {
  const [shiftArray, setShiftArray] = useState<any>(null);
  useEffect(() => { setShiftArray(null); }, [])

  const fetchShiftData = async (startTime: Date, endTime: Date) => {
    try {
      const response = await fetch('api/shifts');
      if (!response.ok) {
        throw new Error('Failed to fetch shift data');
      }
      const data = await response.json();
      setShiftArray(data);

    } catch (error) {
      console.error('Error fetching shift data:', error);
    }
  };

  return (<ThemeProvider theme={theme}><Sidebar currentPageComponent={CalendarModalButton} />
    <div className="post-btn">
      <button className="post-btn-retrieve" onClick={() => fetchShiftData(new Date("2019-01-01"), new Date("2024-01-01"))}>retrieve info</button>

      {(!shiftArray) ? (
        <></>
      ) : (
        <div className="">
          results here
        </div>
      )}
    </div>
  </ThemeProvider>)
};

export default Calendar;
