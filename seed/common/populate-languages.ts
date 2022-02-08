import { SUPPORTED_LANGUAGES } from "./languages";

export async function populateLanguages(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Seeding [${SUPPORTED_LANGUAGES.length}] Languages`);
    console.log(`----------------------------------------`);

    for (const language of SUPPORTED_LANGUAGES) {
      console.log(` 👨🏼‍⚕️ Adding [${language.label}] Language`);

      try {
        await keystone.db.Language.createOne({
          data: language
        });
      } catch (error) {
        throw new Error(`Error creating language [${language.label}]`);
      }
    }

    console.log(`✅ Seeded [${SUPPORTED_LANGUAGES.length}] Languages 🌳`);
  } catch (error) {
    console.error('populateLanguages :: error', error);
  }
}
