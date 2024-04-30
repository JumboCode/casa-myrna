/* 
 *      Handy collection of functions for the app 
 *      
 *      CURRENTLY: 
 * 
 */

import { CalendarInfo, OnCallShift } from "../types/types"

export function createShifts(shifts: any[], type: string) {
    if (type === "On-Call-Shift") {
        /* on call shfits */
        return shifts?.map((onCallShift: OnCallShift) => {
            let background_color = "green";

            if (onCallShift.status.toString() === "CANCELLED") {
                background_color = "gray";
            } else if (onCallShift.status.toString() === "PENDING") {
                background_color = "orange";
            }

            return {
                /*******************************************************
                 *        associated fields for OnCallShift            *
                 ******************************************************/
                onCallShiftID: onCallShift.onCallShiftID,
                userID: onCallShift.userID,
                primaryShifts: onCallShift.primaryShifts,
                date: new Date(onCallShift.date),
                from: new Date(onCallShift.from),
                to: new Date(onCallShift.to),
                firstName: onCallShift.firstName,
                lastName: onCallShift.lastName,
                status: onCallShift.status,
                message: onCallShift.message,
                phoneLine: onCallShift.phoneLine,
                created_at: new Date(onCallShift.created_at),

                /*******************************************************
                 *            associated fields for Event              *
                 ******************************************************/
                start: new Date(onCallShift.from),
                end: new Date(onCallShift.to),
                title: `${onCallShift.firstName} ${onCallShift.lastName}`,
                style: {
                    opacity: 0.5,
                    backgroundColor: background_color,
                },
            };
        })

    } else {
        /* regular shifts logic */
        return shifts?.map((shift: CalendarInfo) => {
            let background_color = "green";

            if (shift.status.toString() === "CANCELLED") {
                background_color = "gray";
            } else if (shift.status.toString() === "PENDING") {
                background_color = "orange";
            }
            return {
                /*******************************************************
                 *        associated fields for PrimaryShiftInfo       *
                 ******************************************************/
                primaryShiftID: shift.primaryShiftID,
                userID: shift.userID,
                onCallShiftID: shift.onCallShiftID,
                from: new Date(shift.from),
                to: new Date(shift.to),
                firstName: shift.firstName,
                lastName: shift.lastName,
                date: new Date(shift.from).setHours(0, 0, 0, 0),
                status: shift.status,
                phoneLine: shift.phoneLine,
                message: shift.message,
                created_at: new Date(),

                /*******************************************************
                 *            associated fields for Event              *
                 ******************************************************/
                start: new Date(shift.from),
                end: new Date(shift.to),
                title: shift.firstName + " " + shift.lastName,
                style: {
                    opacity: 0.5,
                    backgroundColor: background_color,
                },
            }
        });
    }
}

/* 
 * splits shifts that occur over two days into two different events so that
 * they're rendered correctly on the calendar
 */
export function splitOvernightShifts(shiftsArray: any): any {

    if (!shiftsArray) return []

    let updatedShifts = []

    for (let shift of shiftsArray) {
        const isOvernight = shift.start.getDate() !== shift.end.getDate()
        if (isOvernight) {
            let shift1 = { ...shift, end: new Date(shift.start) };
            let shift2 = { ...shift, start: new Date(shift.end) };

            shift1.end.setHours(23, 59, 59, 999)
            shift2.start.setHours(0, 0, 0, 0)

            updatedShifts.push(shift1)
            updatedShifts.push(shift2)
        } else {
            updatedShifts.push(shift)
        }
    }
    return updatedShifts

}