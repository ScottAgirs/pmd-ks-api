/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeystoneContext } from '@keystone-6/core/types';

export const acceptInvite = async (
  _: any,
  { inviteId }: { inviteId: string },
  context: KeystoneContext
): Promise<any> => {
  const currentUser = context.session?.data;
  const userId = currentUser.id;
  const patientId = currentUser.patient.id as string;

  // const inviteDB = context.db.UserInvite;
  const invite = await context.query.UserInvite.findOne({
    query:
      'id healthCard { id } invitedByUser { id } firstName lastName dateOfBirth middleName cellPhoneNumberString sex',
    where: { id: inviteId },
  });

  const invitingUserId = invite.invitedByUser.id as string;
  const healthCardId = invite.healthCard.id as string;

  let doctorId;
  try {
    const doctorUser = await context.query.User.findOne({
      query: 'id doctor { id }',
      where: { id: invitingUserId },
    });

    doctorId = doctorUser.doctor.id;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('accept-invite.ts doctorDB.findOne ~ error', error);
  }

  if (!doctorId) throw new Error('Doctor not found');

  try {
    const updatedInvitedPatient = await context.db.Patient.updateOne({
      where: { id: patientId },
      // eslint-disable-next-line sort-keys
      data: {
        caredByDoctors: {
          connect: [{ id: doctorId }],
        },
        healthCards: { connect: [{ id: healthCardId }] },
      },
    });

    await context.db.User.updateOne({
      where: { id: userId },
      // eslint-disable-next-line sort-keys
      data: {
        cellPhoneNumberString: invite.cellPhoneNumberString,
        dateOfBirth: invite.dateOfBirth,
        firstName: invite.firstName,
        lastName: invite.lastName,
        middleName: invite.middleName,
        sex: invite.sex,
        signUpInvite: {
          connect: { id: inviteId },
        },
      },
    });

    await context.db.Doctor.updateOne({
      where: { id: doctorId },
      // eslint-disable-next-line sort-keys
      data: {
        caringForPatients: {
          connect: [{ id: patientId }],
        },
      },
    });

    // sendTemplatedEmail({
    //   to: updatedInvitedPatient.user.email,
    //   templateAlias: "pt-dr-invited-patient",
    //   templateModel: {
    //     patientFirstName: updatedInvitedPatient.user.firstName,
    //     patientLastName: updatedInvitedPatient.user.firstName,
    //     doctorFirstName: currentUser.firstName,
    //     actionUrl: `${process.env.FRONTEND_URL}/doctor/__PATIENT__`,
    //   },
    // });

    return updatedInvitedPatient;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('GOT A error', error);
    throw new Error("Couldn't accept invite");
  }
};
