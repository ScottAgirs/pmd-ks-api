import { DOCTOR_CONTRACTS } from "./contracts";

export async function populateContracts(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${DOCTOR_CONTRACTS.length}] Contracts`);
    console.log(`----------------------------------------`);

    for (const contract of DOCTOR_CONTRACTS) {
      console.log(` 👨🏼‍⚕️ Adding [${contract.name}] Contract`);



      let createdContract;
      try {
        createdContract = await keystone.db.Contract.createOne({
          data: contract
        });
      } catch (error) {
        console.error(error);
        throw new Error(`Error creating contract [${contract.name}]`);
      }
    }

    console.log(`✅ Seeded [${DOCTOR_CONTRACTS.length}] Contracts 🌳`);
  } catch (error) {
    console.error('populateContracts :: error', error);
  }
}
