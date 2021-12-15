import { BaseItem, KeystoneContext } from "@keystone-6/core/types";

const requiredPatientFields = [
  // @TODO: [ONBOARDING] Add required address field
  // 'address',
  'user',
  'healthCards',
  'emergencyContacts',
];
const requiredPatientUserProfileFields = [
  'dateOfBirth',
  'firstName',
  'lastName',
  'email',
  'sex',
  // Address
  'administrativeArea',
  'postalCode',
];

export const completePatientOnboarding = async (
    context: KeystoneContext,
    stepperStepProg: any,
  ) => {
  const patientUser = stepperStepProg.user;
  console.log('patientUser', patientUser);

  if (stepperStepProg?.stepper?.slug === 'patient') {
    const userId = patientUser.id;

    const patientDB = context.db.Patient;
    const userMatchedPatients = await patientDB.findMany({ 
      where: {
        user: {
          id: { equals: userId },
        }
      }
    });

    const patient = userMatchedPatients.length > 0 ? userMatchedPatients[0] : null;

    if (!patient) {
      throw new Error('Patient not found');
    }
    
    console.log('patient', patient);
    const patientId = patient.id;

    let isCompleteProfile = true;

    // check if patient has all the required fields
    requiredPatientFields.forEach(field => {
      if (patient[field] === null) {
        console.warn('patient[field]', `${field} is missing.`);
        isCompleteProfile = false;
      }
    });

    // check if patient user profile has all the required fields
    requiredPatientUserProfileFields.forEach(field => {
      if (patientUser[field] === null) {
        console.warn('patient user profile[field]', `${field} is missing.`);
        isCompleteProfile = false;
        throw new Error(`Patient user profile is missing required field: ${field}`);
      }
    });

    if (isCompleteProfile) {
      const completedPatient = await patientDB.updateOne({
        where: {
          id: patientId as string,
        },
        data: {
          isCompleteProfile: true,
        },
      });

      // TODO: send email to patient user

      // @TODO: Add logging
      console.log(
        `Patient's profile for user ${patientUser.username} [ID: ${patientUser.id}] is complete`
      );

      console.log('completedPatient', completedPatient);
      return completedPatient;
    }
  }
  return false;
}