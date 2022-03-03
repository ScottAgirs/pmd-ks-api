import { BaseItem, KeystoneContext } from "@keystone-6/core/types";

interface AfterCreateDoctorInput {
  context: KeystoneContext;
  item: BaseItem;
}
// TODO: [TypeScript] Add context interface
export const afterCreateDoctor = async ({ context, item: doctor }: AfterCreateDoctorInput) => {
  if (!doctor) throw new Error('Failed to create User Doctor doctor.')

  const userDB = context.db.User;

  // This account for when we're Seeding as doctor.userId in afterCreate for some reason doesn't appear right away.
  if (!doctor.userId) return null;
  
  try {
    const user = await userDB.findOne({ where: { id: doctor.userId as string } });

    const createdCalendar = await context.db.Calendar.createOne({ data: {
      name: `${user.firstName}'s Calendar`,
      user: {
        connect: {
          id: user.id
        }
      },
    }})

    await context.db.Schedule.createOne({ data: {
      title: `${user.firstName}'s Work Hours`,
      tz: "America/Toronto",
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
    
    await context.db.Address.createOne({ data: {
      doctorClinic: {
        connect: {
          id: doctor.id
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
          id: doctor.id
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
  } catch (error) {
    console.log('afterCreateDoctor :: error', doctor, error);
  }
}
