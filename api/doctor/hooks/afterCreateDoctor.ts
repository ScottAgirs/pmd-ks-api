import { KeystoneContext } from "@keystone-6/core/types";

interface AfterCreateDoctorInput {
  context: KeystoneContext;
  item: {
    id: string,
    userId: string
  };
}
// TODO: [TypeScript] Add context interface
export const afterCreateDoctor = async ({ context, item }:AfterCreateDoctorInput) => {
  if (!item) throw new Error('Failed to create User Doctor item.')

  const userDB = context.db.User;
  const user = await userDB.findOne({ where: { id: item.userId } });

  const createdCalendar = await context.db.Calendar.createOne({ data: {
    name: `${user.firstName}'s Calendar`,
    user: {
      connect: {
        id: user.id
      }
    },
  }})

  await context.db.Schedule.createOne({ data: {
    title: `${user.firstName}'s Default Schedule`,
    calendar: {
      connect: {
        id: createdCalendar.id
      }
    },
    defaultOn: {
      connect: {
        id: createdCalendar.id
      }
    }
  }})

  const eventTypes = await context.db.CalendarEventType.findMany()

  const sharedCreateCalendarEventParams = {
    calendar: {
      connect: {
        id: createdCalendar.id
      }
    },
    doctor: {
      connect: {
        id: item.id
      }
    },
    durationMins: 15,
    isConfirmationRequired: false,
  }

  const createdCalendarEventsData = eventTypes.map(eventType => ({
    ...sharedCreateCalendarEventParams,
    eventType: {
      connect: {
        id: eventType.id
      }
    },
    title: eventType.label,
    description: `${eventType.label} appointment with Dr. ${user.firstName} ${user.firstName}`,
  }))

  await context.db.CalendarEvent.createMany({ data: createdCalendarEventsData });
}
