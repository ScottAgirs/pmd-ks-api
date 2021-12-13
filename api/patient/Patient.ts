import { checkbox, relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const Patient = list({
  fields: {
    bookings: relationship({ ref: 'Booking.patient', many: true }),
    name: text(),
    isConfirmed: checkbox(),
    user: relationship({ ref: 'User.patient', many: false }),
  },
})