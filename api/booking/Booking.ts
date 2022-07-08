import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Booking = list({
  fields: {    
    appointment: relationship({ ref: 'Appointment.booking' }),
    calendar: relationship({ ref: 'Calendar.bookings' }),
    doctor: relationship({ ref: 'Doctor.bookings' }),
    durationMins: integer({ validation: { isRequired: true } }),
    event: relationship({ ref: 'CalendarEvent.bookings' }),
    isConfirmed: checkbox(),
    name: text(),
    patient: relationship({ ref: 'Patient.bookings' }),
    startsAt: timestamp(),
    tzTarget: text(),
    endsAt: timestamp(),
  },
})