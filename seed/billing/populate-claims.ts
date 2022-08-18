/* eslint-disable no-restricted-syntax */
import { BILLING_CLAIMS } from './claims';

export async function populateClaims(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${BILLING_CLAIMS.length}] Doctor BILLING_CLAIMS`);
    console.log(`----------------------------------------`);

    for (const billClaim of BILLING_CLAIMS) {
      console.log(` 💉 Adding [${billClaim.feeCode}] billClaim`);

      let existing;
      try {
        // eslint-disable-next-line no-await-in-loop
        existing = await keystone.db.BillingClaim.findMany({
          where: {
            description: { equals: billClaim.description },
            feeCode: { equals: billClaim.feeCode },
          },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      if (existing.length > 0) {
        console.log(
          ` 💀 billClaim [${billClaim.feeCode}] already exists - skipping.`
        );
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.BillingClaim.createOne({
            data: {
              ...billClaim,
              amount: parseInt(billClaim.amount, 10),
            },
          });
        } catch (error: any) {
          console.log('❌ error feeCode', billClaim.feeCode);
          console.log('❌ error claim: ', billClaim.description);
          throw new Error(error);
        }
      }
    }
    console.log(
      `✅ Seeded [${BILLING_CLAIMS.length}] Doctor BILLING_CLAIMS 🌳`
    );
  } catch (error) {
    console.error('populate BILLING_CLAIMS :: error', error);
  }
}
