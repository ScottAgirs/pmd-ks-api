import { checkbox, integer, relationship, text, timestamp } from "@keystone-6/core/fields";

import { document } from '@keystone-6/fields-document';

const { list } = require("@keystone-6/core");

export const Calendar = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    // TODO: events
    // TODO: doctor
    // TODO: schedules
    // TODO: defaultSchedule
    // TODO: events
    // TODO: bookings
  },
}) 