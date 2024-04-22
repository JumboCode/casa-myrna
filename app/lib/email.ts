// @ts-ignore 
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

export default async function emailHandler(data : { emailTo : any, subject : string, content: string }) {
    console.log("IN EMAIL HANDLER")
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

    let mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: data.emailTo,
        subject: data.subject, 
        text: data.content
    };

    // Define email options
    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return { status: 200, message: 'Email sent successfully' }; 
    } catch (error) {
        console.error('Error sending email:', error);
        return { status: 500, message: (error as Error).message }; 
    }
}

