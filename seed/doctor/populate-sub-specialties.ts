import { SUB_SPECIALTIES } from "./sub-specialties";


export async function populateSubSpecialties(keystone: any) {
  try {
    console.log(`🌱 Seeding [${SUB_SPECIALTIES.length}] Doctor Sub-Specialties`);

    for (const specialty of SUB_SPECIALTIES) {
      console.log(` 👨🏼‍⚕️ Adding [${specialty.label}] Sub-Specialty`);
      const createdSpecialty = await keystone.db.DoctorSubSpecialty.createOne({
        data: specialty
      });
    }
    console.log(`✅ Doctor Sub-Specialties Seeded with ${SUB_SPECIALTIES.length} items`);
  } catch (error) {
    console.error('populateSubSpecialties :: error', error);
  }
}