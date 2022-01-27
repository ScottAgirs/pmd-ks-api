import { SUPPORTED_LANGUAGES } from "./languages";

export async function populateLanguages(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`🌱 Populating ${SUPPORTED_LANGUAGES.length} Languages`);
    console.log(`----------------------------------------`);

    for (const language of SUPPORTED_LANGUAGES) {
      console.log(` 👨🏼‍⚕️ Adding [${language.label}] Language`);

      const createdLanguage = await keystone.db.Language.createOne({
        data: language
      });
    }

    console.log(`✅ Languages Seeded with ${SUPPORTED_LANGUAGES.length} items`);
    console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
    // process.exit();
  } catch (error) {
    console.error('populateLanguages :: error', error);
  }
}
