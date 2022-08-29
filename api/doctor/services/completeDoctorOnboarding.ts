/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeystoneContext } from '@keystone-6/core/types';

const requiredDoctorFields = [
  // @TODO: [ONBOARDING] Add required address field
  // 'address',
  'user',
  // TODO: [IMPORTANT] Add rest of fields
];

export const completeDoctorOnboarding = async (
  context: KeystoneContext,
  stepperStepProg: any
) => {
  const doctorUser = stepperStepProg.user;

  if (stepperStepProg?.stepper?.slug === 'doctor') {
    const userId = doctorUser.id;

    const doctorDB = context.db.Doctor;
    const userMatchedDoctors = await doctorDB.findMany({
      where: {
        user: {
          id: { equals: userId },
        },
      },
    });

    const doctor = userMatchedDoctors.length > 0 ? userMatchedDoctors[0] : null;

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const doctorId = doctor.id;

    let isCompleteProfile = true;

    // check if doctor has all the required fields
    requiredDoctorFields.forEach(field => {
      if (doctor[field] === null) {
        console.warn('doctor[field]', `${field} is missing.`);
        isCompleteProfile = false;
      }
    });

    if (isCompleteProfile) {
      const completedDoctor = await doctorDB.updateOne({
        where: {
          id: doctorId as string,
        },
        // eslint-disable-next-line sort-keys
        data: {
          isCompleteProfile: true,
        },
      });

      // TODO: send email to doctor user

      // @TODO: Add logging
      console.log(
        `Doctor's profile for user ${doctorUser.username} [ID: ${doctorUser.id}] is complete`
      );

      return completedDoctor;
    }
  }
  return false;
};
