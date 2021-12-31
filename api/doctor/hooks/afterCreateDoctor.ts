// TODO: [TypeScript] Add context interface
export const afterCreateDoctor = async ({ context, item }) => {
  if (!item) throw new Error('Failed to create User item.')

  const userDB = context.db.User;
  const user = await userDB.findOne({ where: { id: item.userId } });
  console.log('afterCreateDoctor :: user', user);

  const createdCalendar = await context.db.Calendar.createOne({ data: {
    name: `${user.firstName}'s Calendar`,
    user: {
      connect: {
        id: user.id
      }
    },
  }})

  const createdSchedule = await context.db.Schedule.createOne({ data: {
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
  console.log('afterCreateUser :: eventTypes', eventTypes);
  await context.db.CalendarEvent.createOne({ data: {
    durationMins: 30,
    title: "Default Event",
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
    schedule: {
      connect: {
        id: createdSchedule.id
      }
    },
    eventType: {
      connect: {
        id: eventTypes[0].id
      }
    },
  }})
}
