import { KeystoneContext } from "@keystone-6/core/types";
import { sendEmail } from "../../../lib/email/sendEmail";
import { getCurrentUser } from "../../user/services/getCurrentUser";

export interface CreateEventBookingInput {
  eventId: string;
  reason: string;
  startsAt: string;
  tzTarget: string;
}

export const createCalendarEventBooking = async (
  root: any,
  { eventId, reason, tzTarget, startsAt }: CreateEventBookingInput,
  context: KeystoneContext
): Promise<any> => {
  if (!eventId) {
    throw new Error("eventId is required");
  }

  // Check user is logged in
  const {
    patientId: currentUserPatientId,
    userId,
    ...user
  } = await getCurrentUser(context);

  if (!user) {
    throw new Error("User not logged in");
  }

  // Check event exists
  const event = await context.db.CalendarEvent.findOne({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    throw new Error("event not found");
  }

  const createdBooking = await context.db.Booking.createOne({
    data: {
      appointment: {
        // TODO: [performance] can be improved by creating in afterCreate hook
        create: {
          billing: {
            create: {
              doctor: {
                connect: {
                  id: event.doctorId,
                },
              },
              status: "OPEN",
            },
          },
          doctor: {
            connect: {
              id: event.doctorId,
            },
          },
          notes: {
            create: {
              title: "",
            },
          },
          patient: {
            connect: {
              id: currentUserPatientId,
            },
          },
          reason,
          prescription: {
            create: {
              patient: {
                connect: {
                  id: currentUserPatientId,
                },
              },
              doctor: {
                connect: {
                  id: event.doctorId,
                },
              },
            },
          },
          vitalsData: {
            create: {
              resp: 0,
            },
          },
        },
      },
      calendar: {
        connect: {
          id: event.calendarId,
        },
      },
      doctor: {
        connect: {
          id: event.doctorId,
        },
      },
      durationMins: event.durationMins,
      event: {
        connect: {
          id: eventId,
        },
      },
      // TODO: Implement isConfirmed
      // isConfirmed: false,
      // endsAt, // @TODO: See above to calculate
      patient: {
        connect: {
          id: currentUserPatientId,
        },
      },
      startsAt,
      tzTarget,
    },
  });

  if (!createdBooking.id) throw new Error("Failed to create a booking");

  // sendEmail({
  //   from:{
  //     email:"test@pocketmd.ca",
  //     name:"PocketMD Tester"
  //   },
  //   to:"scott.agirs@gmail.com",
  //   subject:"Test suvjest",
  //   text:"Test text",
  // })

  return createdBooking;
};
