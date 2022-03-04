import { KeystoneContext } from "@keystone-6/core/types";

export const getCurrentUser = async (context: KeystoneContext) => {
  const userId = context.session?.data?.id;
  if (!userId) return null;

  const currentUser = await context.db.User.findOne({ 
    where: { id: userId }
  });

  const enrichedCurrentUser = {
    ...currentUser,
    doctorId: currentUser.doctor?.id,
    patientId: currentUser.patient?.id,
    userId: currentUser.id,
  }

  return enrichedCurrentUser;
}