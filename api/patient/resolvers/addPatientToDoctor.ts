/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeystoneContext } from '@keystone-6/core/types';
import { sendTemplatedEmail } from '../../../lib/email/sendEmail';

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
  const patientDB = context.db.Patient;

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

  const existingPatient =
    userMatchedPatients.length > 0 ? userMatchedPatients[0] : null;

  if (!existingPatient) {
    // Check if user with email already exists
    const emailExists = await patientDB.findMany({
      where: { user: { email: { equals: email } } },
    });

    // Covers the case, where user with email already exists, but incorrect data was provided
    if (emailExists.length > 0) {
      throw new Error('Email already exists');
    } else {
      throw new Error('Patient does not exist'); // THIS ERROR MSG IS TIED TO CLIENT - CHANGE WITH CAUTION AND COMPARE AGAINST CLIENT
    }
  } else {
    const patientId = existingPatient.id;
    if (!currentUser.doctor.id) throw new Error('User is not a doctor');

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

      // Send email
      try {
        console.log('Will try to send 💌');
        sendTemplatedEmail({
          templateAlias: 'pt-dr-added-patient',
          templateModel: {
            actionUrl: `${process.env.FRONTEND_URL}/doctors?doctorId=${currentUser.doctor.id}`,
            doctorFirstName: currentUser.firstName,
            doctorLastName: currentUser.lastName,
            patientFirstName: firstName,
          },
          to: email,
        });
      } catch (error) {
        console.log('createHealthCard - error', error);
      }

      return patientInCare;
    } catch (error) {
      console.log('GOT A error', error);
    }
  }
};
