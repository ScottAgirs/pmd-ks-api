import { text } from '@keystone-6/core/fields';

import { list } from '@keystone-6/core';

export const FormTest = list({
  fields: {
    label: text({
      validation: { isRequired: true },
    }),
    testFor: text({
      validation: { isRequired: true },
    }), // For example, "public-health-test", "imaging-x-ray", "imaging-ultrasound" etc.
    value: text({ isIndexed: true, validation: { isRequired: true } }),
  },
});
