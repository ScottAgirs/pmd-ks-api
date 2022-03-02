import { DUMMY_USERS, enrichedUsers } from "./dummy-users"; // total 7 users

export async function populateDummyUsers(keystone: any) {
  console.log(`-----------------------------------------------`);
  console.log(`🌱 Seeding [${DUMMY_USERS.length}] Users`);
  console.log(`-----------------------------------------------`);

  const dummyUsers = enrichedUsers()

  let i = 0;
  for (const userSeedData of dummyUsers) {
    // https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#helpers

    const { doctor: doctorData, patient: patientData, ...user } = userSeedData;
    
    
    const { emergencyContacts, healthCards, ...patient } = patientData;
    
    const normalizedDoctorData = doctorData ? { 
      doctor: { create: doctorData, } 
    } : {} 

    await keystone.db.User.createOne({
      data: {
        ...user,
        ...normalizedDoctorData,
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
      .catch((err: any) => console.log(`res :: err - FAILED TO CREATE A USER ${DUMMY_USERS[i].username}`, err))
      // @ts-ignore
      .then(async createdUser => {
      console.log('createdUser :: ', createdUser);
        if (!createdUser) {
          throw new Error(`Failed to create a user ${DUMMY_USERS[i].username}`);
        }
      });
      
    console.log(`🦶🏼 ✅ Seeded user [${userSeedData.username}]`);
    i = i + 1;
  }

  console.log(`✅ Seeded [${DUMMY_USERS.length}] (🤪) Users 🌳`);
}