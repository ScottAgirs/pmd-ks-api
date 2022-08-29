import { BaseItem, KeystoneContext } from '@keystone-6/core/types';

interface AfterCreateDoctorInput {
  context: KeystoneContext;
  item: BaseItem;
}
// TODO: [TypeScript] Add context interface
export const afterCreateDoctor = async ({
  context,
  item: doctor,
}: AfterCreateDoctorInput) => {
  if (!doctor) throw new Error('Failed to create User Doctor doctor.');

  const userQuery = context.query.User;

  // This account for when we're Seeding as doctor.userId in afterCreate for some reason doesn't appear right away.
  if (!doctor.userId) return null;

  const user = await userQuery.findOne({
    where: { id: doctor.userId as string },
    // eslint-disable-next-line sort-keys
    query: 'id firstName lastName doctor { id } patient { id }',
  });

  const doctorId = user.doctor.id;

  let createdCalendar = { id: null };
  let calendarId;
  try {
    createdCalendar = await context.db.Calendar.createOne({
      data: {
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        name: `${user.firstName}'s Calendar`,
      },
    });
    calendarId = createdCalendar.id;
  } catch (error) {
    console.log('Calendar.createOne :: error', error);
  }

  try {
    await context.db.Schedule.createOne({
      data: {
        calendar: {
          connect: {
            id: calendarId,
          },
        },
        defaultOn: {
          connect: {
            id: calendarId,
          },
        },
        title: `${user.firstName}'s Work Hours`,
        tz: 'America/Toronto',
      },
    });
  } catch (error) {
    console.log('Schedule.createOne :: error', error);
  }

  // try {
  //   await context.db.Address.createOne({ data: {
  //     doctorClinic: {
  //       connect: {
  //         id: doctorId
  //       }
  //     }
  //   }})
  // } catch (error) {
  //   console.log('Address.createOne :: error', error);
  // }

  try {
    const sharedCreateCalendarEventParams = {
      calendar: {
        connect: {
          id: calendarId,
        },
      },
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      durationMins: 15,
      isConfirmationRequired: false,
    };

    const eventTypes = await context.db.CalendarEventType.findMany();
    const createdCalendarEventsData = eventTypes.map(eventType => ({
      ...sharedCreateCalendarEventParams,
      description: `${eventType.label} appointment with Dr. ${user.firstName} ${user.firstName}`,
      eventType: {
        connect: {
          id: eventType.id,
        },
      },
      title: eventType.label,
    }));

    try {
      await context.db.CalendarEvent.createMany({
        data: createdCalendarEventsData,
      });
    } catch (error) {
      console.log('CalendarEvent.createMany :: error', error);
    }
  } catch (error) {
    console.log('CalendarEvent.createMany :: error', error);
  }
};
