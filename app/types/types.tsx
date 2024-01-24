/*****************
 *  contains the shift type that is accessed from the backend 
 ****************/ 

enum Status {
    PENDING,
    ACCEPTED,
    CANCELLED
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

export type { PrimaryShift } 