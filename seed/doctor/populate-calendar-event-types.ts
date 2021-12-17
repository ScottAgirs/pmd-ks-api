import { CALENDAR_EVENT_TYPES } from "./calendarEventTypes";

export async function populateCalendarEventTypes(keystone: any) {
  console.log(`----------------------------------------`);
  console.log(`🌱 Inserting Calendar Event Types. Total ${CALENDAR_EVENT_TYPES.length} items`);
  console.log(`----------------------------------------`);

  for (const eventType of CALENDAR_EVENT_TYPES) {
    console.log(` 🗓️ Adding [${eventType.label}] Event Type`);
    const createdEventType = await keystone.db.CalendarEventType.createOne({
      data: eventType
    });
    console.log(` 🗓️ ✅ Created [${createdEventType.label}]`);
  }
  console.log(`✅ Calendar Event Types Seeded with ${CALENDAR_EVENT_TYPES.length} items`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}
