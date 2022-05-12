import {
  checkbox,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { afterCreateDoctor } from "./hooks/afterCreateDoctor";
import { KeystoneContext } from "@keystone-6/core/types";

const { list } = require("@keystone-6/core");

interface AfterCreateItemArgs {
  context: KeystoneContext;
  item: any;
  operation: string;
}

export const Doctor = list({
  fields: {
    clinicName: text(),
    clinicPhoneNumber: text(),
    clinicFaxNumber: text(),
    clinicFMN: text(),
    clinicSLI: text(),
    clinicOHIPBillingCode: text(),
    // TODO: doctorSpecializations
    calendar: relationship({ ref: "Calendar.doctor" }),
    // TODO: contractSignedOn time must be max 1 hour in the future and min 15 mins in the past
    contractSignedOn: timestamp(),
    doctorSince: timestamp({ validation: { isRequired: true } }),
    email: text(),
    isCompleteProfile: checkbox(),
    isVerified: checkbox(),
    licenseNumber: text(),
    licenseProvider: text(),
    medicalLiabilityProvider: text(),
    medicalLiabilityNumber: text(),
    province: text(),
    summary: text(),
    // Links
    appointments: relationship({ ref: "Appointment.doctor", many: true }),
    billings: relationship({ ref: "AppointmentBilling.doctor", many: true }),
    bookings: relationship({ ref: "Booking.doctor", many: true }),
    calendarEvents: relationship({ ref: "CalendarEvent.doctor", many: true }),
    clinicAddress: relationship({ ref: "Address.doctorClinic" }),
    doctorSpecialty: relationship({ ref: "DoctorSpecialty.doctors" }),
    doctorSubSpecialties: relationship({
      ref: "DoctorSubSpecialty.doctors",
      many: true,
    }),
    forms: relationship({ ref: "Form.doctor", many: true }),
    languages: relationship({ ref: "Language.doctors", many: true }),
    patients: relationship({ ref: "Patient.visitedDoctors", many: true }),
    prescriptions: relationship({ ref: "Prescription.doctor", many: true }),
    proofOfIdentification: relationship({
      ref: "ProofOfIdentification.doctor",
    }),
    proofOfInsurance: relationship({ ref: "ProofOfInsurance.doctor" }),
    proofOfLicense: relationship({ ref: "ProofOfLicense.doctor" }),
    savedByPatients: relationship({ ref: "Patient.savedDoctors", many: true }),
    user: relationship({ ref: "User.doctor" }),
  },
  hooks: {
    afterOperation: async ({
      context,
      item,
      operation,
    }: AfterCreateItemArgs) => {
      if (operation === "create") {
        afterCreateDoctor({ context, item });
      }
    },
  },
});
