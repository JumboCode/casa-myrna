// @ts-nocheck
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import InputLabel from "@mui/material/InputLabel";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Autocomplete from "@mui/material/Autocomplete";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "@mui/material/Button";
import theme from "../theme";

import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  PrimaryShift,
  Status,
  Event,
  CalendarInfo,
  OnCallShift,
} from "../types/types";
import { UserProfile, clerkClient } from "@clerk/nextjs";
import CalendarModalButton from "./CalendarModalButton";

import CloseIcon from "@mui/icons-material/Close";

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
    lg: 300,
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

const localizer = momentLocalizer(moment);
const employeeOptions = [
  "Ana Quieros",
  "Anna Seifield",
  "Anne Brown",
  "Angel Ferrian",
];

const MyCalendar = (props: {
  filters: any;
  fetchShiftsTrigger: any;
  setFetchShiftsTrigger: any;
}) => {
  const { isSignedIn, user, isLoaded } = useUser();

  // TODO: start of modal logic - abstract away into a different component (CalendarModalButton)
  const [shiftInfo, setShiftInfo] = useState<CalendarInfo[] | null>(null);
  const [onCallInfo, setOnCallInfo] = useState<OnCallShift[] | null>(null);
  const [updateInfo, setUpdateInfo] = useState<CalendarInfo | null>(null);

  const [formData, setFormData] = useState<CalendarInfo | null>(null);
  // const [fetchShiftsTrigger, setFetchShiftsTrigger] = useState(0);

  //Cancel Shift modal
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const handleCancelOpen = () => setOpenCancelModal(true);
  const handleCancelClose = () => setOpenCancelModal(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    (async function () {
      try {
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        firstDayOfWeek.setHours(0, 0, 0);

        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        lastDayOfWeek.setHours(23, 59, 59);

        // refactored names into the .then promise, so far nothing has broke.
        await fetch(
          "api/shifts?from=" +
            firstDayOfWeek.toISOString() +
            "&to=" +
            lastDayOfWeek.toISOString
        ).then(async (response) => {
          const data = await response.json();
          setShiftInfo(data);
        });
        await fetch(
          "api/on-call-shifts?from=" +
            firstDayOfWeek.toISOString() +
            "&to=" +
            lastDayOfWeek.toISOString()
        ).then(async (response) => {
          const data = await response.json();
          setOnCallInfo(data);
        });
      } catch (e) {
        throw new Error("Failed to fetch shift data");
      }
    })();
  }, [props.fetchShiftsTrigger]);

  // const shifts = shiftInfo?.map((shift: CalendarInfo, _) => {

  const filterShifts = (shift: CalendarInfo, filters: any) => {
    const {
      partTime,
      fullTime,
      manager,
      lineOne,
      lineTwo,
      lineThree,
      onCall,
      approved,
      pending,
      cancelled,
    } = filters;

    // Add your logic here based on the filters
    //@ts-ignore
    if (
      // (partTime && shift.partTime) ||
      // (fullTime && shift.fullTime) ||
      // (manager && shift.manager) ||
      (lineOne && shift.phoneLine == 1) ||
      (lineTwo && shift.phoneLine == 2) ||
      (lineThree && shift.phoneLine == 3) ||
      // (onCall && shift.onCall) || /* TODO: add filtering for on call shifts */
      (approved &&
        shift.status ===
          Status.ACCEPTED) /* TODO: standardize 'approved' and 'acepted' */ ||
      (pending && shift.status === Status.PENDING) ||
      (cancelled && shift.status === Status.CANCELLED)
    ) {
      return true;
    }

    return false;
  };

  const shifts = shiftInfo
    ?.filter((shift) => filterShifts(shift, props.filters))
    .map((shift: CalendarInfo, _) => {
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
        title: shift.firstName + " " + shift.lastName, // we don't know what to assign this right now
        style: {
          opacity: 0.5,
          backgroundColor: background_color,
        },
      };
    });

  // appended the on call shifts to the events array to render the event to the calendar.
  const onCallShifts = onCallInfo?.map((onCallShift: OnCallShift) => {
    let background_color = "green";

    if (onCallShift.status.toString() === "CANCELLED") {
      background_color = "gray";
    } else if (onCallShift.status.toString() === "PENDING") {
      background_color = "orange";
    }

    return {
      onCallShiftID: onCallShift.onCallShiftID,
      userID: onCallShift.userID,
      primaryShifts: onCallShift.primaryShifts,
      date: new Date(onCallShift.date), // not sure what to set this
      from: new Date(onCallShift.from),
      to: new Date(onCallShift.to),
      status: onCallShift.status,
      message: onCallShift.message,
      phoneLine: onCallShift.phoneLine,
      created_at: new Date(onCallShift.created_at),

      start: new Date(onCallShift.from),
      end: new Date(onCallShift.to),
      title: onCallShift.firstName + " " + onCallShift.lastName,
      style: {
        opacity: 0.5,
        backgroundColor: background_color,
      },
    };
  });

  // this is to tell typescript that if the array is undefined, then use the empty list instead
  const events = [...(shifts ?? []), ...(onCallShifts ?? [])];

  const handleOpen = (e: CalendarInfo) => {
    setOpen(true);
    setFormData(e);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(null);
  };

  /* Currently unused in form, but may be useful later */
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /* Currently unused in form, but may be useful later */
  const handleSelectChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any, modifiedData: Partial<any>) => {
    Object.keys(modifiedData).forEach((key) => {
      if (e.hasOwnProperty(key)) {
        e[key] = modifiedData[key];
      }
    });

    const startOfShift = new Date(formData.start);
    const currentDate = new Date(Date.now());

    // Calculate the difference in milliseconds
    const timeDifference = startOfShift.getTime() - currentDate.getTime();

    // Convert 8 hours to milliseconds
    const eightHoursInMilliseconds = 8 * 60 * 60 * 1000;

    // Check if the time difference is within 8 hours

    // handleClose()

    if (
      timeDifference <= eightHoursInMilliseconds &&
      user?.publicMetadata.role != "Coordinator"
    ) {
      // Cancal Shift Modal
      setOpenCancelModal(true);
    } else {
      console.log(
        "The end date does not occur within 8 hours of the start date OR is coordinator role"
      );

      Object.keys(modifiedData).forEach((key) => {
        if (e.hasOwnProperty(key)) {
          e[key] = modifiedData[key];
        }
      });

      const keysToDelete = ["start", "end", "title", "style", "sourceResource"];
      keysToDelete.forEach((key: string, _) => {
        if (formData) {
          delete (formData as { [key: string]: any })[key];
        }
      });

      const response = await fetch(
        "api/shifts?shiftID=" + formData?.primaryShiftID.toString(),
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Before setfetchShiftsTrigger");
      props.setFetchShiftsTrigger(Date.now());
    }
  };

  /* Used to rdner different buttons on shift modal depending on shift status, user role and user id */
  const renderShiftButtons = () => {
    if (
      formData?.status === "ACCEPTED" &&
      (user?.publicMetadata.role == "Coordinator" ||
        user?.id == formData?.userID)
    ) {
      /* TODO: change firstName, lastName & userID to null rathern than ''? Not sure if necessary */
      return (
        <>
          {user?.publicMetadata.role === "Coordinator" && (
            <Button
              sx={{
                marginRight: "5%",
                paddingLeft: "10%",
                textIndent: "5.5px",
                paddingRight: "10%",
                borderColor: "#FF0000",
                border: "2px solid red",
                fontFamily: "Montserrat",
                fontWeight: "bold",
                color: "#FF0000",
                backgroundColor: "transparent",
                borderRadius: "20px",
                "&:hover": { backgroundColor: "transparent" },
                textTransform: "none",
              }}
              variant="contained"
            >
              Delete Shift
            </Button>
          )}
          <Button
            onClick={() => {
              handleSubmit(formData, {
                status: Status.CANCELLED,
                firstName: "",
                lastName: "",
                userID: "",
              });
            }}
            sx={{
              marginRight: "5%",
              paddingLeft: "10%",
              textIndent: "5.5px",
              fontFamily: "Montserrat",
              fontWeight: "bold",
              paddingRight: "10%",
              borderRadius: "20px",
              backgroundColor: theme.palette.primary.main,
              "&:hover": { backgroundColor: "#2E0057" },
              textTransform: "none",
            }}
            variant="contained"
          >
            Cancel Shift
          </Button>
          <Modal open={openCancelModal} onClose={handleCancelClose}>
            <Box sx={style}>
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
                  style={{
                    background: "transparent", // Remove the gray background
                    border: "none", // Remove the button border
                    padding: 0, // Remove default padding
                    cursor: "pointer", // Show pointer cursor on hover
                  }}
                  onClick={() => {
                    handleCancelClose();
                  }}
                >
                  <CloseIcon
                    fill="none"
                    color="primary"
                    sx={{ fontSize: 45 }}
                  />
                </button>
              </Box>
              <Box sx={{ paddingLeft: 2, paddingRight: 6 }}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: { lg: "35px", xs: "32px" },
                    fontWeight: "bold",
                  }}
                >
                  Cannot Cancel Shift
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 2, paddingRight: 4, paddingTop: 4 }}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: { lg: "25px", xs: "22px" },
                  }}
                >
                  Since this shift is in less than 8 hours, it cannot be
                  cancelled on the shift scheduler.
                </Typography>
              </Box>
              <Box
                sx={{
                  paddingLeft: 2,
                  paddingRight: 6,
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: { lg: "25px", xs: "22px" },
                  }}
                >
                  Please contact your manager.
                </Typography>
              </Box>
              <Box sx={{ paddingLeft: 32.5 }}>
                <Button
                  onClick={() => {
                    handleCancelClose();
                  }}
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": { backgroundColor: "#89B839" },
                    textTransform: "none",
                  }}
                  variant="contained"
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      );
    } else if (formData?.status === "CANCELLED") {
      /* TODO: despite warnings in line below code appears to work. In the future, Code might be cleaned up and warnings removed by making these fields nullable in the prisma schema */
      return (
        <Button
          onClick={() => {
            handleSubmit(formData, {
              status: Status.PENDING,
              firstName: user?.firstName,
              lastName: user?.lastName,
              userID: user?.id,
            });
          }}
          sx={{
            paddingLeft: "10%",
            textIndent: "5.5px",
            paddingRight: "10%",
            borderRadius: "10px",
            backgroundColor: theme.palette.secondary.main,
            "&:hover": { backgroundColor: "#89B839" },
            textTransform: "none",
          }}
          variant="contained"
        >
          Request Shift
        </Button>
      );
    } else if (formData?.status === "PENDING") {
      if (user?.publicMetadata.role == "Coordinator") {
        return (
          <>
            <Button
              onClick={() => {
                handleSubmit(formData, {
                  status: Status.CANCELLED,
                  firstName: "",
                  lastName: "",
                  userID: "",
                });
              }}
              sx={{
                paddingLeft: "10%",
                textIndent: "5.5px",
                paddingRight: "10%",
                borderRadius: "10px",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: "#89B839" },
                textTransform: "none",
              }}
              variant="contained"
            >
              Reject Request
            </Button>
            <Button
              onClick={() => {
                handleSubmit(formData, { status: Status.ACCEPTED });
              }}
              sx={{
                paddingLeft: "10%",
                textIndent: "5.5px",
                paddingRight: "10%",
                borderRadius: "10px",
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: "#89B839" },
                textTransform: "none",
              }}
              variant="contained"
            >
              Approve Request
            </Button>
          </>
        );
      } else if (user?.id == formData?.userID) {
        return (
          <Button
            onClick={() => {
              handleSubmit(formData, {
                status: Status.CANCELLED,
                firstName: "",
                lastName: "",
                userID: "",
              });
            }}
            sx={{
              paddingLeft: "10%",
              textIndent: "5.5px",
              paddingRight: "10%",
              borderRadius: "10px",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": { backgroundColor: "#89B839" },
              textTransform: "none",
            }}
            variant="contained"
          >
            Cancel Request
          </Button>
        );
      }
    }
  };

  // TODO: end of modal logic - abstract away into a different component (CalendarModalButton)
  return (
    <div style={{ height: "500px" }}>
      <Calendar
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={(e: CalendarInfo) => {
          handleOpen(e);
        }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        defaultView={"week"}
        eventPropGetter={(event: Event) => {
          return { style: event.style };
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* closes the outer modal */}
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
                fontSize: { lg: "25px", xs: "22px" },
              }}
            >
              Shift Details
            </Typography>
          </Box>
          <Box>
            <form>
              <Grid
                container
                spacing={2}
                columnSpacing={{ xs: 10, sm: 80, md: 5, lg: 5 }}
                justify-content="flex-start"
                alignItems="flex-start"
                columns={12}
                margin={{ xs: 1, sm: 2, md: 3, lg: 4 }}
                sx={{ width: "100%" }}
              >
                <Grid
                  container
                  spacing={4}
                  direction="column"
                  alignItems="flex-start"
                  paddingBottom="13%"
                  sx={{ width: "100%" }}
                >
                  <Grid
                    container
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: -1,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ marginRight: 1, width: "100" }}
                    >
                      Start Time:
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "black",
                        borderRadius: "5px",
                        flex: 1,
                        width: "100%",
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {" "}
                        {formData
                          ? formData.from
                              .toString()
                              .substring(
                                0,
                                formData.from.toString().indexOf(" GMT")
                              )
                          : ""}{" "}
                      </Typography>{" "}
                    </Box>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: -1,
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{ marginRight: "15px", width: "100" }}
                    >
                      End Time:
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "black",
                        borderRadius: "5px",
                        width: "100%",
                        flex: 1,
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        {" "}
                        {formData
                          ? formData.to
                              .toString()
                              .substring(
                                0,
                                formData.to.toString().indexOf(" GMT")
                              )
                          : ""}{" "}
                      </Typography>{" "}
                    </Box>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: -1,
                      width: "100%",
                    }}
                  >
                    <Typography variant="h4" sx={{ marginRight: 10 }}>
                      Assigned Employee:
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "black",
                        borderRadius: "5px",
                        width: "100%",
                        flex: 1,
                      }}
                    >
                      {" "}
                      <Typography sx={{ marginLeft: 1 }}>
                        {" "}
                        {formData ? formData.title : ""}{" "}
                      </Typography>{" "}
                    </Box>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: -1,
                      width: "100%",
                    }}
                  >
                    <Typography variant="h4" sx={{ marginRight: "148px" }}>
                      Phone Line:
                    </Typography>
                    <Box
                      sx={{
                        border: 1,
                        borderColor: "black",
                        borderRadius: "5px",
                        width: "100%",
                        flex: 1,
                      }}
                    >
                      {" "}
                      <Typography sx={{ marginLeft: 1 }}>
                        {" "}
                        {formData ? formData.phoneLine : ""}{" "}
                      </Typography>{" "}
                    </Box>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: -1,
                      width: "100%",
                    }}
                  >
                    <Typography variant="h4" sx={{ marginRight: "190px" }}>
                      Status:
                    </Typography>
                    <Box
                      sx={{
                        flex: 1,
                        border: 1,
                        borderColor:
                          formData?.style?.backgroundColor == "gray"
                            ? "red"
                            : formData?.style?.backgroundColor,
                        borderRadius: "5px",
                        width: "100%",
                        color:
                          formData?.style?.backgroundColor == "gray"
                            ? "red"
                            : formData?.style?.backgroundColor,
                      }}
                    >
                      {" "}
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        {formData?.style?.backgroundColor == "green"
                          ? "Assigned"
                          : formData?.style?.backgroundColor == "gray"
                          ? "Cancelled"
                          : "Pending"}{" "}
                      </Typography>{" "}
                    </Box>
                  </Grid>
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    container
                    justifyContent="flex-end"
                    textAlign="center"
                    paddingTop="5%"
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    {renderShiftButtons()}
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

const Cal = () => {
  const [fetchShiftsTrigger, setFetchShiftsTrigger] = useState(0);
  const [filterState, setFilter] = React.useState({
    partTime: true,
    fullTime: true,
    manager: true,
    lineOne: true,
    lineTwo: true,
    lineThree: true,
    onCall: true,
    approved: true,
    pending: true,
    cancelled: true,
  });

  // const filterShifts = (shift: CalendarInfo, filters: any) => {
  //   const { partTime, fullTime, manager, lineOne, lineTwo, lineThree, onCall, approved, pending, cancelled } = filters;

  //   // Add your logic here based on the filters
  //   if (
  //     (partTime && shift.partTime) ||
  //     (fullTime && shift.fullTime) ||
  //     (manager && shift.manager) ||
  //     (lineOne && shift.lineOne) ||
  //     (lineTwo && shift.lineTwo) ||
  //     (lineThree && shift.lineThree) ||
  //     (onCall && shift.onCall) ||
  //     (approved && shift.status === Status.ACCEPTED) || /* TODO: standardize 'approved' and 'acepted' */
  //     (pending && shift.status === Status.PENDING) ||
  //     (cancelled && shift.status === Status.CANCELLED)
  //   ) {
  //     return true;
  //   }

  //   return false;
  // };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filterState,
      [event.target.name]: event.target.checked,
    });
  };

  const {
    partTime,
    fullTime,
    manager,
    lineOne,
    lineTwo,
    lineThree,
    onCall,
    approved,
    pending,
    cancelled,
  } = filterState;

  const [open, setOpen] = useState(false);

  // const [openCancelModal, setOpenCancelModal] = useState(false);
  // const handleCancelOpen = () => setOpenCancelModal(true);
  // const handleCancelClose = () => setOpenCancelModal(false);

  // Add the missing setOpenCancelModal function here
  const handleSelectOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = (
    event: React.ChangeEvent<{}>,
    reason?:
      | "select-option"
      | "remove-option"
      | "close"
      | "clear"
      | "escape"
      | "backdropClick"
  ) => {
    if (
      reason === "select-option" ||
      reason === "escape" ||
      reason === "backdropClick"
    ) {
      setOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "90vh",
        flexDirection: "column",
        justifyContent: "flex-start",
        borderRadius: "5%",
        backgroundColor: "#f6f6f6",
        fontFamily: "default",
        margin: "2%",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <Grid
        container
        spacing={2}
        columns={{ lg: 20, xs: 30 }}
        paddingTop="2%"
        marginRight="4%"
      >
        <Grid xs={15} paddingBottom="5%">
          <Typography
            display={{ xs: "block", md: "block", lg: "block" }}
            variant="h1"
            sx={{ fontWeight: "bold", paddingLeft: "8%", paddingTop: "5%" }}
          >
            Calendar
          </Typography>
        </Grid>

        <Grid xs={5} paddingTop="8%">
          <CalendarModalButton callback={setFetchShiftsTrigger} />

          <FormControl sx={{ m: 1, minWidth: 160 }}>
            <InputLabel htmlFor="grouped-select">Choose Filters</InputLabel>
            {/* Menu props align the popup */}

            <Select
              autoWidth={true}
              defaultValue={""}
              id="grouped-select"
              label="Grouping"
              open={open}
              onOpen={handleSelectOpen}
              // onClose={(_e: any, reason: string) => {
              //   if (reason !== "backdropClick") {
              //     setOpen(false);
              //   }
              // }}
            >
              <Grid container direction="row" spacing={1} marginRight={2}>
                {/* EMPLOYEE NAME Column */}
                <Grid container direction="column" spacing={1}>
                  <Grid sx={{ ml: 2 }} onClick={(e) => e.stopPropagation()}>
                    <ListSubheader>
                      {" "}
                      <b>Employee Name</b>
                    </ListSubheader>
                    <Autocomplete
                      disablePortal
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onClose={(e) => {
                        e.stopPropagation();
                      }}
                      options={employeeOptions}
                      sx={{ width: 175 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Employee Name" />
                      )}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </Grid>
                </Grid>

                {/* EMPLOYEE TYPE Column */}
                <Grid container direction="column" spacing={1}>
                  <Grid>
                    <ListSubheader>
                      {" "}
                      <b>Employee Type</b>
                    </ListSubheader>
                    <FormGroup sx={{ px: 1.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={partTime}
                            onChange={handleFilterChange}
                            name="partTime"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Part Time"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={fullTime}
                            onChange={handleFilterChange}
                            name="fullTime"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Full Time"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={manager}
                            onChange={handleFilterChange}
                            name="manager"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Manager"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                {/* PHONE LINE Column */}
                <Grid container direction="column" spacing={1}>
                  <Grid>
                    <ListSubheader>
                      {" "}
                      <b>Phone Line</b>
                    </ListSubheader>
                    <FormGroup sx={{ px: 1.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={lineOne}
                            onChange={handleFilterChange}
                            name="lineOne"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Line 1"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={lineTwo}
                            onChange={handleFilterChange}
                            name="lineTwo"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Line 2"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={lineThree}
                            onChange={handleFilterChange}
                            name="lineThree"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Line 3"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={onCall}
                            onChange={handleFilterChange}
                            name="onCall"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="On Call"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>

                {/* SHIFT STATUS Column */}
                <Grid container direction="column" spacing={1}>
                  <Grid>
                    <ListSubheader>
                      {" "}
                      <b>Shift Status</b>
                    </ListSubheader>
                    <FormGroup sx={{ px: 1.5 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={approved}
                            onChange={handleFilterChange}
                            name="approved"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Approved"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={pending}
                            onChange={handleFilterChange}
                            name="pending"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Pending"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cancelled}
                            onChange={handleFilterChange}
                            name="cancelled"
                          />
                        }
                        onClick={(e) => e.stopPropagation()}
                        label="Cancelled"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid paddingBottom={"4%"}>
        <MyCalendar
          filters={filterState}
          fetchShiftsTrigger={fetchShiftsTrigger}
          setFetchShiftsTrigger={setFetchShiftsTrigger}
        />
      </Grid>
    </Box>
  );
};

export default Cal;
