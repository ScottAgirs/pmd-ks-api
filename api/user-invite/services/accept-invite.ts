import { KeystoneContext } from "@keystone-6/core/types";

export const acceptInvite = async (
  _: any,
  { inviteId }: { inviteId: string },
  context: KeystoneContext
): Promise<any> => {
  const currentUser = context.session?.data;
  const userId = currentUser.id;
  const patientId = currentUser.patient.id as string;

  const inviteDB = context.db.UserInvite;
  const invite = await context.query.UserInvite.findOne({
    where: { id: inviteId },
    query: "id healthCard { id } invitedByUser { id } firstName lastName dateOfBirth middleName cellPhoneNumberString sex",
  });

  const invitingUserId = invite.invitedByUser.id as string;
  const healthCardId = invite.healthCard.id as string;

  let doctorId;
  try {
    const doctorUser = await context.query.User.findOne({
      where: { id: invitingUserId },
      query: "id doctor { id }",
    });

    doctorId = doctorUser.doctor.id;
  } catch (error) {
    console.log("accept-invite.ts doctorDB.findOne ~ error", error)
  }

  if (!doctorId) throw new Error("Doctor not found");
    
  try {
    const updatedInvitedPatient = await context.db.Patient.updateOne({
      where: { id: patientId },
      data: {
        healthCards: { connect: [{ id: healthCardId }] },
        caredByDoctors: {
          connect: [{ id: doctorId }],
        },
      },
    });

    await context.db.User.updateOne({
      where: { id: userId },
      data: {
        firstName: invite.firstName,
        lastName: invite.lastName,
        dateOfBirth: invite.dateOfBirth,
        middleName: invite.middleName,
        cellPhoneNumberString: invite.cellPhoneNumberString,
        sex: invite.sex,
        signUpInvite: { 
          connect: { id: inviteId }
        }
      },
    });

    await context.db.Doctor.updateOne({
      where: { id: doctorId },
      data: {
        caringForPatients: {
          connect: [{ id: patientId }],
        },
      },
    });


    return updatedInvitedPatient;
  } catch (error) {
    console.log("GOT A error", error);
  }
};
