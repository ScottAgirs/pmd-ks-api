/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export async function linkIngredients(context: any) {
  const medIngDB = context.db.ActiveIngredient;

  const linkIng = async (ingData: any) => {
    await medIngDB
      .updateOne({
        data: {
          medication: { connect: { drugCode: ingData.drugCode } },
        },
        where: { id: ingData.id },
      })
      .then((med: any) => {
        console.log(`馃煝 ${med.drugCode} linked.`);
      })
      .catch((err: any) => {
        console.log(
          `馃敶 ${ingData.drugCode} Failed to link ${ingData.ingredientName}`
        );
        console.log(err);
      });
  };

  const ingredientsWithNoMed = await medIngDB.findMany({
    where: { medication: null },
  });

  console.log(`----------------------------------------`);
  console.log(`馃敇 Will link ${ingredientsWithNoMed.length} ingredients`);
  console.log(`----------------------------------------`);

  // eslint-disable-next-line no-restricted-syntax
  for (const ing of ingredientsWithNoMed) {
    console.log(`馃拪 Adding med: ${ing.ingredientName}`);

    await linkIng(ing);
  }
}
// export async function linkIngredients(keystone: any) {
//   console.log('Got into linkIngredients');
//   const activeIngredientDB = keystone.db.ActiveIngredient;

//   try {
// const ingredients = await activeIngredientDB.findMany({
//   where: { medication: null },
// });

//     console.log(`路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路路`);
//     console.log(`路 Begin linking ${ingredients.length} ingredients to meds`);
//     console.log(`----------------------------------------`);
//     // eslint-disable-next-line no-restricted-syntax
//     for (const ing of ingredients) {
//       console.log(` 鈿? ${ing.drugCode}`);

//       const { drugCode, id } = ing;

//       try {
//         console.log('Try update:', { drugCode, id });
//         const updated = await activeIngredientDB.updateOne({
//           where: { id },
//           // eslint-disable-next-line sort-keys
//           data: { medication: { connect: { drugCode } } },
//         });

//         console.log('Updated:', updated.medicationId, updated.medication);
//         console.log('鉁? 馃煝馃煝馃煝 Linked ingredient to medication! 馃煝馃煝馃煝 鉁?');
//       } catch (error) {
//         console.log('鉂屸潓鉂? pushing ~ error', error);
//       }
//     }

//     console.log(
//       `馃帀 Linked [${DRUG_INGREDIENTS_REDUCED.length}] ingredients 馃敆`
//     );
//   } catch (error) {
//     console.error('populate DRUG_INGREDIENTS_REDUCED :: error', error);// }
