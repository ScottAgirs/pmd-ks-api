import { SPECIALTIES } from "./specialties";

export async function populateSpecialties(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${SPECIALTIES.length}] Doctor Specialties`);
    console.log(`----------------------------------------`);

    for (const specialty of SPECIALTIES) {
      console.log(` 👨🏼‍⚕️ Adding [${specialty.label}] Specialty`);

      try {
        await keystone.db.DoctorSpecialty.createOne({
          data: specialty
        });
      } catch (error) {
        throw new Error(`Error creating specialty [${specialty.label}]`);
      }
    }
    console.log(`✅ Seeded [${SPECIALTIES.length}] Doctor Specialties 🌳`);
  } catch (error) {
    console.error('populateSpecialties :: error', error);
  }
}
