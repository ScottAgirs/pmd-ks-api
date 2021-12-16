import { specialties } from "./specialties";


export async function populateSpecialties(keystone: any) {
  // Keystone API changed, so we need to check for both versions to get keystone

  console.log(`🌱 Inserting Doctor Specialties Data: ${specialties.length} items`);

  for (const specialty of specialties) {
    console.log(` 👨🏼‍⚕️ Adding [${specialty.label}] Specialty`);
    const createdSpecialty = await keystone.db.DoctorSpecialty.createOne({
      data: specialty
    });
    console.log(` 👨🏼‍⚕️ ✅ Created [${createdSpecialty.label}]`);
  }
  console.log(`✅ Doctor Specialties Seeded with ${specialties.length} items`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}