import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";
import { afterCreateDoctor } from "./hooks/afterCreateDoctor";
import { KeystoneContext, OrderByFieldInputArg } from "@keystone-6/core/types";

const { list } = require("@keystone-6/core");

interface AfterCreateItemArgs {
  context: KeystoneContext;
  item: any;
  operation: string;
}

export const Doctor = list({
  fields: {
    user: relationship({ ref: 'User.doctor' }),
    appointments: relationship({ ref: 'Appointment.doctor', many: true  }),
    billings: relationship({ ref: 'AppointmentBilling.doctor', many: true }),
    bookings: relationship({ ref: 'Booking.doctor', many: true }),
    calendarEvents: relationship({ ref: 'CalendarEvent.doctor', many: true }),
    clinicAddress: relationship({ ref: 'Address.doctorClinic' }),
    clinicName: text(),
    clinicPhoneNumber: text(),
    clinicFaxNumber: text(),
    clinicFMN: text(),
    clinicSLI: text(),
    clinicOHIPBillingCode: text(),
    // TODO: doctorSpecializations
    // TODO: contractSignedOn time must be max 1 hour in the future and min 15 mins in the past
    contractSignedOn: timestamp(),
    doctorSince: timestamp({ validation: { isRequired: true } }),
    doctorSpecialty: relationship({ ref: 'DoctorSpecialty.doctors' }),
    doctorSubSpecialties: relationship({ ref: 'DoctorSubSpecialty.doctors', many: true }),
    email: text(),
    forms: relationship({ ref: 'Form.doctor', many: true }),
    insurancePolicyNumber: text(),
    insuranceProvider: text(),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    languages: relationship({ ref: 'Language.doctors', many: true }),
    licensedBy: text(),
    licenseNumber: text(),
    patients: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    prescriptions: relationship({ ref: 'Prescription.doctor', many: true }),
    province: text(),
    summary: text(),
    savedByPatients: relationship({ ref: 'Patient.savedDoctors', many: true }),
  },
  hooks: {
    afterOperation: async ({ context, item, operation }:AfterCreateItemArgs) => {
      if (operation === 'create') {
        afterCreateDoctor({ context, item })
      }
    },
    // beforeOperation: async ({ context, item, operation }) => {
    //   if (operation === 'create') {
    //     // beforeCreateUser({ context, item })
    //   }
    // }
  },
}) 