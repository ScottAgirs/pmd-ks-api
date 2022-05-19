import { BaseItem, KeystoneContext } from "@keystone-6/core/types";
import { sendEmail } from "../../lib/email/sendEmail";

// TODO: [TypeScript] Add context interface
export const afterCreateUser = async ({
  context,
  item,
}: {
  context: KeystoneContext;
  item: BaseItem;
}) => {
  if (!item) throw new Error("Failed to create User item.");

  if (!item.isDummy) {
    await context.query.StepperProg.createOne({
      data: {
        name: `${item.firstName}'s Stepper Progress`,
        user: {
          connect: {
            id: item.id,
          },
        },
      },
    });

    await context.query.Patient.createOne({
      data: {
        name: `${item.firstName}'s Patient Profile`,
        user: {
          connect: {
            id: item.id,
          },
        },
      },
    });

    sendEmail({
      from: {
        email: "test@pocketmd.ca",
        name: "PocketMD Tester",
      },
      to: item.email as string,
      subject: "Welcome to PocketMD",
      text: "This is your registration confirmation with PocketMD.",
    });
  }
};
