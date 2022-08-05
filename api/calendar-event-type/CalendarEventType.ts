import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const CalendarEventType = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({ 
      validation: { isRequired: true }, 
      isIndexed: 'unique',
    }),
    appointmentRequests: relationship({ ref: 'AppointmentRequest.eventType' }),
    events: relationship({ ref: 'CalendarEvent.eventType', many: true }),
  },
})