/* eslint-disable @typescript-eslint/no-explicit-any */
import momentTz from 'moment-timezone';
import { KeystoneContext } from '@keystone-6/core/types';
import { sendTemplatedEmail } from '../../../lib/email/sendEmail';
import { getCurrentUser } from '../../user/services/getCurrentUser';

export interface CreateEventBookingInput {
  eventId: string;
  reason: string;
  startsAt: string;
  tzTarget: string;
}

export const createCalendarEventBooking = async (
  _: any,
  { eventId, reason, tzTarget, startsAt }: CreateEventBookingInput,
  context: KeystoneContext
): Promise<any> => {
  if (!eventId) {
    throw new Error('eventId is required');
  }

  const utcStartsAt = momentTz(startsAt as string);
  const displayApptDate = utcStartsAt.tz(tzTarget).format('MMM D, YYYY, HH:mm');

  // Check user is logged in
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    patientId: currentUserPatientId,
    ...currentUser
  } = await getCurrentUser(context);

  if (!currentUser) {
    throw new Error('User not logged in');
  }

  // Check event exists
  const event = (await context.db.CalendarEvent.findOne({
    where: {
      id: eventId,
    },
  })) as any;

  let doctorUser;
  try {
    const matched = (await context.db.User.findMany({
      where: {
        doctor: { id: { equals: event.doctorId } },
      },
    })) as any;

    // eslint-disable-next-line prefer-destructuring
    doctorUser = matched[0];
  } catch (error: any) {
    throw new Error(error);
  }

  if (!event) {
    throw new Error('event not found');
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
              status: 'OPEN',
            },
          },
          doctor: {
            connect: {
              id: event.doctorId,
            },
          },
          event: {
            connect: {
              id: eventId,
            },
          },
          notes: {
            create: {
              title: '',
            },
          },
          patient: {
            connect: {
              id: currentUserPatientId,
            },
          },
          prescription: {
            create: {
              doctor: {
                connect: {
                  id: event.doctorId,
                },
              },
              patient: {
                connect: {
                  id: currentUserPatientId,
                },
              },
            },
          },
          reason,
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

  if (!createdBooking.id) throw new Error('Failed to create a booking');

  sendTemplatedEmail({
    from: 'no-reply@pocketmd.ca',
    to: doctorUser.email,
    // eslint-disable-next-line sort-keys
    templateAlias: 'dr-new-booking',
    templateModel: {
      displayApptDate,
      doctorApptDetailsUrl: `${process.env.FRONTEND_URL}/doctor/appointments/upcoming?bookingId=${createdBooking.id}`,
      doctorFirstName: doctorUser.firstName,
      patientFirstName: currentUser.firstName,
    },
  });
  sendTemplatedEmail({
    from: 'no-reply@pocketmd.ca',
    to: currentUser.email,
    // eslint-disable-next-line sort-keys
    templateAlias: 'pt-new-booking',
    templateModel: {
      displayApptDate,
      doctorFirstName: doctorUser.firstName,
      patientApptDetailsUrl: `${process.env.FRONTEND_URL}/appointments/upcoming?bookingId=${createdBooking.id}`,
      patientFirstName: currentUser.firstName,
    },
  });

  try {
    // Check if doctor has requested this appointment
    const matchedAppointmentRequests =
      (await context.db.AppointmentRequest.findMany({
        where: {
          doctor: { id: { equals: event.doctorId } },
          event: { id: { equals: event.id } },
          patient: { id: { equals: currentUserPatientId } },
        },
      })) as any;

    if (matchedAppointmentRequests?.length > 0) {
      const appointmentRequest = matchedAppointmentRequests[0];

      // Delete appointment request
      await context.db.AppointmentRequest.deleteOne({
        where: {
          id: appointmentRequest.id,
        },
      });
    }
  } catch (error) {
    // TODO: [HIGH] Log error to Sentry
    throw new Error(error as any);
  }

  return createdBooking;
};
