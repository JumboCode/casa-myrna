/* 
 *      Calendar Page overview 
 * 
 *      Author:  Bill Soronzonbold 
 *      Date:    10/31/2023  
 *      comp(s): Calendar Modal Button and Calendar Modal
 */

"use client"

import { FC, useState } from 'react'
import Button from '@mui/material/Button';
import "@/app/calendar/[[...calendar]]/calendar.css"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

/* Theme required for styling the font for the Typography tags */
declare module "@mui/material/styles" {
    interface Theme {
        status: {
            danger: string;
        },
        fontFamily: [
            "Montserrat"
        ]
    }
}

const CalendarModalButton: FC = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const showModal = () => setOpenModal(true);
    const closeModal = () => setOpenModal(false);

    return (
        <>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    showModal();
                }}
            >
                Open Modal
            </Button>
            <Modal
                open={openModal}
                onClose={closeModal}
                hideBackdrop
            >
                {/* todo: figure out the styling of the fonts */}
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    height: 350,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    borderRadius: '20px',
                    py: 10,
                    px: 15, 
                    "@media all and (max-width: 480px)": {
                        width: 200,
                        height: 600,
                        py: 5,
                        px: 10,
                    }
                }}>
                    <Typography
                        variant="h4"
                        className="little-space"
                        sx={{
                            mb: 6,
                            ml: -5,
                            mt: -6,  
                            "@media all and (max-width: 480px)": {
                                mb: 3,
                                ml: -3, 
                                mt: 0.0000001, 
                            }
                        }}

                    >
                        Shift Details
                    </Typography>

                    {/* blueprint for the little inputs -> will change later */}
                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-large">Start Time: </Typography>
                        <Typography className="text-with-border right">12 Oct Tuesday - 02.00 pm</Typography>
                    </div>

                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-large">End Time: </Typography>
                        <Typography className="text-with-border right">12 Oct Tuesday - 07.00 pm</Typography>
                    </div>

                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-small"> Assigned Employee: </Typography>
                        <Typography className="text-with-border"> Employee Name </Typography>
                    </div>

                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-small"> On-Call Employee: </Typography>
                        <Typography className="text-with-border"> Employee Name </Typography>
                    </div>

                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-small"> Phone Line: </Typography>
                        <Typography className="text-with-border"> Phone # </Typography>
                    </div>

                    <div className="inline-input-representation">
                        <Typography variant="subtitle1" className="left-small"> Status: </Typography>
                        <Typography className="text-with-border green-btn"> Assigned </Typography>
                    </div>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            alert("cancel shift indicated");
                        }}
                        className="center-btn"
                        sx={{
                            display: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            m: "auto",
                        }}
                    >
                        Cancel Shift
                    </Button>

                    <button
                        className="close-btn"
                        onClick={() => {
                            closeModal();
                        }}
                    >
                        <svg fill="#6F479A" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 492 492"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"></path> </g> </g> </g></svg>
                    </button>
                </Box>
            </Modal >
        </>
    )

}

export default CalendarModalButton