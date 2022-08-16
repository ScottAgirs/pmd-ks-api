/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { DRUG_INGREDIENTS } from './ingredients';

export async function populateIngredients(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${DRUG_INGREDIENTS.length}] DRUG_INGREDIENTS`);
    console.log(`----------------------------------------`);

    for (const drugIng of DRUG_INGREDIENTS) {
      console.log(` 💉 Adding [${drugIng.drugCode}] drugIng`);

      let existing;
      try {
        // eslint-disable-next-line no-await-in-loop
        existing = await keystone.query.ActiveIngredient.findMany({
          query: 'id drugCode medication { id }',
          where: {
            drugCode: { equals: drugIng.drugCode.toString() },
            ingredientName: { equals: drugIng.ingredientName },
            strengthUnit: { equals: drugIng.strengthUnit },
            strengthValue: { equals: drugIng.strengthValue },
          },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      console.log('🚀 ~ ~ existing', existing[0]);

      const hasMedicationToDrugCode =
        // eslint-disable-next-line no-await-in-loop
        await keystone.db.Medication.findOne({
          where: {
            drugCode: drugIng.drugCode.toString(),
          },
        });

      console.log('🚀 ~  hasMedicationToDrugCode', existing);
      if (hasMedicationToDrugCode && existing[0]?.medication)
        console.log('✅ Has related MED');

      console.log('⚙️ CONNECTING TO MED');
      if (
        existing.length > 0 &&
        hasMedicationToDrugCode &&
        !existing[0]?.medication
      ) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.ActiveIngredient.updateOne({
            where: {
              id: existing[0].id,
            },
            // eslint-disable-next-line sort-keys
            data: {
              medication: {
                connect: {
                  drugCode: drugIng.drugCode.toString(),
                  // drugCode: '98340',
                },
              },
            },
          });
          console.log('✅ CONNECTED TO MED : ', drugIng.drugCode);
        } catch (error: any) {
          console.log('❌ CONNECT TO MED : error drugCode', drugIng.drugCode);
          console.log('❌ CONNECT TO MED : error dIN', drugIng.ingredientName);
          throw new Error(error);
        }
      } else {
        console.log('⚙️ existing[0]', existing[0]);
      }

      if (existing?.length > 0) {
        console.log(` 💀 drugIng [${drugIng.drugCode}] exists - skipping.`);
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.ActiveIngredient.createOne({
            data: {
              ...drugIng,
              drugCode: drugIng.drugCode.toString(),
            },
          });
        } catch (error: any) {
          console.log('❌ error drugCode', drugIng.drugCode);
          console.log('❌ error dIN', drugIng.ingredientName);
          throw new Error(error);
        }
      }
    }
    console.log(
      `✅ Seeded [${DRUG_INGREDIENTS.length}] Doctor DRUG_INGREDIENTS 🌳`
    );
  } catch (error) {
    console.error('populate DRUG_INGREDIENTS :: error', error);
  }
}
