/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { DRUG_INGREDIENTS_REDUCED } from './ingredients-reduced';

export async function populateIngredients(keystone: any) {
  const activeIngredientDB = keystone.db.ActiveIngredient;

  try {
    console.log(`----------------------------------------`);
    console.log(
      `🌱 Seeding [${DRUG_INGREDIENTS_REDUCED.length}] DRUG_INGREDIENTS_REDUCED`
    );
    console.log(`----------------------------------------`);

    for (const drugIng of DRUG_INGREDIENTS_REDUCED) {
      console.log(`⚪ Adding ${drugIng.drugCode}`);

      let existing;
      try {
        existing = await activeIngredientDB.findMany({
          query: 'id drugCode',
          where: {
            drugCode: { equals: drugIng.drugCode.toString() },
            ingredientName: { equals: drugIng.ingredientName },
            medication: null,
            strengthUnit: { equals: drugIng.strengthUnit },
            strengthValue: { equals: drugIng.strengthValue },
          },
        });
      } catch (error: any) {
        console.log('❌ error find existing', error.message);
      }

      const existingIngredient = existing[0];

      // eslint-disable-next-line no-continue
      if (existingIngredient) continue;

      try {
        await activeIngredientDB.createOne({
          data: {
            ...drugIng,
            drugCode: drugIng.drugCode.toString(),
          },
        });
      } catch (error: any) {
        console.log('❌ error drugCode', drugIng.drugCode, error.message);
        // eslint-disable-next-line no-continue
        continue;
      }
    }
    console.log(`🎉 Seeded [${DRUG_INGREDIENTS_REDUCED.length}] 💊 🌳`);
  } catch (error: any) {
    console.error('populate DRUG_INGREDIENTS_REDUCED :: error', error.message);
  }
}
