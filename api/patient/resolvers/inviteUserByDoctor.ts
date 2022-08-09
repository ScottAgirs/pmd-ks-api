import { KeystoneContext } from "@keystone-6/core/types";
import { sendTemplatedEmail } from "../../../lib/email/sendEmail";

interface InviteUserByDoctorInput {
  healthCardNumber: string;
  healthCardVersionCode: string;
  healthCardExpiryDate: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  cellPhoneNumberString: string;
  sex: string;
}

export const inviteUserByDoctor = async (
  _: any,
  {
    healthCardNumber,
    healthCardVersionCode,
    healthCardExpiryDate,
    dateOfBirth,
    email,
    firstName,
    lastName,
    middleName,
    cellPhoneNumberString,
    sex,
  }: InviteUserByDoctorInput,
  context: KeystoneContext
): Promise<any> => {
  const currentUser = context.session?.data;
  if (!currentUser.doctor.id) throw new Error("User is not a doctor");

  const userDB = context.db.User;

  const existingUser = await userDB.findOne({
    where: { email: email },
  });
  if (existingUser) throw new Error("User with this email exists.");

  const existingUserInvite = await context.db.UserInvite.findOne({
    where: { email: email },
  });
  if (existingUserInvite)
    throw new Error("User with this email is already invited by someone.");

  const emailExists = await userDB.findMany({
    where: { email: { equals: email } },
  });

  // Create User Invite
  let createdUserInvite;
  try {
    createdUserInvite = await context.db.UserInvite.createOne({
      data: {
        dateOfBirth,
        email,
        firstName,
        lastName,
        middleName,
        cellPhoneNumberString,
        sex,
        invitedByUser: {
          connect: { id: currentUser.id },
        },
      },
    });
  } catch (error) {
    console.log("createdUserInvite - error", error);
  }

  if (!createdUserInvite) throw new Error("Failed to create User invite");

  // Create Health Card
  let createHealthCard;
  try {
    createHealthCard = await context.db.HealthCard.createOne({
      data: {
        dateOfBirth,
        nameOnCard: firstName + " " + lastName,
        expiryDate: healthCardExpiryDate,
        insurancePolicyNumber: healthCardNumber,
        versionCode: healthCardVersionCode,
        userInvite: {
          connect: { id: createdUserInvite.id },
        },
      },
    });
  } catch (error) {
    console.log("createHealthCard - error", error);
  }

  // Send email
  try {
    sendTemplatedEmail({
      to: email,
      templateAlias: "user-invitation",
      templateModel: {
        firstName,
        doctorFirstName: currentUser.firstName,
        doctorLastName: currentUser.lastName,
        actionUrl: `${process.env.FRONTEND_URL}/r/join/${createdUserInvite.id}`,
      },
    });
  } catch (error) {
    console.log("createHealthCard - error", error);
  }

  return createdUserInvite;
};
