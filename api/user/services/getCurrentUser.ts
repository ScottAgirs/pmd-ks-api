import { KeystoneContext } from "@keystone-6/core/types";

export const getCurrentUser = async (context: KeystoneContext) => {
  const userId = context.session?.data?.id;
  if (!userId) return null;

  try {
    const currentUser = await context.query.User.findOne({ 
      where: { id: userId },
      query: 'id username patient { id user { id } }',
    });

  const enrichedCurrentUser = {
    ...currentUser,
    doctorId: currentUser.doctor?.id,
    patientId: currentUser.patient?.id,
    userId: currentUser.id,
  }

  return enrichedCurrentUser;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
    
}