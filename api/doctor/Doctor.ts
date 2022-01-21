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
    appointments: relationship({ ref: 'Appointment.doctor' }),
    bookings: relationship({ ref: 'Booking.doctor', many: true }),
    calendarEvents: relationship({ ref: 'CalendarEvent.doctor', many: true }),
    // TODO: doctorSpecializations
    doctorSince: timestamp({ validation: { isRequired: true } }),
    doctorSpecialty: relationship({ ref: 'DoctorSpecialty.doctors' }),
    doctorSubSpecialties: relationship({ ref: 'DoctorSubSpecialty.doctors', many: true }),
    email: text(),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    languages: relationship({ ref: 'DoctorLanguage.doctors', many: true }),
    patients: relationship({ ref: 'Patient.visitedDoctors', many: true }),
    prescriptions: relationship({ ref: 'Prescription.doctor', many: true }),
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