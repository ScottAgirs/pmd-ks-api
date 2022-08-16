/* eslint-disable no-restricted-syntax */
import { DRUG_PRODUCTS } from './products';

export async function populateProducts(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS`);
    console.log(`----------------------------------------`);

    for (const medDrugProd of DRUG_PRODUCTS) {
      console.log(` 💉 Adding [${medDrugProd.drugCode}] medDrugProd`);

      let existing;
      try {
        // eslint-disable-next-line no-await-in-loop
        existing = await keystone.db.Medication.findOne({
          where: { drugCode: medDrugProd.drugCode.toString() },
        });
      } catch (error) {
        console.log('❌ error find existing', error);
      }

      if (existing) {
        console.log(
          ` 💀 medDrugProd [${medDrugProd.drugCode}] already exists - skipping.`
        );
      } else {
        try {
          // eslint-disable-next-line no-await-in-loop
          await keystone.db.Medication.createOne({
            data: { ...medDrugProd, drugCode: medDrugProd.drugCode.toString() },
          });
        } catch (error: any) {
          console.log('❌ error drugCode', medDrugProd.drugCode);
          console.log('❌ error dIN', medDrugProd.drugIdentificationNumber);
          throw new Error(error);
        }
      }
    }
    console.log(`✅ Seeded [${DRUG_PRODUCTS.length}] Doctor DRUG_PRODUCTS 🌳`);
  } catch (error) {
    console.error('populate DRUG_PRODUCTS :: error', error);
  }
}
