import { KeystoneContext } from '@keystone-6/core/types';
import { FORM_GENERAL_TEST_REQ_TESTS } from './form-general-test-requisition-tests';
import { FORM_IMAGING_ULTRASOUND_TESTS } from './form-imaging-ultrasound-tests';
import { FORM_IMAGING_X_RAY_TESTS } from './form-imaging-x-ray-tests';
import { FORM_MRI_TESTS } from './form-mri-tests';
import { FORM_PUBLIC_HEALTH_TEST_REASONS } from './form-public-health-test-reasons';
import { FORM_PUBLIC_HEALTH_TEST_TESTS } from './form-public-health-test-tests';

const COMBINED_TESTS = [
  ...FORM_GENERAL_TEST_REQ_TESTS,
  ...FORM_IMAGING_ULTRASOUND_TESTS,
  ...FORM_IMAGING_X_RAY_TESTS,
  ...FORM_MRI_TESTS,
  ...FORM_PUBLIC_HEALTH_TEST_REASONS,
  ...FORM_PUBLIC_HEALTH_TEST_TESTS,
];

export async function populateFormTests(keystone: KeystoneContext) {
  try {
    /* eslint-disable no-console */
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${COMBINED_TESTS.length}] Forms`);
    console.log(`----------------------------------------`);
    /* eslint-enable no-console */

    // eslint-disable-next-line no-restricted-syntax
    for (const form of COMBINED_TESTS) {
      // eslint-disable-next-line no-console
      console.log(` 👨🏼‍⚕️ Adding test [${form.label}] Form`);

      // eslint-disable-next-line no-await-in-loop
      const matchExisting = await keystone.db.FormTest.findMany({
        where: { value: { equals: form.value } },
      });

      const existing = matchExisting.length > 0 ? matchExisting[0] : null;

      if (existing) {
        // eslint-disable-next-line no-console
        console.log(` 💾 Form [${form.value}] already exists - skipping.`);
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.FormTest.createOne({
            data: form,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }

    // eslint-disable-next-line no-console
    console.log(`✅ Seeded [${COMBINED_TESTS.length}] Forms 🌳`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
