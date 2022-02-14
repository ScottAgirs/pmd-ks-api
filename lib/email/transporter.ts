import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: process.env.MAIL_AUTH,
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
});
