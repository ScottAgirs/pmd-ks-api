import {
  checkbox,
  relationship,
  text,
  timestamp,
} from '@keystone-6/core/fields';
import { KeystoneContext } from '@keystone-6/core/types';
import { list } from '@keystone-6/core';

import { afterCreateDoctor } from './hooks/afterCreateDoctor';

interface AfterCreateItemArgs {
  context: KeystoneContext;
  item: any;
  operation: string;
}

export const Doctor = list({
  fields: {
    clinicFMN: text(),
    clinicFaxNumber: text(),
    clinicName: text(),
    clinicOHIPBillingCode: text(),
    clinicPhoneNumber: text(),
    clinicSLI: text(),
    // TODO: doctorSpecializations
    // TODO: contractSignedOn time must be max 1 hour in the future and min 15 mins in the past
    contractSignedOn: timestamp(),
    doctorSince: timestamp(),
    email: text(),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    licenseNumber: text(),
    licenseProvider: text(),
    medicalLiabilityNumber: text(),
    medicalLiabilityProvider: text(),
    province: text(),
    summary: text(),
    // eslint-disable-next-line sort-keys
    appointmentRequests: relationship({
      many: true,
      ref: 'AppointmentRequest.doctor',
    }),
    appointments: relationship({ many: true, ref: 'Appointment.doctor' }),
    billings: relationship({ many: true, ref: 'AppointmentBilling.doctor' }),
    bookings: relationship({ many: true, ref: 'Booking.doctor' }),
    calendar: relationship({ ref: 'Calendar.doctor' }),
    calendarEvents: relationship({ many: true, ref: 'CalendarEvent.doctor' }),
    caringForPatients: relationship({
      many: true,
      ref: 'Patient.caredByDoctors',
    }),
    doctorSpecialty: relationship({ ref: 'DoctorSpecialty.doctors' }),
    doctorSubSpecialties: relationship({
      many: true,
      ref: 'DoctorSubSpecialty.doctors',
    }),
    forms: relationship({ many: true, ref: 'Form.doctor' }),
    languages: relationship({ many: true, ref: 'Language.doctors' }),
    patients: relationship({ many: true, ref: 'Patient.visitedDoctors' }),
    prescriptions: relationship({ many: true, ref: 'Prescription.doctor' }),
    proofOfIdentification: relationship({
      ref: 'ProofOfIdentification.doctor',
    }),
    proofOfInsurance: relationship({ ref: 'ProofOfInsurance.doctor' }),
    proofOfLicense: relationship({ ref: 'ProofOfLicense.doctor' }),
    savedByPatients: relationship({ many: true, ref: 'Patient.savedDoctors' }),
    user: relationship({ ref: 'User.doctor' }),
  },
  hooks: {
    afterOperation: async ({
      context,
      item,
      operation,
    }: AfterCreateItemArgs) => {
      if (operation === 'create') {
        afterCreateDoctor({ context, item });
      }
    },
  },
});
