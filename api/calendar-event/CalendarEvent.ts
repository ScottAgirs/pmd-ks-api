import { checkbox, integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const CalendarEvent = list({
  fields: {
    companyName: text(),
    description: text(),
    durationMins: integer({ validation: { isRequired: true } }),
    facilityMasterNumber: text(),
    isActive: checkbox(),
    isConfirmationRequired: checkbox(),
    serviceLocationIndicator: text(),
    title: text({ validation: { isRequired: true } }),
    // eslint-disable-next-line sort-keys
    address: relationship({ ref: 'Address.event' }),
    appointmentRequests: relationship({ ref: 'AppointmentRequest.event' }),
    appointments: relationship({ many: true, ref: 'Appointment.event' }),
    bookings: relationship({ many: true, ref: 'Booking.event' }),
    calendar: relationship({ ref: 'Calendar.events' }),
    doctor: relationship({ ref: 'Doctor.calendarEvents' }),
    eventType: relationship({ ref: 'CalendarEventType.events' }),
  },
});
