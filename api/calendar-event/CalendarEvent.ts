import {
  checkbox,
  integer,
  relationship,
  text,
  timestamp,
} from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEvent = list({
  fields: {
    description: text(),
    durationMins: integer({ validation: { isRequired: true } }),
    companyName: text(),
    facilityMasterNumber: text(),
    serviceLocationIndicator: text(),
    isActive: checkbox(),
    isConfirmationRequired: checkbox(),
    title: text({ validation: { isRequired: true } }),
    address: relationship({ ref: "Address.event" }),
    appointmentRequests: relationship({ ref: 'AppointmentRequest.event' }),
    bookings: relationship({ ref: "Booking.event", many: true }),
    calendar: relationship({ ref: "Calendar.events" }),
    eventType: relationship({ ref: "CalendarEventType.events" }),
    doctor: relationship({ ref: "Doctor.calendarEvents" }),
  },
});
 