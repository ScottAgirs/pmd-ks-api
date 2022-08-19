/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { DRUG_PRODUCTS_REDUCED } from './products-reduced';

export async function populateProducts(keystone: any) {
  const medDB = keystone.db.Medication;

  try {
    console.log(`----------------------------------------`);
    console.log(
      `🌱 Seeding [${DRUG_PRODUCTS_REDUCED.length}] Doctor DRUG_PRODUCTS_REDUCED`
    );
    console.log(`----------------------------------------`);

    DRUG_PRODUCTS_REDUCED.forEach(async (medDrugProd, i) => {
      let existing;
      try {
        existing = await medDB.findOne({
          where: { drugCode: medDrugProd.drugCode.toString() },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      if (existing) {
        console.log(
          `${i}/${DRUG_PRODUCTS_REDUCED.length} ⭕ ${medDrugProd.drugCode} Already exists ${existing.brandName}`
        );
      } else {
        console.log(
          `${i}/${DRUG_PRODUCTS_REDUCED.length} 🟢 ${medDrugProd.drugCode} will ADD ${medDrugProd.brandName}`
        );
        try {
          await keystone.db.Medication.createOne({
            data: { ...medDrugProd, drugCode: medDrugProd.drugCode.toString() },
          });
        } catch (error: any) {
          console.log('❌ error drugCode', medDrugProd.drugCode);
          console.log('❌ error dIN', medDrugProd.drugIdentificationNumber);
          throw new Error(error);
        }
      }
    });

    console.log(
      `✅ Seeded [${DRUG_PRODUCTS_REDUCED.length}] Doctor DRUG_PRODUCTS_REDUCED 🌳`
    );
  } catch (error) {
    console.error('populate DRUG_PRODUCTS_REDUCED :: error', error);
  }
}
