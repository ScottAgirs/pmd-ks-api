import { emailClient } from '../../utils/postmark';

interface UserForEmail {
  email: string;
  firstName: string;
  lastName?: string;
  id?: string;
}

// interface SendEmailOptions {
//   from?: string;
//   subject: string;
//   text: string;
//   html?: string;
//   to?: string;
//   templateAlias: string;
//   templateModel: {};
//   sendToUser?: UserForEmail;
// }
interface SendEmailWithTemplateOptions {
  from?: string;
  to: string;
  templateAlias: string;
  templateModel: {};
}

// TODO: Add logic to send email to Ethereal.mail if in DEV mode and send via Sengdgrid.com if in PROD or PREVIEW mode
export const sendTemplatedEmail = async ({
  from,
  to,
  templateAlias,
  templateModel,
}: SendEmailWithTemplateOptions) => {
  const sendRequest = {
    From: from || 'No-Reply PocketMD <no-reply@pocketmd.ca>',
    MessageStream: 'outbound',
    TemplateAlias: templateAlias,
    TemplateModel: {
      ...templateModel,
      company_address: 'Toronto, ON',
      company_name: 'PocketMD',
      product_name: 'PocketMD',
      product_url: process.env.FRONTEND_URL,
      support_url: process.env.SUPPORT_URL,
    },
    To: to,
  };

  try {
    const sentEmail = await emailClient.sendEmailWithTemplate(sendRequest);
    console.log('sentEmail', sentEmail);
    if (sentEmail.Message === 'OK') {
      console.log(`💌 Message Sent!`);
    } else {
      const errMsg = `🚨 Invite email failed to send!`;
      console.log(errMsg, { sentEmail });
      throw new Error(errMsg);
    }

    return sentEmail;
  } catch (error: any) {
    console.log('sendEmail.ts ~ sendEmailWithTemplate error', error);
    return { code: error.code, error, message: 'Failed sending email' };
  }
};
