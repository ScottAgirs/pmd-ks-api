import { ADMIN_USERS } from "./dummy-users"; // total 7 users

export async function populateAdminUsers(keystone: any) {
  console.log(`-----------------------------------------------`);
  console.log(`π± Seeding [${ADMIN_USERS.length}] Users`);
  console.log(`-----------------------------------------------`);

  let i = 0;
  for (const userSeedData of ADMIN_USERS) {
    // https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#helpers

    const { patient: patientData, ...user } = userSeedData;
    
    
    const { emergencyContacts, healthCards, ...patient } = patientData;
    
    await keystone.db.User.createOne({
      data: {
        ...user,
        patient: {
          create: {
            ...patient,
            healthCards: {
              create: {
                ...healthCards[0]
              }
            },
            emergencyContacts: {
              create: {
                ...emergencyContacts[0]
              }
            }
          }
        },
      }
    })
      .catch((err: any) => console.log(`res :: err - FAILED TO CREATE A USER ${ADMIN_USERS[i].username}`, err))
      // @ts-ignore
      .then(async createdUser => {
      console.log('createdUser :: ', createdUser);
        if (!createdUser) {
          throw new Error(`Failed to create a user ${ADMIN_USERS[i].username}`);
        }
      });
      
    console.log(`π¦ΆπΌ β Seeded user [${userSeedData.username}]`);
    i = i + 1;
  }

  console.log(`β Seeded [${ADMIN_USERS.length}] (π€ͺ) ADMINS π³`);
}