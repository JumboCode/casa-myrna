import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'

import dotenv from 'dotenv'
dotenv.config()

export default async function handler(data : any, res : NextApiResponse) {
   
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
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}

