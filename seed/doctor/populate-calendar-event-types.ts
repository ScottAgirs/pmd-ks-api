import { CALENDAR_EVENT_TYPES } from "./calendarEventTypes";

export async function populateCalendarEventTypes(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(
      `🌱 Seeding [${CALENDAR_EVENT_TYPES.length}] Calendar Event Types.`
    );
    console.log(`----------------------------------------`);

    for (const eventType of CALENDAR_EVENT_TYPES) {
      console.log(` 🗓️ Adding [${eventType.label}] Event Type`);

      const existing = await keystone.db.CalendarEventType.findOne({
        where: { value: eventType.value },
      });
      if (existing) {
        console.log(
          ` 🗓️ Event Type [${eventType.label}] already exists - skipping.`
        );
      } else {
        try {
          await keystone.db.CalendarEventType.createOne({
            data: eventType,
          });
        } catch (error) {
          throw new Error(`Error creating event type [${eventType.label}]`);
        }
      }
    }
    console.log(
      `✅ Seeded [${CALENDAR_EVENT_TYPES.length}] Calendar Event Types 🌳`
    );
  } catch (error) {
    console.error("populateCalendarEventTypes :: error", error);
  }
}
