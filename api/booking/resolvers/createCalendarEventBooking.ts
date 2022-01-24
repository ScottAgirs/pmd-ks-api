import { KeystoneContext } from "@keystone-6/core/types";

export interface CreateEventBookingInput {
  eventId: string,
  reason: string,
  startsAt: string,
}

export const createCalendarEventBooking = async (
  root: any, {
    eventId,
    reason,
    startsAt,
  }: CreateEventBookingInput, context:KeystoneContext
  // TODO: [TypeScript] Add type for `Promise`
): Promise<any> => {
  if (!eventId) {
    throw new Error("eventId is required");
  }

  // Check user is logged in
  const user = context.session?.data;
  if (!user) {
    throw new Error('User not logged in');
  }

  const userId = user.id;
  const currentUserPatientId = user.patient.id;
  
  // Check event exists
  const event = await context.db.CalendarEvent.findOne({
    where: {
      id: eventId,
    },
  })
  if (!event) {
    throw new Error('event not found')
  }
  
  const createdBooking = await context.db.Booking.createOne({ 
    data: {
      appointment:{
        // TODO: [performance] can be improved by creating in afterCreate hook
        create:{
          doctor:{
            connect:{
              id: event.doctorId
            }
          },
          notes: {
            create: {
              title: ""
            }
          },
          patient:{
            connect:{
              id: currentUserPatientId
            }
          },
          reason,
          prescription: {
            create: {
              patient: {
                connect: {
                  id: currentUserPatientId
                },
              },
              doctor: {
                connect: {
                  id: event.doctorId
                }
              },
            }
          },
          vitalsData: {
            create: {
              resp: 0
            }
          }
        }
      },
      calendar: {
        connect: {
          id: event.calendarId,
        }
      },
      doctor: {
        connect: {
          id: event.doctorId,
        }
      },
      durationMins: event.durationMins,
      event: {
        connect: {
          id: eventId,
        }
      },
      // TODO: Implement isConfirmed
      // isConfirmed: false,
      // endsAt, // @TODO: See above to calculate
      patient: {
        connect: {
          id: currentUserPatientId,
        }
      },
      startsAt,
    },
  });
  console.log('createdBooking', createdBooking);

  return createdBooking;
}