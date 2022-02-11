import { checkbox, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const AppointmentBilling = list({
  fields: {
    appointment: relationship({ ref: 'Appointment.billing' }),
    doctor: relationship({ ref: 'Doctor.billings' }),
    // clinic: relationship({ ref: 'Clinic.billing' }),
    billingItems: relationship({ ref: 'AppointmentBillingItem.billing', many: true }),
    status: text(),
  },
}) 