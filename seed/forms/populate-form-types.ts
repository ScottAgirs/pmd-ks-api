import { KeystoneContext } from '@keystone-6/core/types';
import { FORM_TYPES } from './form-types';

export async function populateFormTypes(keystone: KeystoneContext) {
  try {
    /* eslint-disable no-console */
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${FORM_TYPES.length}] Forms`);
    console.log(`----------------------------------------`);
    /* eslint-enable no-console */

    // eslint-disable-next-line no-restricted-syntax
    for (const form of FORM_TYPES) {
      // eslint-disable-next-line no-console
      console.log(` 👨🏼‍⚕️ Adding [${form.name}] Form`);

      // eslint-disable-next-line no-await-in-loop
      const existing = await keystone.db.FormType.findOne({
        where: { slug: form.slug },
      });
      if (existing) {
        // eslint-disable-next-line no-console
        console.log(` 💾 Form [${form.slug}] already exists - skipping.`);
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.FormType.createOne({
            data: form,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }

    // eslint-disable-next-line no-console
    console.log(`✅ Seeded [${FORM_TYPES.length}] Forms 🌳`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
