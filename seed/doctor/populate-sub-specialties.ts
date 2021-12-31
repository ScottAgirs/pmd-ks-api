import { SUB_SPECIALTIES } from "./sub-specialties";


export async function populateSubSpecialties(keystone: any) {
  try {
    console.log(`🌱 Inserting Doctor Sub-Specialties Data: ${SUB_SPECIALTIES.length} items`);

    for (const specialty of SUB_SPECIALTIES) {
      console.log(` 👨🏼‍⚕️ Adding [${specialty.label}] Sub-Specialty`);
      const createdSpecialty = await keystone.db.DoctorSubSpecialty.createOne({
        data: specialty
      });
      console.log(` 👨🏼‍⚕️ ✅ Created [${createdSpecialty.label}]`);
    }
    console.log(`✅ Doctor Sub-Specialties Seeded with ${SUB_SPECIALTIES.length} items`);
    console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
    // process.exit();
  } catch (error) {
    console.error('populateSubSpecialties :: error', error);
  }
}