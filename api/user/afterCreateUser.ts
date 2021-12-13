// TODO: [TypeScript] Add context interface
export const afterCreateUser = async ({ context, item }) => {
  if (!item) throw new Error('Failed to create User item.')
  
  await context.query.Prompt.createOne({ data: {
    name: "Automated prompt",
    user: {
      connect: {
        id: item.id
      }
    },
  }})
  
  await context.query.Patient.createOne({ data: {
    name: "After Create Patient",
    user: {
      connect: {
        id: item.id
      }
    },
  }})
}
