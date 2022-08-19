import { SUB_SPECIALTIES } from "./sub-specialties";

export async function populateSubSpecialties(keystone: any) {
  try {
    console.log(
      `🌱 Seeding [${SUB_SPECIALTIES.length}] Doctor Sub-Specialties`
    );

    for (const subSpecialty of SUB_SPECIALTIES) {
      console.log(` 👨🏼‍⚕️ Adding [${subSpecialty.label}] Sub-Specialty`);

      const existing = await keystone.db.DoctorSubSpecialty.findOne({
        where: { value: subSpecialty.value },
      });
      if (existing) {
        console.log(
          ` 💀 Sub-Specialty [${subSpecialty.label}] already exists - skipping.`
        );
      } else {
        try {
          await keystone.db.DoctorSubSpecialty.createOne({
            data: subSpecialty,
          });
        } catch (error) {
          throw new Error(
            `Error creating Sub-subSpecialty [${subSpecialty.label}]`
          );
        }
      }
    }
    console.log(
      `✅ Doctor Sub-Specialties Seeded with ${SUB_SPECIALTIES.length} items`
    );
  } catch (error) {
    console.error("populateSubSpecialties :: error", error);
  }
}
