import { BaseItem, KeystoneContext } from "@keystone-6/core/types";

export interface CreateOrUpdateStepperStepProgInput {
  isCompleted: boolean,
  percentDone: number,
  stepId: string,
  user: BaseItem, // Optional can be passed in if you want to set the user explicitly
}

export const createOrUpdateStepperStepProg = async (
  context: KeystoneContext,
  {
    percentDone,
    isCompleted,
    stepId,
  }: CreateOrUpdateStepperStepProgInput
  // TODO: [TypeScript] Add type for `Promise`
): Promise<any> => {
  if (!stepId) {
    throw new Error("stepId is required");
  }

  // TODO: Check user is logged in and has access to this stepperStep
  const user = context.session?.data;
  const userId = user.id;

  if (!userId) {
    throw new Error('User not logged in');
  }

  // TODO: Check stepperStep exists
  const stepperStep = await context.db.StepperStep.findOne({
    where: {
      id: stepId,
    },
  })
  if (!stepperStep) {
    throw new Error('Step not found')
  }

  // TODO: Get Stepper
  const stepper = await context.db.Stepper.findOne({
    where: {
      id: stepperStep.stepperId as string,
    },
  });

  if (!stepper) {
    throw new Error("Stepper not found");
  }

  // TODO: Get Stepper Prog for this user and this stepperStep
  const matchedStepperProgs = await context.db.StepperProg.findMany({
    where: {
      user: { id: { equals: userId } },
      stepper: { id: { equals: stepper.id } },
    },
  })
  let stepperProg = matchedStepperProgs.length > 0 ? matchedStepperProgs[0] : null;
  
  if (!stepperProg) {
    // create new stepper prog
    stepperProg = await context.db.StepperProg.createOne({
      data: {
        name: `${user.firstName}'s Stepper Progress`,
        user: { connect: { id: userId } },
        stepper: { connect: { id: stepper.id } },
      },
    });
    console.log('CREATED stepperProg', stepperProg);
  }

  // TODO: Get Stepper Step Prog
  const matchedStepperStepProgs = await context.db.StepperStepProg.findMany({
    where: {
      stepperProg: { id: { equals: stepperProg.id } },
      stepperStep: { id: { equals: stepperStep.id } },
      user: { id: { equals: userId } },
    },
  })
  let stepperStepProg = matchedStepperStepProgs.length > 0 ? matchedStepperStepProgs[0] : null;
  
  if (!stepperStepProg) {
    // create new stepper stepperStep prog
    stepperStepProg = await context.db.StepperStepProg.createOne({
      data: {
        stepper: { connect: { id: stepper.id } },
        stepperStep: { connect: { id: stepperStep.id } },
        stepperProg: { connect: { id: stepperProg.id } },
        user: { connect: { id: userId } },
        percentDone,
        isCompleted,
      },
    })

  } else {
    console.log("Updating stepperStepProg");
    stepperStepProg = await context.db.StepperStepProg.updateOne({
      where: {
        id: stepperStepProg?.id as string,
      },
      data: {
        percentDone,
        isCompleted,
      },
    });
  }
  
  const stepperProgUser = await context.db.User.findOne({
    where: {
      id: stepperProg.userId as string,
    },
  });

  return { ...stepperStepProg, stepper, stepperProg, stepperStep, user: stepperProgUser };
}