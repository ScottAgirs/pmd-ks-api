import { KeystoneContext } from "@keystone-6/core/types";

export interface CreateEventBookingInput {
  eventId: string,
  notes: string,
  startsAt: string,
}

export const createCalendarEventBooking = async (
  context: KeystoneContext,
  {
    eventId,
    notes,
    startsAt,
  }: CreateEventBookingInput
  // TODO: [TypeScript] Add type for `Promise`
): Promise<any> => {
  if (!eventId) {
    throw new Error("eventId is required");
  }

  // Check user is logged in
  const user = context.session?.data;
  const userId = user.id;

  if (!userId) {
    throw new Error('User not logged in');
  }

  // Check event exists
  const event = await context.db.CalendarEvent.findOne({
    where: {
      id: eventId,
    },
  })
  if (!event) {
    throw new Error('event not found')
  }
  console.log('event', event);


  // return { ...stepperStepProg, stepper, stepperProg };
}