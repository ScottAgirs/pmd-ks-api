import { SPECIALTIES } from "./specialties";

export async function populateSpecialties(keystone: any) {
  console.log(`🌱 Inserting Doctor Specialties Data: ${SPECIALTIES.length} items`);

  for (const specialty of SPECIALTIES) {
    console.log(` 👨🏼‍⚕️ Adding [${specialty.label}] Specialty`);
    const createdSpecialty = await keystone.db.DoctorSpecialty.createOne({
      data: specialty
    });
    console.log(` 👨🏼‍⚕️ ✅ Created [${createdSpecialty.label}]`);
  }
  console.log(`✅ Doctor Specialties Seeded with ${SPECIALTIES.length} items`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}
