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
    userID: number, 
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
}

type BackupShift = {}

export type { PrimaryShift, Event } 