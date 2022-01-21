import { relationship, text, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

const { list } = require("@keystone-6/core");

export const Appointment = list({
  fields: {
    booking: relationship({ ref: 'Booking.appointment' }),
    doctor: relationship({ ref: 'Doctor.appointments' }),
    notes: relationship({ ref: 'AppointmentNote.appointment', many: true }),
    patient: relationship({ ref: 'Patient.appointments' }),
    prescription: relationship({ ref: 'Prescription.appointment' }),
    reason: text(),
    vitalsData: relationship({ ref: 'AppointmentVital.appointment' }),
    scheduledStartsAt: timestamp(),
    scheduledEndsAt: timestamp(),
    startedAt: timestamp(),
    summaryString: text(),
    summary: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    endedAt: timestamp(),
  },
}) 