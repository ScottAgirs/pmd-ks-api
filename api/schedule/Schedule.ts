import { integer, relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const Schedule = list({
  fields: {
    // TODO: Link to bookings
    // bookings: relationship({ ref: 'Booking.schedule', many: true }),
    description: text(),
    slotInterval: integer(),
    title: text({ validation: { isRequired: true } }),
    tz: text(),
    // eslint-disable-next-line sort-keys
    calendar: relationship({ ref: 'Calendar.schedules' }),
    defaultOn: relationship({ ref: 'Calendar.defaultSchedule' }),
    recurringSlots: relationship({ many: true, ref: 'RecurringSlot.schedule' }),
  },
});
