import { KeystoneContext } from "@keystone-6/core/types";

export const acceptInvite = async (
  _: any,
  { inviteId }: { inviteId: string },
  context: KeystoneContext
): Promise<any> => {
  const currentUser = context.session?.data;
  const patientDB = context.db.Patient;
  const doctorDB = context.db.Doctor;
  const inviteDB = context.db.UserInvite;
  const invite = await inviteDB.findOne({
    where: { id: inviteId },
  });

  const patient = await patientDB.findOne({
    where: { id: currentUser.patient.id },
  });
  console.log("🚀 ~ line 22 ~ patient", patient)
  const doctor = await doctorDB.findOne({
    where: {
      id: invite.invitedByUserId as string
    },
  });
    
  try {
    const patientInCare = await context.db.Patient.updateOne({
      where: { id: patient.id as string },
      data: {
        user: {
          invite: { 
            connect: { id: inviteId }
          }
        },
        caredByDoctors: {
          connect: [{ id: doctor.id }],
        },
      },
    });

    return patientInCare;
  } catch (error) {
    console.log("GOT A error", error);
  }
};
