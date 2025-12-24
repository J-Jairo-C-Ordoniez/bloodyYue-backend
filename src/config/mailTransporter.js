import nodemailer from 'nodemailer';


const mailTransporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
});

export default mailTransporter;