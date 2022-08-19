/* eslint-disable no-console */
import { DRUG_PRODUCTS } from './products';

export async function populateProducts(keystone: any) {
  const medDB = keystone.db.Medication;

  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS`);
    console.log(`----------------------------------------`);

    DRUG_PRODUCTS.forEach(async (medDrugProd, i) => {
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
          `${i}/${DRUG_PRODUCTS.length} ⭕ ${medDrugProd.drugCode} Already exists ${existing.brandName}`
        );
      } else {
        console.log(
          `${i}/${DRUG_PRODUCTS.length} 🟢 ${medDrugProd.drugCode} will ADD ${medDrugProd.brandName}`
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

    console.log(`✅ Seeded [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS 🌳`);
  } catch (error) {
    console.error('populate DRUG_PRODUCTS :: error', error);
  }
}
