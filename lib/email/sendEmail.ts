import { getTestMessageUrl } from "nodemailer";
import { transporter } from "./transporter";

interface UserForEmail {
  email: string
  firstName: string
  lastName?: string
  id?: string
}

interface FromEmailParams {
  email: string
  name: string
}

interface SendEmailOptions {
  from?: FromEmailParams
  subject: string
  text: string
  html?: string
  to?: string
  sendToUser?: UserForEmail
}

export const sendEmail = async ({ from, sendToUser, subject, text, to, html }: SendEmailOptions) => {
  console.log("GOT IN");
  const sendRequest = {
    to: to || sendToUser?.email,
    from: from || 'PocketMd <no-reply@pocketmd.ca>',
    subject,
    text,
    html,
  };
  
  console.log("GOT IN 2");
  console.log('sendEmail :: process?.env?.MAIL_USER?', process?.env?.MAIL_USER);
  try {
    console.log("GOT IN 3");
    const sentEmail = await transporter.sendMail(sendRequest)
    console.log('sendEmail :: sentEmail', sentEmail);
    
    if(process?.env?.MAIL_USER?.includes('ethereal.email')) {
      console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(sentEmail)}`);
  
    }
    return sentEmail;
  } catch (error: any) {
    console.log("GOT IN err", error);
    return { error, message: 'Failed sending email', code: error.code };
  }
}