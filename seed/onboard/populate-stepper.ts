import { STEPPERS } from "./stepper";

interface StepperWithoutSteps {
  description: string;
  name: string;
  slug: string;
  title: string;
  stepperSteps?: object;
}

export async function populateSteppers(keystone: any) {
  try {
    console.log(`----------------------------------------`);
    console.log(`π± Seeding [${STEPPERS.length}] Steppers`);
    console.log(`----------------------------------------`);

    for (const stepper of STEPPERS) {
      console.log(` π¨πΌββοΈ Adding [${stepper?.name || "Unknown stepper"}] Stepper`);
      const { stepperSteps } = stepper;
      const stepperNoSteps: StepperWithoutSteps = stepper;

      let createdStepper;
      const existing = await keystone.db.Stepper.findOne({
        where: { slug: stepper.slug },
      });
      if (existing) {
        console.log(  ` π [${stepper?.name}] stepper already exists - skipping.`);
      } else {
        delete stepperNoSteps.stepperSteps;

        try {
          createdStepper = await keystone.db.Stepper.createOne({
            data: stepperNoSteps,
          });
        } catch (error) {
          console.error(error);
          throw new Error(
            `Error creating stepper [${stepper?.name || "Unknown stepper"}]`
          );
        }
      }

      for (const stepperStep of stepperSteps) {
        console.log(
          ` π¦ΆπΌ Adding ${stepperSteps.length} Step Steps to: ${
            createdStepper?.name
              ? `Created stepper: ${createdStepper.name}`
              : `Seed Stepper ${stepper.name}`
          }`
        );

        const existingStep = await keystone.db.StepperStep.findOne({
          where: { slug: stepperStep.slug },
        });
        if (existingStep) {
          console.log(
            ` π [${stepperStep.title}] stepper step already exists - skipping.`
          );
        } else {
          try {
            await keystone.db.StepperStep.createOne({
              data: {
                ...stepperStep,
                stepper: { connect: { slug: stepper.slug } },
              },
            });
          } catch (error) {
            throw new Error(
              `Error creating stepper step [${stepperStep.title}]`
            );
          }
        }
      }
    }

    console.log(`β Seeded [${STEPPERS.length}] Steppers π³`);
  } catch (error) {
    console.error("populateSteppers :: error", error);
  }
}
