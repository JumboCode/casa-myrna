import nodemailer from 'nodemailer';
import { clerkClient } from '@clerk/nextjs';
import { config } from "dotenv";
config();

async function sendEmail(data: { emailList: string[], subject: string, message: string }) {

    const { emailList, subject, message } = data
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL,
        to: emailList,
        subject: subject,
        text: message
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return {
            status: 200,
            ok: true,
            msg: "EMAIL HAS BEEN SENT"
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            status: 500,
            ok: false,
            msg: "SOMETHING WENT WRONG: " + (error as Error).message,
        }
    }
}

function parseTime(fromStr : string, toStr: string) {
    const fromDate = new Date(fromStr);
    const fromMonth = (fromDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const fromDay = fromDate.getDate().toString().padStart(2, '0');
    const fromYear = fromDate.getFullYear().toString().slice(2); // Get the last two digits of the year

    let fromHour = fromDate.getHours();
    const fromMinutes = fromDate.getMinutes().toString().padStart(2, '0');
    const fromPeriod = fromHour >= 12 ? 'PM' : 'AM';
    let fromDispHour = (fromHour % 12 || 12).toString().padStart(2, '0');

    const toDate = new Date(toStr);
    const toMonth = (toDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const toDay = toDate.getDate().toString().padStart(2, '0');
    const toYear = toDate.getFullYear().toString().slice(2); // Get the last two digits of the year

    let toHour = toDate.getHours();
    const toMinutes = toDate.getMinutes().toString().padStart(2, '0');
    const toPeriod = toHour >= 12 ? 'PM' : 'AM';
    let toDispHour = (toHour % 12 || 12).toString().padStart(2, '0');

    return "from " + fromMonth + "/" + fromDay + "/" + fromYear + " " + fromDispHour + ":" + fromMinutes + " " + fromPeriod + " to " + toMonth + "/" + toDay + "/" + toYear + " " + toDispHour + ":" + toMinutes + " " + toPeriod ; 
}   

async function notifyUsers(data : any, oldShift: any, shiftIDNumeric : number, shiftType : string){
    
    let messageAdmin = "";
    let subjectAdmin = "";
    let messageEmployee = "";
    let subjectEmployee = "";

    const userID = (data.userID != '') ? data.userID : oldShift?.userID
    console.log("USER ID: ", userID)
    let queryFilters: { [key: string]: any } = {}
    queryFilters["limit"] = 500
    const userEmail = (await clerkClient.users.getUser(userID)).emailAddresses[0].emailAddress;
    const users = await clerkClient.users.getUserList(queryFilters)

    const adminList = users.filter((user) => {
            return user.publicMetadata.role === 'Coordinator';
    }).map((user) => {
            return user.emailAddresses[0].emailAddress;
    });
    console.log(adminList)

    let isAdminEmail = true;

    if (data.status === "PENDING") {
            subjectAdmin = `${shiftType} ${shiftIDNumeric} is pending`;
            messageAdmin = `${data.firstName + " " + data.lastName} has requested the ${shiftType}  ${parseTime(data.from, data.to)}. Approve this shift to assign it to ${data.firstName + " " + data.lastName}.`

            subjectEmployee = `${shiftType} ${shiftIDNumeric} is pending`
            messageEmployee = `You have requested the ${shiftType} ${parseTime(data.from, data.to)}. A coordinator will approve or cancel this request.`
    } else if (data.status === "CANCELLED" && oldShift?.status === "PENDING") {
            isAdminEmail = false
            subjectEmployee = `Request for ${shiftType} ${shiftIDNumeric} rejected`
            messageEmployee = `Your request for the ${shiftType} ${parseTime(data.from, data.to)} has been rejected.`
    } else if (data.status === "CANCELLED" && oldShift?.status === "ACCEPTED") {
            subjectAdmin = `${shiftType} ${shiftIDNumeric} has been CANCELLED by Employee ${data.firstName + " " + data.lastName}`
            messageAdmin = `${oldShift.firstName + " " + oldShift.lastName} is unable to make their ${shiftType} ${parseTime(data.from, data.to)}. The shift is now available for other employees to pick up`

            subjectEmployee = `${shiftType} ${shiftIDNumeric} cancelled`
            messageEmployee = `You have cancelled your ${shiftType} ${parseTime(data.from, data.to)}. The shift is now available for other employees to pick up.`
    } else if (data.status === "ACCEPTED") {
            isAdminEmail = false;
            subjectEmployee = `Request for ${shiftType} ${shiftIDNumeric} approved`
            messageEmployee = `Your request for the ${shiftType} ${parseTime(data.from, data.to)} has been approved.`
    }

    if (isAdminEmail) {
            await sendEmail({
                    emailList: adminList,
                    subject: subjectAdmin,
                    message: messageAdmin,
            }).then((response) => {
                    console.log(response);
            }).catch((error) => {
                    throw new Error('something went wrong sending an email', error.message);
            })
    }

    await sendEmail({
            emailList: [userEmail],
            subject: subjectEmployee,
            message: messageEmployee,
    }).then((response) => {
            console.log(response);
    }).catch((error) => {
            throw new Error('something went wrong sending an email', error.message);
    })
}


export { notifyUsers }