/*****************
 *  contains the shift type that is accessed from the backend 
 ****************/ 

export enum Status {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    CANCELLED = 'CANCELLED',
}

type PrimaryShift = {
    primaryShiftID: number, 
    userID: String, 
    firstName: String,
    lastName: String, 
    onCallShiftID: number,
    date: Date,
    from: Date, 
    to: Date,
    status: Status, 
    message: string
    phoneLine: number, 
    created_at: Date, 
}

type Event = { 
    start: Date, 
    end: Date, 
    title: String, 
    style: {
        opacity: number, 
        backgroundColor: string, 
    }
      phoneLine: number, 
}

type CalendarInfo = Event & PrimaryShift 

type BackupShift = {}

type OnCallShift = {
    onCallShiftID: number, 
    userID: String, 
    primaryShifts : PrimaryShift[] 
    date: Date, 
    from: Date, 
    to: Date, 
    status: Status  
    message: String, 
    phoneLine: number, 
    created_at: Date, 
    firstName: String,
    lastName: String
}

export type { PrimaryShift, Event, CalendarInfo, OnCallShift } 

