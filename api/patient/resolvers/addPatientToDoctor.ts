import { KeystoneContext } from "@keystone-6/core/types";

interface CreateEventBookingInput {
  firstName?: string;
  lastName?: string;
  email: string;
  cellPhoneNumberString?: string;
}

export const addPatientToDoctor = async (
  _: any,
  {
    firstName,
    lastName,
    email,
    cellPhoneNumberString,
  }: CreateEventBookingInput,
  context: KeystoneContext
): Promise<any> => {
  const currentUser = context.session?.data;
  console.log("currentUser", currentUser);
  console.log("cellPhoneNumberString", cellPhoneNumberString);
  console.log("email", email);
  console.log("lastName", lastName);
  console.log("firstName", firstName);
  const patientDB = context.db.Patient;
  const doctorDB = context.db.Patient;
  const userMatchedPatients = await patientDB.findMany({
    where: {
      AND: [
        { user: { firstName: { equals: firstName } } },
        { user: { lastName: { equals: lastName } } },
        { user: { email: { equals: email } } },
        { user: { cellPhoneNumberString: { equals: cellPhoneNumberString } } },
      ],
    },
  });
  console.log("userMatchedPatients", userMatchedPatients);

  const existingPatient =
    userMatchedPatients.length > 0 ? userMatchedPatients[0] : null;

  if (!existingPatient) {
    // Create new patient
    // Send invite notification
  } else {
    const patientId = existingPatient.id;
    if (!currentUser.doctor.id) throw new Error("User is not a doctor");

    // Connect Patient to Doctor's patientsInCare
    try {
      const patientInCare = await context.db.Patient.updateOne({
        where: { id: patientId as string },
        data: {
          caredByDoctors: {
            connect: [{ id: currentUser.doctor.id }],
          },
        },
      });

      return patientInCare;
    } catch (error) {
      console.log("GOT A error", error);
    }
  }
};
