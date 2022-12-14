import { KeystoneContext } from '@keystone-6/core/types';
import { completePatientOnboarding } from '../../patient/services/completePatientOnboarding';
import { completeDoctorOnboarding } from '../../doctor/services/completeDoctorOnboarding';
import {
  createOrUpdateStepperStepProg,
  CreateOrUpdateStepperStepProgInput,
} from '../services/createOrUpdateStepperStepProg';

export const completeMyStepProg = async (
  root: any,
  { stepId }: { stepId: string },
  context: KeystoneContext
) => {
  const currentUser = context.session?.data;

  if (!currentUser) throw new Error('Must be logged in');

  const updatedStepperStepProg = await createOrUpdateStepperStepProg(context, {
    isCompleted: true,
    stepId,
  } as CreateOrUpdateStepperStepProgInput);

  const isFinal = updatedStepperStepProg.stepperStep?.isFinal;

  if (isFinal) {
    const isDoctorProgress = updatedStepperStepProg.stepper?.slug === 'doctor';
    const isPatientProgress =
      updatedStepperStepProg.stepper?.slug === 'patient';

    if (isDoctorProgress)
      await completeDoctorOnboarding(context, updatedStepperStepProg);

    if (isPatientProgress)
      await completePatientOnboarding(context, updatedStepperStepProg);

    const stepperProgId = updatedStepperStepProg.stepperProg.id;
    // strapi.services['stepper-prog'].completeProg({
    //   stepperProgId,
    // });

    const stepperStepAPI = context.query.StepperStep;
    // const stepperStepAPI = strapi.query('stepper-step');
    // const stepperStep = await stepperStepAPI.findOne({
    //   where:{ id: stepId },
    // });

    // const userPromptAPI = context.query.Prompt;
    // // const userPromptAPI = strapi.query('prompt');
    // const matchedPrompts = await userPromptAPI.findMany({
    //   // stepper: {id:stepperStep.stepper.id},
    //   where: {
    //     stepper: { id: { equals: stepperStep.stepper.id } },
    //     user:{ id: { equals: currentUser.id } },
    //   }
    // });

    // const userPrompt = matchedPrompts && matchedPrompts[0];

    // if (userPrompt) {
    //   userPromptAPI.deleteOne({ where: { id: userPrompt.id } });
    // }
  }

  return updatedStepperStepProg;
};
