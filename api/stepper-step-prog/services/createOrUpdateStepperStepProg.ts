import { KeystoneContext } from "@keystone-6/core/types";

export interface CreateOrUpdateStepperStepProgInput {
  isCompleted: boolean,
  stepId: string,
  user: object,
}

export const createOrUpdateStepperStepProg = async (
  context: KeystoneContext,
  {
    isCompleted,
    stepId,
    user,
  }: CreateOrUpdateStepperStepProgInput
  // TODO: [TypeScript] Add type for `Promise`
): Promise<any> => {
  console.log("GOT IN");
  console.log('createOrUpdateStepperStepProg :: params', {isCompleted, stepId, user});
}