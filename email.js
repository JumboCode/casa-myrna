import nodemailer from 'nodemailer';

import dotenv from 'dotenv'
dotenv.config()

export default async function handler(data) {
   
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: "soronzonboldbill@gmail.com",
        subject: "this is a test email",
        text: "pls work"
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return {
            status: 200, 
            message: "success - check your inbox!", 
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            status: 500, 
            message: "failure! - you suck!", 
        }
    }
}

handler(null)
    .then((response) => {
        console.log(response); 
    })
    .catch((error) => {
        console.error(error.message) 
    }); 