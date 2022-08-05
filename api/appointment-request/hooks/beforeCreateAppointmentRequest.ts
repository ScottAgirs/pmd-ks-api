import { KeystoneContext } from "@keystone-6/core/types";

interface BeforeCreateAppointmentRequestInput {
  context: KeystoneContext;
  inputData: any;
  resolvedData: {
    id?: string;
    doctor?: any;
  };
}

export const beforeCreateAppointmentRequest = async ({
  context,
  resolvedData,
}: BeforeCreateAppointmentRequestInput) => {
  const currentUser = context.session?.data;
  if (!currentUser || !currentUser.doctor?.id) 
    throw new Error("[err.intent] Must be a logged in doctor to request appointment.");

  resolvedData.doctor = { connect: { id: currentUser?.doctor?.id } };
};
