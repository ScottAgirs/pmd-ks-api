import { STEPPERS } from "./stepper";

interface StepperWithoutSteps {
  description: string;
  name: string;
  slug: string;
  title: string;
  stepperSteps?: object;
}

export async function populateSteppers(keystone: any) {
  console.log(`----------------------------------------`);
  console.log(`🌱 Inserting Steppers Data: ${STEPPERS.length} items`);
  console.log(`----------------------------------------`);

  for (const stepper of STEPPERS) {
    console.log(` 👨🏼‍⚕️ Adding [${stepper.name}] Specialty`);
    const { stepperSteps } = stepper;
    const stepperNoSteps:StepperWithoutSteps = stepper;

    delete stepperNoSteps.stepperSteps;

    const createdStepper = await keystone.db.Stepper.createOne({
      data: stepperNoSteps
    });

    console.log(` 👨🏼‍⚕️ ✅ Created [${createdStepper.name}]`);
    console.log(` 👣 Adding ${stepperSteps.length} Steps to [${createdStepper.name}]`);

    for (const stepperStep of stepperSteps) {
      const addedStepperStep = await keystone.db.StepperStep.createOne({
        data: {
          ...stepperStep,
          stepper: { connect: { id: createdStepper.id } }
        }
      });
      console.log('populateSteppers :: addedStepperStep', addedStepperStep);
    }
  }
  console.log(`✅ Steppers Seeded with ${STEPPERS.length} items`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}
