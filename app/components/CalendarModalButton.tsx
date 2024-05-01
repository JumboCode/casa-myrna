// @ts-nocheck
"use client";
// Import necessary dependencies and components
import { FC, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ComboBox from "./ComboBox";
import theme from "../theme";
import { timeList, hourList, periodList, phoneLines } from "../lib/directory"

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
        lg: 600,
        xs: "80%",
    },
    height: {
        lg: 500,
        xs: "70%",
    },
    bgcolor: "#ffffff",
    boxShadow: 24,
    p: 4,
    borderRadius: "35px",

    typography: {
        h1: {
            fontFamily: "Montserrat",
            fontSize: "32",
            fontWeight: "bold",
        },
        h4: {
            fontFamily: "Montserrat",
            fontSize: "16",
            fontWeight: "bold",
        },
        body1: {
            fontFamily: "Montserrat",
            fontSize: "16",
            fontWeight: "regular",
        },
        body2: {
            fontFamily: "Montserrat",
            fontSize: "16",
            fontWeight: "regular",
        },
    },
};

const initialFormData = {
    shiftType: "",
    startDate: "",
    endDate: "",
    startTime: "",
    startHour: "",
    startMin: "",
    startAm: "",
    endTime: "",
    endHour: "",
    endMins: "",
    endAm: "",
    assignedEmployee: "",
    phoneLine: "",
};

const timeStyle = {
    borderRadius: "10px",
    width: "70px",
    backgroundColor: "#FFFFFF",
    outlineColor: "#000000",
    height: "56px",
    marginRight: "5px",
}


const CalendarModalButton: FC<any> = ({ callback }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formData, setFormData] = useState(initialFormData);


    const timeComponentInfo = [
        {
            label: "Start Time: ",
            datePickerLabel: "Start Date",
            timeName: "",
            content: timeList,
            selectInfo: [
                {
                    name: "startHour",
                    value: formData.startHour,
                    content: timeList
                },
                {
                    name: "startMin",
                    value: formData.startMin,
                    content: hourList
                },
                {
                    name: "startAm",
                    value: formData.startAm,
                    content: periodList
                }
            ]
        },
        {
            label: "End Time: ",
            datePickerLabel: "End Date",
            timeName: "",
            content: timeList,
            selectInfo: [
                {
                    name: "endHour",
                    value: formData.endHour,
                    content: timeList
                },
                {
                    name: "endMin",
                    value: formData.endMin,
                    content: hourList
                },
                {
                    name: "endAm",
                    value: formData.endAm,
                    content: periodList
                }
            ]
        },
    ]

    const handleSelectEmployee = (selectedValue: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            assignedEmployee: selectedValue,
        }));
    };

    // Handle form input change
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdAt = new Date().toISOString();

        if (formData.startAm === "pm") {
            if (formData.startHour !== 12) {
                formData.startHour = (parseInt(formData.startHour) + 12) % 24;
            }
        }

        // Convert end hour if PM
        if (formData.endAm === "pm") {
            if (formData.endHour !== 12) {
                formData.endHour = (parseInt(formData.endHour) + 12) % 24;
            }
        }
        startDate.setHours(formData.startHour, formData.startMin);
        endDate.setHours(formData.endHour, formData.endMin);

        let firstName, lastName, id;
        if (formData.assignedEmployee) {
            firstName = formData.assignedEmployee.firstName
            lastName = formData.assignedEmployee.lastName
            id = formData.assignedEmployee.id
        } else {
            firstName = '',
                lastName = '',
                id = '';
        }

        let requestData: any = {
            firstName: firstName,
            lastName: lastName,
            phoneLine: parseInt(formData.phoneLine),
            date: startDate.toString(), // not necessary anymore
            from: startDate.toISOString(),
            to: endDate.toISOString(),
            created_at: createdAt,
            userID: id,
            message: `shift was requested at ${startDate.toISOString}`,
            status: firstName === '' && lastName === '' ? 'CANCELLED' : 'ACCEPTED',
        };

        if (formData.shiftType === "regular") {
            requestData.onCallShiftID = 1;
        }

        try {
            let response = null;
            if (formData.shiftType === "regular") {
                response = await fetch("api/shifts", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
            } else {
                response = await fetch("api/on-call-shifts", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });
            }

            if (!response.ok) {
                throw new Error(`Failed to assign shift. Status: ${response.status}`);
            }

            // Reset form data after successful submission
            setFormData(initialFormData);
            callback(Date.now());
            handleClose();
        } catch (error) {
            console.error("Error assigning shift:", error);
        }
    };

    return (
        <div sx={{ position: "relative" }}>
            <Button
                variant="contained"
                onClick={handleOpen}
                className="add-shift-btn"
                style={{ marginBottom: '10px', marginLeft: '10px', textTransform: 'none', minWidth: 180, minHeight: 60, maxHeight: 70, fontFamily: 'Montserrat', fontSize: '16', fontWeight: 'bold', color: 'black', backgroundColor: "white", border: true, borderRadius: "35px", border: '1px solid purple' }}
                display={{ sm: "absolute", top: 80, right: 0 }}
                top={{ sm: 0 }}
                right={{ sm: 0 }}
            >
                <svg style={{ maxHeight: 60 }} viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className="add-shift-svg">
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#0a0a0a"
                        strokeWidth="1.392"></g>
                    <g id="SVGRepo_iconCarrier">
                        <rect width="6" height="6" fill="white"></rect>
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V11H9C8.44772 11 8 11.4477 8 12C8 12.5523 8.44772 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11H13V9ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z"
                            fill="#3c0085"></path>
                    </g>
                </svg>
                Add Shift
            </Button>
            <Modal open={open} onClose={handleClose}>
                {/* Gray Modal Box */}
                <Box sx={style}>
                    {/* Button Box */}
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            position: "absolute",
                            right: "5%",
                            fill: "none",
                        }}
                    >
                        <button
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <CloseOutlinedIcon color="secondary" />
                        </button>
                    </Box>
                    <Box sx={{ paddingLeft: 2, paddingRight: 6 }}>
                        <Typography
                            sx={{
                                fontFamily: "Montserrat",
                                fontSize: { lg: "36px", xs: "22px" },
                            }}
                        >
                            Add Shift
                        </Typography>
                    </Box>
                    <Box>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                spacing={5}
                                columns={12}
                                sx={{
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    margin: { xs: 1, sm: 2, md: 3, lg: 4 },
                                    columnSpacing: { xs: 10, sm: 80, md: 5, lg: 5 }
                                }}
                            >
                                <Grid
                                    container
                                    spacing={4}
                                    direction="column"
                                    alignItems="flex-start"
                                    paddingBottom="13%"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{ marginTop: "20px", marginLeft: "-130px", justifyContent: "flex-end" }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{ marginTop: "15px", marginRight: "10px" }}
                                        >
                                            Shift Type: <span style={{ color: "red" }}>*</span>
                                        </Typography>

                                        <Select
                                            name="shiftType"
                                            value={formData.shiftType}
                                            onChange={handleInputChange}
                                            placeholder="Shift Type"
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "57.75%",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                            }}
                                        >
                                            <MenuItem value={"regular"}>Regular</MenuItem>
                                            <MenuItem value={"onCall"}>On Call</MenuItem>
                                        </Select>
                                    </Grid>

                                    {timeComponentInfo.map((timeInfo, index) => (
                                        <Grid
                                            container
                                            direction="row"
                                            key={index}
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            sx={{ marginTop: "20px", marginLeft: "-130px", justifyContent: "flex-end" }}
                                        >
                                            <Typography
                                                sx={{ marginTop: "15px", marginRight: "10px" }}
                                            >
                                                {timeInfo.label} <span style={{ color: "red" }}>*</span>
                                            </Typography>

                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    label={timeInfo.datePickerLabel}
                                                    onChange={(newValue) => {
                                                        if (timeInfo.datePickerLabel === "End Date") {
                                                            setEndDate(new Date(newValue));
                                                        } else {
                                                            setStartDate(new Date(newValue))
                                                        }
                                                    }}
                                                    sx={{ marginRight: "10px", width: "153px" }}
                                                />
                                            </LocalizationProvider>

                                            {timeInfo.selectInfo.map((select, index) => (
                                                <Select
                                                    key={index}
                                                    name={select.name}
                                                    value={select.value}
                                                    onChange={handleInputChange}
                                                    required
                                                    sx={timeStyle}
                                                >
                                                    {select.content.map((content, index) => (
                                                        <MenuItem key={index} value={content}>{content}</MenuItem>
                                                    ))}
                                                </Select>
                                            ))}
                                        </Grid>
                                    ))}
                                    <Grid
                                        container
                                        direction="row"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{
                                            marginTop: "18px",
                                            marginLeft: "-130px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{ marginTop: "15px", marginRight: "20px" }}
                                        >
                                            Assigned Employee :
                                        </Typography>
                                        <ComboBox onSelect={handleSelectEmployee} boxWidth={300} label={"Assigned Employee"} />
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{
                                            marginTop: "18px",
                                            marginLeft: "-130px",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{ marginTop: "15px", marginRight: "182px" }}
                                        >
                                            Phone Line : <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <Select
                                            name="phoneLine"
                                            value={formData.phoneLine}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "195px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                            }}
                                        >
                                            {phoneLines.map((line, index) => (
                                                <MenuItem  key={index} value={line}>{line}</MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        container
                                        spacing={6}
                                        justifyContent="flex-end"
                                        textAlign="center"
                                        sx={{
                                            marginTop: "1px",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {/* ASSIGN SHIFT CONFIRMATION BUTTON (where we post shift) */}
                                        <Grid item xs={3}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    paddingLeft: "10%",
                                                    textIndent: "5.5px",
                                                    paddingRight: "10%",
                                                    borderRadius: "10px",
                                                    backgroundColor: theme.palette.secondary.main,
                                                    "&:hover": { backgroundColor: "#89B839" },
                                                    textTransform: "none",
                                                }}
                                            >
                                                Assign Shift
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CalendarModalButton;
