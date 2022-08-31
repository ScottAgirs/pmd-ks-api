/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { DRUG_INGREDIENTS } from './ingredients';

export async function populateIngredients(context: any) {
  const ingredientDB = context.db.ActiveIngredient;

  console.log(`----------------------------------------`);
  console.log(
    `🌱 Seeding [${DRUG_INGREDIENTS.length}] Doctor DRUG_PRODUCTS_REDUCED`
  );
  console.log(`----------------------------------------`);

  const createMedIng = async (ingData: any) => {
    // const medIngExists = existingIngredients.find(
    //   (ing: any) => ing.ingredientName === ingData.ingredientName
    // );

    let existing;
    try {
      existing = await ingredientDB.findMany({
        where: {
          drugCode: { equals: ingData.drugCode.toString() },
          ingredientName: { equals: ingData.ingredientName },
          medication: null,
          strengthUnit: { equals: ingData.strengthUnit },
          strengthValue: { equals: ingData.strengthValue },
        },
      });
    } catch (error: any) {
      console.log('❌ error find existing', error.message);
    }

    const existingIngredient = existing[0];

    if (existingIngredient) {
      console.log(`⭕ ${ingData.drugCode} Already exists ${ingData.brandName}`);
    } else {
      await ingredientDB
        .createOne({
          data: {
            ...ingData,
            drugCode: ingData.drugCode.toString(),
          },
        })
        .then((med: any) => {
          console.log(`🟢 ${med.drugCode} Added as ${med.ingredientName}`);
        })
        .catch((err: any) => {
          console.log(
            `🔴 ${ingData.drugCode} Failed to add ${ingData.ingredientName}`
          );
          console.log(err);
        });
    }
  };

  for (const med of DRUG_INGREDIENTS) {
    console.log(`💊 Adding ingredient: ${med.ingredientName}`);

    await createMedIng(med);
  }
}

// export async function populateIngredients(keystone: any) {
//   const activeIngredientDB = keystone.db.ActiveIngredient;

//   try {
//     console.log(`----------------------------------------`);
//     console.log(
//       `🌱 Seeding [${DRUG_INGREDIENTS.length}] DRUG_INGREDIENTS`
//     );
//     console.log(`----------------------------------------`);

//     for (const drugIng of DRUG_INGREDIENTS) {
//       console.log(`⚪ Adding ${drugIng.drugCode}`);

//       let existing;
//       try {
//         existing = await activeIngredientDB.findMany({
//           query: 'id drugCode',
//           where: {
//             drugCode: { equals: drugIng.drugCode.toString() },
//             ingredientName: { equals: drugIng.ingredientName },
//             medication: null,
//             strengthUnit: { equals: drugIng.strengthUnit },
//             strengthValue: { equals: drugIng.strengthValue },
//           },
//         });
//       } catch (error: any) {
//         console.log('❌ error find existing', error.message);
//       }

//       const existingIngredient = existing[0];

//       // eslint-disable-next-line no-continue
//       if (existingIngredient) continue;

//       try {
//         await activeIngredientDB.createOne({
//           data: {
//             ...drugIng,
//             drugCode: drugIng.drugCode.toString(),
//           },
//         });
//       } catch (error: any) {
//         console.log('❌ error drugCode', drugIng.drugCode, error.message);
//         // eslint-disable-next-line no-continue
//         continue;
//       }
//     }
//     console.log(`🎉 Seeded [${DRUG_INGREDIENTS.length}] 💊 🌳`);
//   } catch (error: any) {
//     console.error('populate DRUG_INGREDIENTS :: error', error.message);
//   }
// }
