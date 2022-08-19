/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { DRUG_INGREDIENTS } from './ingredients';

export async function linkIngredients(keystone: any) {
  console.log('Got into linkIngredients');
  try {
    console.log(`----------------------------------------`);
    console.log(`🔗 Linking [${DRUG_INGREDIENTS.length}] ingredients`);
    console.log(`----------------------------------------`);

    const existingMeds = await keystone.db.Medication.findMany({});
    const existingMedDrugCodes = existingMeds.map((med: any) => med.drugCode);

    const existingIngredients = await keystone.query.ActiveIngredient.findMany({
      query: 'id drugCode medication { id }',
    });

    // Remove existing ingredients that are not in the list of existingMedDrugCodes
    const filteredExistingIngredients = existingIngredients.filter(
      (ingredient: any) => !existingMedDrugCodes.includes(ingredient.drugCode)
    );

    const results = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const ing of filteredExistingIngredients) {
      console.log(` 🟢 ${ing.drugCode} exists.`);
      // console.log(`${i}/${DRUG_INGREDIENTS.length} 🟢 ${ing.drugCode} exists.`);

      const { drugCode, id } = ing;
      console.log(`Existing drugCode: ${drugCode}: [${id}]`);

      try {
        results.push(
          keystone.db.ActiveIngredient.updateOne({
            where: { id },
            // eslint-disable-next-line sort-keys
            data: { medication: { connect: { drugCode } } },
          })
        );
      } catch (error) {
        console.log('❌❌❌ pushing ~ error', error);
      }
      console.log('✅ CONNECTED TO MED');
    }

    try {
      await Promise.all(results);
    } catch (error) {
      console.log('❌❌❌ Promise all ~ error', error);
    }

    // DRUG_INGREDIENTS.forEach(async (drugIng, i) => {
    //   console.log('drugIng', drugIng.drugCode);
    //   let existing;
    //   try {
    //     console.log('Setup try');

    //     existing = await keystone.query.ActiveIngredient.findMany({
    //       query: 'id drugCode medication { id }',
    //       where: {
    //         drugCode: { equals: drugIng.drugCode.toString() },
    //         ingredientName: { equals: drugIng.ingredientName },
    //         strengthUnit: { equals: drugIng.strengthUnit },
    //         strengthValue: { equals: drugIng.strengthValue },
    //       },
    //     });

    //     console.log('Done trying');
    //   } catch (error) {
    //     console.log('❌ error find existing', error);
    //   }

    //   const activeIngredient = existing[0];
    //   if (activeIngredient)
    //     console.log(
    //       `${i}/${DRUG_INGREDIENTS.length} 🟢 ${drugIng.drugCode} exists.`
    //     );
    //   if (!activeIngredient)
    //     console.log(
    //       `${i}/${DRUG_INGREDIENTS.length} ⭕ MISSING ${drugIng.drugCode} ingredient: ${drugIng.ingredientName}`
    //     );

    //   const hasMedicationToDrugCode = await keystone.db.Medication.findOne({
    //     where: {
    //       drugCode: drugIng.drugCode.toString(),
    //     },
    //   });

    //   if (hasMedicationToDrugCode)
    //     console.log(
    //       `${i}/${DRUG_INGREDIENTS.length} ⚪ ${drugIng.drugCode} hasMedicationToDrugCode`
    //     );
    //   if (!hasMedicationToDrugCode)
    //     console.log(
    //       `${i}/${DRUG_INGREDIENTS.length} ⭕ Failed @hasMedicationToDrugCode ${drugIng.drugCode} - ${existing.brandName}`
    //     );

    //   if (existing[0]?.medication) {
    //     console.log(
    //       `${i}/${DRUG_INGREDIENTS.length} ⭕ ALREADY CONNECTED - Continue.`
    //     );
    //   }

    //   if (
    //     existing.length > 0 &&
    //     hasMedicationToDrugCode &&
    //     !existing[0]?.medication
    //   ) {
    //     console.log(`${i}/${DRUG_INGREDIENTS.length} 🟡 Set for update`);

    //     try {
    // await keystone.db.ActiveIngredient.updateOne({
    //   where: {
    //     id: activeIngredient.id,
    //   },
    //   // eslint-disable-next-line sort-keys
    //   data: {
    //     medication: {
    //       connect: {
    //         drugCode: drugIng.drugCode.toString(),
    //       },
    //     },
    //   },
    // });
    // console.log('✅ CONNECTED TO MED');
    //     } catch (error: any) {
    //       console.log('❌ CONNECT TO MED : error drugCode', drugIng.drugCode);
    //       console.log('❌ CONNECT TO MED : error dIN', drugIng.ingredientName);
    //       throw new Error(error);
    //     }
    //   } else {
    //     console.log('⚙️ existing[0]', existing[0]);
    //   }
    // });

    console.log(`✅ Linked [${DRUG_INGREDIENTS.length}] ingredients 🔗`);
  } catch (error) {
    console.error('populate DRUG_INGREDIENTS :: error', error);
  }
}
