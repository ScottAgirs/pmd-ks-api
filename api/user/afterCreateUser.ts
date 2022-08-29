import { BaseItem, KeystoneContext } from '@keystone-6/core/types';
import { sendTemplatedEmail } from '../../lib/email/sendEmail';

// TODO: [TypeScript] Add context interface
export const afterCreateUser = async ({
  context,
  item: createdUser,
}: {
  context: KeystoneContext;
  item: BaseItem;
}) => {
  if (!createdUser) throw new Error('Failed to create User createdUser.');

  if (!createdUser.isDummy) {
    await context.query.StepperProg.createOne({
      data: {
        name: `${createdUser.firstName}'s Stepper Progress`,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });

    await context.query.Patient.createOne({
      data: {
        name: `${createdUser.firstName}'s Patient Profile`,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });

    sendTemplatedEmail({
      from: 'no-reply@pocketmd.ca',
      templateAlias: 'welcome',
      templateModel: {
        actionUrl: `${process.env.FRONTEND_URL}`,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        loginUrl: `${process.env.FRONTEND_URL}/login`,
        settingsUrl: `${process.env.FRONTEND_URL}/profile`,
      },
      to: createdUser.email as string,
    });
  }
};
