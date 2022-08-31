/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { DRUG_PRODUCTS } from './meds';

export async function populateMeds(context: any) {
  const medDB = context.db.Medication;

  console.log(`----------------------------------------`);
  console.log(`🌱 Seeding [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS`);
  console.log(`----------------------------------------`);

  const existingMedDrugCodes = await medDB.findMany();

  const createMed = async (medData: any) => {
    const medicationExists = existingMedDrugCodes.find(
      (med: any) => med.drugCode === medData.drugCode
    );
    console.log(
      `🚀 ~ file: populate-products.ts ~ line 20 ~ createMed ~ medicationExists`,
      medicationExists
    );

    if (medicationExists) {
      console.log(`⭕ ${medData.drugCode} Already exists ${medData.brandName}`);
    } else {
      await medDB
        .createOne({
          data: { ...medData, drugCode: medData.drugCode.toString() },
        })
        .then((med: any) => {
          console.log(`🟢 ${med.drugCode} Added as ${med.brandName}`);
        })
        .catch((err: any) => {
          console.log(
            `🔴 ${medData.drugCode} Failed to add ${medData.brandName}`
          );
          console.log(err);
        });
    }
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const med of DRUG_PRODUCTS) {
    console.log(`💊 Adding med: ${med.brandName}`);
    // eslint-disable-next-line no-await-in-loop
    await createMed(med);
  }
}
// export async function populateMeds(keystone: any) {
//   const medDB = keystone.db.Medication;

//   try {
//     console.log(`----------------------------------------`);
//     console.log(
//       `🌱 Seeding [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS`
//     );
//     console.log(`----------------------------------------`);

//     DRUG_PRODUCTS.forEach(async (medDrugProd, i) => {
//       let existing;
//       try {
//         existing = await medDB.findOne({
//           where: { drugCode: medDrugProd.drugCode.toString() },
//         });
//       } catch (error) {
//         console.log('❌ error find existing', error);
//       }

//       if (existing) {
//         console.log(
//           `${i}/${DRUG_PRODUCTS.length} ⭕ ${medDrugProd.drugCode} Already exists ${existing.brandName}`
//         );
//       } else {
//         console.log(
//           `${i}/${DRUG_PRODUCTS.length} 🟢 ${medDrugProd.drugCode} will ADD ${medDrugProd.brandName}`
//         );
//         try {
//           await keystone.db.Medication.createOne({
//             data: { ...medDrugProd, drugCode: medDrugProd.drugCode.toString() },
//           });
//         } catch (error: any) {
//           console.log('❌ error drugCode', medDrugProd.drugCode);
//           console.log('❌ error dIN', medDrugProd.drugIdentificationNumber);
//           throw new Error(error);
//         }
//       }
//     });

//     console.log(
//       `✅ Seeded [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS 🌳`
//     );
//   } catch (error) {
//     console.error('populate DRUG_PRODUCTS :: error', error);
//   }
// }
