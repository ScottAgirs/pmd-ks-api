import { relationship, text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const CalendarEventType = list({
  fields: {
    label: text({ validation: { isRequired: true } }),
    value: text({
      isIndexed: 'unique',
      validation: { isRequired: true },
    }),
    // eslint-disable-next-line sort-keys
    events: relationship({ many: true, ref: 'CalendarEvent.eventType' }),
  },
});
