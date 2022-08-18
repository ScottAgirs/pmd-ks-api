/* eslint-disable no-restricted-syntax */
import { BILLING_PREMIUMS } from './premiums';

export async function populatePremiums(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${BILLING_PREMIUMS.length}] Doctor BILLING_PREMIUMS`);
    console.log(`----------------------------------------`);

    for (const billPrem of BILLING_PREMIUMS) {
      console.log(` 💸 Adding [${billPrem.feeCode}] billPrem`);

      let existing;
      try {
        // eslint-disable-next-line no-await-in-loop
        existing = await keystone.db.BillingPremium.findMany({
          where: {
            amount: { equals: billPrem.amount },
            description: { equals: billPrem.description },
            code: { equals: billPrem.code },
            feeCode: { equals: billPrem.feeCode },
          },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      if (existing.length > 0) {
        console.log(
          ` 💀 billPrem [${billPrem.code}] already exists - skipping.`
        );
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.BillingPremium.createOne({
            data: billPrem,
          });
        } catch (error: any) {
          console.log('❌ error code', billPrem.code);
          console.log('❌ error claim: ', billPrem.description);
          throw new Error(error);
        }
      }
    }
    console.log(
      `✅ Seeded [${BILLING_PREMIUMS.length}] BILLING_PREMIUMS 🌳`
    );
  } catch (error) {
    console.error('populate BILLING_PREMIUMS :: error', error);
  }
}
