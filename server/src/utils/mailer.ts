import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  host: 'smtp.gmail.com',
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.verify((error, success) => {
  console.log('Server is ready to take our messages');
});

export default transporter;
