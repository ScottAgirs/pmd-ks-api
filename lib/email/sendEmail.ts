import { emailClient } from "../../utils/postmark";

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
export const sendEmail = async ({
  from,
  to,
  templateAlias,
  templateModel,
}: SendEmailWithTemplateOptions) => {
  const sendRequest = {
    To: to,
    From: from || "No-Reply PocketMD <no-reply@pocketmd.ca>",
    TemplateAlias: templateAlias,
    TemplateModel: templateModel,
    MessageStream: "outbound",
  };

  try {
    const sentEmail = await emailClient.sendEmailWithTemplate(sendRequest);
    console.log("sentEmail", sentEmail);
    if (sentEmail.Message === "OK") {
      console.log(`💌 Message Sent!`);
    } else {
      const errMsg = `🚨 Invite email failed to send!`;
      console.log(errMsg, { sentEmail });
      throw new Error(errMsg);
    }

    return sentEmail;
  } catch (error: any) {
    console.log("GOT IN err", error);
    return { error, message: "Failed sending email", code: error.code };
  }
};
