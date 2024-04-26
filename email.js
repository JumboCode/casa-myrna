import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

export default async function handler() {

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS, 
        }
    });

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL, 
        to: "soronzonboldbill@gmail.com",
        subject: "please work",
        text: "rohan is a bum!"
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return {
            status: 200,
            msg: "should have sent", 
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            status: 500,
            msg: "failed"
        }
    }
} 

