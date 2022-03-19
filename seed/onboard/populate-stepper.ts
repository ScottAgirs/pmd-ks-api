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
    console.log(`🌱 Seeding [${STEPPERS.length}] Steppers`);
    console.log(`----------------------------------------`);

    for (const stepper of STEPPERS) {
      console.log(` 👨🏼‍⚕️ Adding [${stepper.name}] Stepper`);
      const { stepperSteps } = stepper;
      const stepperNoSteps: StepperWithoutSteps = stepper;

      const existing = await keystone.db.Stepper.findOne({
        where: { slug: stepper.slug },
      });
      if (existing) {
        console.log(` 💀 [${stepper.name}] stepper already exists - skipping.`);
      } else {
        delete stepperNoSteps.stepperSteps;

        let createdStepper;
        try {
          createdStepper = await keystone.db.Stepper.createOne({
            data: stepperNoSteps,
          });
        } catch (error) {
          console.error(error);
          throw new Error(`Error creating stepper [${stepper.name}]`);
        }

        for (const stepperStep of stepperSteps) {
          console.log(
            ` 🦶🏼 Adding ${stepperSteps.length} Steps to [${createdStepper.name}]`
          );

          const existingStep = await keystone.db.StepperStep.findOne({
            where: { slug: stepperStep.slug },
          });
          if (existingStep) {
            console.log(
              ` 💀 [${stepperStep.title}] stepper step already exists - skipping.`
            );
          } else {
            try {
              await keystone.db.StepperStep.createOne({
                data: {
                  ...stepperStep,
                  stepper: { connect: { id: createdStepper.id } },
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
    }

    console.log(`✅ Seeded [${STEPPERS.length}] Steppers 🌳`);
  } catch (error) {
    console.error("populateSteppers :: error", error);
  }
}
