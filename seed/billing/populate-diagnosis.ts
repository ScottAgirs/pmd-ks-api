/* eslint-disable no-restricted-syntax */
import { BILLING_DIAGNOSIS } from './diagnosis';

export async function populateDiagnosis(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(
      `🌱 Seeding [${BILLING_DIAGNOSIS.length}] Doctor BILLING_DIAGNOSIS`
    );
    console.log(`----------------------------------------`);

    for (const billDiagnosis of BILLING_DIAGNOSIS) {
      console.log(` 💉 Adding [${billDiagnosis.code}] billDiagnosis`);

      let existing;
      try {
        // eslint-disable-next-line no-await-in-loop
        existing = await keystone.db.BillingDiagnosis.findMany({
          where: {
            code: { equals: billDiagnosis.code.toString() },
            description: { equals: billDiagnosis.description },
          },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      if (existing.length > 0) {
        console.log(
          ` 💀 billDiagnosis [${billDiagnosis.code}] already exists - skipping.`
        );
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.BillingDiagnosis.createOne({
            data: {
              ...billDiagnosis,
              code: billDiagnosis.code.toString(),
            },
          });
        } catch (error: any) {
          console.log('❌ error code', billDiagnosis.code);
          console.log('❌ error claim: ', billDiagnosis.description);
          throw new Error(error);
        }
      }
    }
    console.log(
      `✅ Seeded [${BILLING_DIAGNOSIS.length}] Doctor BILLING_DIAGNOSIS 🌳`
    );
  } catch (error) {
    console.error('populate BILLING_DIAGNOSIS :: error', error);
  }
}
