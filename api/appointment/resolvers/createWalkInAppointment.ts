/* eslint-disable @typescript-eslint/no-explicit-any */
import momentTz from 'moment-timezone';
import { KeystoneContext } from '@keystone-6/core/types';
import { getCurrentUser } from '../../user/services/getCurrentUser';

export interface CreateWalkInAppointmentInput {
  eventId: string;
  patientId: string;
  reason: string;
}

export const createWalkInAppointment = async (
  _: any,
  { eventId, patientId, reason }: CreateWalkInAppointmentInput,
  context: KeystoneContext
): Promise<any> => {
  if (!eventId) {
    throw new Error('eventId is required');
  }

  // Check user is logged in
  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  const createdWalkInAppt = await context.db.Appointment.createOne({
    data: {
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
          id: patientId,
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
              id: patientId,
            },
          },
        },
      },
      reason,
      startedAt: momentTz().toISOString(),
      vitalsData: {
        create: {
          resp: 0,
        },
      },
    },
  });

  if (!createdWalkInAppt.id)
    throw new Error('Failed to create a walk-in appointment');

  return createdWalkInAppt;
};
