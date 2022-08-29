import { createTransport } from 'nodemailer';

const transportConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

export const transporter = createTransport(transportConfig);
