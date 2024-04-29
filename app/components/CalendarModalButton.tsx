// @ts-nocheck
"use client";
// Import necessary dependencies and components
import { FC, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid, MenuItem, Select } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { format, parse } from "date-fns";
import theme from "../theme";
// Add employee modal functionality imports
// import { POST } from '../api/shifts/route';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormatListNumberedRtlSharp } from "@mui/icons-material";
import { request } from "http";
import { profileData } from "./types";
import ComboBox from "./ComboBox";

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
    // border: '2px solid #000',
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

const CalendarModalButton: FC<any> = ({ callback }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [formData, setFormData] = useState(initialFormData);

    // For ComboBox Emplyee Selection
    // const [selectedEmployee, setSelectedEmployee] = useState<profileData | null>(null);

    // const handleSelectEmployee = (selectedValue: profileData | null) => {
    //   setSelectedEmployee(selectedValue);
    // };

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

    // Handle form submission (IN PROGRESS)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const createdAt = new Date().toISOString();

        // format start and end date/times
        //     startDate.setHours(formData.startTime);
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

        console.log(startDate.toISOString());
        console.log(endDate.toISOString());

        let firstName, lastName, id;
        if (formData.assignedEmployee) {
            firstName = formData.assignedEmployee.firstName
            console.log("FirstName: ", firstName)
            lastName = formData.assignedEmployee.lastName
            console.log("LastName: ", lastName)
            id = formData.assignedEmployee.id
            console.log("ID: ", id)
        } else {
            firstName = '', 
            lastName = '',
            id = '';
        }
        
        console.log("First Name: ", firstName);
        console.log("Last Name: ", lastName);

        // TODO: remove 'any' type
        let requestData: any = {
            // ...formData,
            firstName: firstName,
            lastName: lastName,
            phoneLine: parseInt(formData.phoneLine),
            date: startDate.toString(), // not necessary anymore
            from: startDate.toISOString(),
            to: endDate.toISOString(),
            created_at: createdAt,
            userID: id,
            message: "hello",
            status: "ACCEPTED",
        };

        if (formData.shiftType === "regular") {
            requestData.onCallShiftID = 6;
        }

        // See console to see the form data being sent to POST
        console.log("Request Payload:", requestData);
        console.log("TESTING PRINT");

        try {
            // value={"regular"}>Regular</MenuItem>
            // <MenuItem value={"onCall"}
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

            console.log("after retrieving response");
            if (!response.ok) {
                throw new Error(`Failed to assign shift. Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Shift assigned successfully:", result);

            // Reset form data after successful submission
            setFormData(initialFormData);
            callback(Date.now());
            handleClose();
        } catch (error) {
            console.error("Error assigning shift:", error);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                // color="#FFFFFF"
                onClick={handleOpen}
                style={{
                    marginBottom: "10px",
                    marginLeft: "10px",
                    textTransform: "none",
                    minWidth: 160,
                    fontFamily: "Montserrat",
                    fontSize: "16",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                }}
            >
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
                                columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }}
                                justify-content="flex-start"
                                alignItems="flex-start"
                                columns={12}
                                margin={{ xs: 1, sm: 2, md: 3, lg: 4 }}
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
                                        justifyContent={"flex-end"}
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{ marginTop: "20px", marginLeft: "-130px" }}
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

                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent={"flex-end"}
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        sx={{ marginTop: "20px", marginLeft: "-130px" }}
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{ marginTop: "15px", marginRight: "10px" }}
                                        >
                                            Start Time: <span style={{ color: "red" }}>*</span>
                                        </Typography>

                                        {/* Start Date */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Start Date"
                                                onChange={(newValue) =>
                                                    setStartDate(new Date(newValue))
                                                }
                                                sx={{ marginRight: "10px", width: "153px" }}
                                            />
                                        </LocalizationProvider>

                                        <Select
                                            name="startHour"
                                            value={formData.startHour}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={"11"}>11</MenuItem>
                                            <MenuItem value={"12"}>12</MenuItem>
                                        </Select>

                                        <Select
                                            name="startMin"
                                            value={formData.startMin}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"15"}>15</MenuItem>
                                            <MenuItem value={"30"}>30</MenuItem>
                                            <MenuItem value={"45"}>45</MenuItem>
                                        </Select>
                                        <Select
                                            name="startAm"
                                            value={formData.startAm}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                            }}
                                        >
                                            <MenuItem value={"am"}>am</MenuItem>
                                            <MenuItem value={"pm"}>pm</MenuItem>
                                        </Select>
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
                                            sx={{ marginTop: "15px", marginRight: "10px" }}
                                        >
                                            End Time : <span style={{ color: "red" }}>*</span>
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div component={["DatePicker"]}>
                                                <DatePicker
                                                    label="End Date"
                                                    onChange={(newValue) =>
                                                        setEndDate(new Date(newValue))
                                                    }
                                                    sx={{ marginRight: "10px", width: "153px" }}
                                                />
                                            </div>
                                        </LocalizationProvider>

                                        <Select
                                            name="endHour"
                                            value={formData.endHour}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            <MenuItem value={"01"}>01</MenuItem>
                                            <MenuItem value={"02"}>02</MenuItem>
                                            <MenuItem value={"03"}>03</MenuItem>
                                            <MenuItem value={"04"}>04</MenuItem>
                                            <MenuItem value={"05"}>05</MenuItem>
                                            <MenuItem value={"06"}>06</MenuItem>
                                            <MenuItem value={"07"}>07</MenuItem>
                                            <MenuItem value={"08"}>08</MenuItem>
                                            <MenuItem value={"09"}>09</MenuItem>
                                            <MenuItem value={"10"}>10</MenuItem>
                                            <MenuItem value={"11"}>11</MenuItem>
                                            <MenuItem value={"12"}>12</MenuItem>
                                        </Select>
                                        <Select
                                            name="endMin"
                                            value={formData.endMin}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                                marginRight: "5px",
                                            }}
                                        >
                                            <MenuItem value={"00"}>00</MenuItem>
                                            <MenuItem value={"15"}>15</MenuItem>
                                            <MenuItem value={"30"}>30</MenuItem>
                                            <MenuItem value={"45"}>45</MenuItem>
                                        </Select>
                                        <Select
                                            name="endAm"
                                            value={formData.endAm}
                                            onChange={handleInputChange}
                                            required
                                            sx={{
                                                borderRadius: "10px",
                                                width: "70px",
                                                backgroundColor: "#FFFFFF",
                                                outlineColor: "#000000",
                                                height: "56px",
                                            }}
                                        >
                                            <MenuItem value={"am"}>am</MenuItem>
                                            <MenuItem value={"pm"}>pm</MenuItem>
                                        </Select>
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
                                            sx={{ marginTop: "15px", marginRight: "20px" }}
                                        >
                                            Assigned Employee :
                                        </Typography>
                                        <ComboBox onSelect={handleSelectEmployee} />
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
                                            <MenuItem value={"0"}>N/A</MenuItem>
                                            <MenuItem value={"1"}>1</MenuItem>
                                            <MenuItem value={"2"}>2</MenuItem>
                                            <MenuItem value={"3"}>3</MenuItem>
                                            <MenuItem value={"4"}>4</MenuItem>
                                            <MenuItem value={"5"}>5</MenuItem>
                                            <MenuItem value={"6"}>6</MenuItem>
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
                                        <Grid item xs={3}>
                                            <Button
                                                type="submit"
                                                sx={{
                                                    paddingLeft: "10%",
                                                    textIndent: "5.5px",
                                                    paddingRight: "10%",
                                                    borderRadius: "10px",
                                                    backgroundColor: theme.palette.primary.main,
                                                    "&:hover": { backgroundColor: "#2E0057" },
                                                    textTransform: "none",
                                                }}
                                                variant="contained"
                                            >
                                                Cancel Shift
                                            </Button>
                                        </Grid>
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
        </>
    );
};

export default CalendarModalButton;
