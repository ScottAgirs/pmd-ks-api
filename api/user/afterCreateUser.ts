// TODO: [TypeScript] Add context interface
export const afterCreateUser = async ({ context, item }) => {
  if (!item) throw new Error('Failed to create User item.')
  
  await context.query.StepperProg.createOne({ data: {
    name: `${item.firstName}'s Stepper Progress`,
    user: {
      connect: {
        id: item.id
      }
    },
  }})
  
  await context.query.Prompt.createOne({ data: {
    name: `${item.firstName}'s Patient Onboarding Prompt`,
    promptType: "redirect",
    promptValue: "/onboard/patient",
    user: {
      connect: {
        id: item.id
      }
    },
  }})
  
  await context.query.Patient.createOne({ data: {
    name: `${item.firstName}'s Patient Profile`,
    user: {
      connect: {
        id: item.id
      }
    },
  }})

}
