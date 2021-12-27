import { DUMMY_DOCTORS } from "./dummy-doctors"; // total 4 doctors
import { HEALTH_CARDS } from "./dummy-patient-health-cards";
import { DUMMY_PATIENTS } from "./dummy-patients";
import { DUMMY_USERS } from "./dummy-users"; // total 7 users


export async function populateDummyUsers(keystone: any) {
  console.log(`-----------------------------------------------`);
  console.log(`🌱 Seeding with ${DUMMY_USERS.length} Users`);
  console.log(`-----------------------------------------------`);

  let i = 0;
  for (const user of DUMMY_USERS) {
    console.log('before :: i', i);
   
    await keystone.db.User.createOne({
      data: DUMMY_USERS[i]
    })
      .catch(() => console.log(`res :: err - FAILED TO CREATE A USER ${DUMMY_USERS[i].email}`))
      .then(async createdUser => {
      console.log('createdUser :: email', createdUser.email);
        if (!createdUser) {
          throw new Error(`Failed to create a user ${DUMMY_USERS[i].email}`);
          return null
        }
        // const hasHealthCardForIndex = Boolean(HEALTH_CARDS[i]);
        // const healthCardForCreatedUserData = hasHealthCardForIndex ? HEALTH_CARDS[i] : null;

        // let healthCardForCreatedUser
        // if (hasHealthCardForIndex) {
        //   console.log("WILL CREATE HEALTH CARD FOR USER");
        //   healthCardForCreatedUser = await keystone.db.HealthCard.createOne({
        //     data: {
        //       ...healthCardForCreatedUserData,
        //       // patient: { connect: { id: res.id } }
        //     }
        //   });
        //   console.log('DUMMY_USERS.forEach :: healthCardForCreatedUser', healthCardForCreatedUser);
          
        //   if (!healthCardForCreatedUser) {
        //     console.log(`healthCardForCreatedUser :: err - FAILED TO CREATE A HEALTH CARD FOR USER ${DUMMY_USERS[i].email}`);
        //   }
        // }

        const hasPatientForIndex = Boolean(DUMMY_DOCTORS[i]);
        const patientForCreatedUser = hasPatientForIndex ? DUMMY_PATIENTS[i] : null;
        if (hasPatientForIndex) {
          console.log("WILL CREATE PATIENT FOR USER");
          await keystone.db.Patient.createOne({
            data: {
              ...patientForCreatedUser,
              user: { connect: { id: createdUser.id } }
            }
          }).then(async createdPatient => {
            if (!createdPatient) {
              console.log(`createdPatient :: err - FAILED TO CREATE A PATIENT FOR USER ${DUMMY_USERS[i].email}`);
              return null;
            }
            const hasDoctorForIndex = Boolean(DUMMY_DOCTORS[i]);
            const doctorForCreatedUserData = hasDoctorForIndex ? DUMMY_DOCTORS[i] : null;
            
            if (hasDoctorForIndex) {
              console.log("WILL CREATE DOC FOR USER");
              const createdDoctor = await keystone.db.Doctor.createOne({
                data: {
                  ...doctorForCreatedUserData,
                  user: { connect: { id: createdUser.id } }
                }
              });
              
              if (!createdDoctor) {
                throw new Error(`createdDoctor :: err - FAILED TO CREATE A DOC FOR USER ${DUMMY_USERS[i].email}`);
              }

              console.log('DUMMY_USERS.forEach :: createdDoctor', createdDoctor);
            }
          });
        }
      });
      
    console.log(`🦶🏼 ✅ Added [${DUMMY_USERS[i].firstName}]`);
    i = i + 1;
  }

  console.log(`✅ [Seeded] ${DUMMY_USERS.length} (DUMMY) Users`);
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
  // process.exit();
}




  // NOTE: For some reason the .forEach() doesn't work.
  // DUMMY_USERS.forEach(async (user: any, index: number) => {
  //   console.log('DUMMY_USERS.forEach :: index', index);
  //   console.log(` 👨🏼‍⚕️ Adding [${user.email}] User`);
  //   const res  = await keystone.db.User.createOne({
  //     data: DUMMY_USERS[index]
  //   }).catch(err => console.log("res :: err", err));

  //   const hasDoctorForIndex = Boolean(DUMMY_DOCTORS[index]);
  //   const doctorForCreatedUser = hasDoctorForIndex ? DUMMY_DOCTORS[index] : null;

  //   if (hasDoctorForIndex) {
  //     console.log("WILL CREATE DOC FOR USER");
  //     const createdDoctor = await keystone.db.Doctor.createOne({
  //       data: doctorForCreatedUser
  //     });
  //     console.log('DUMMY_USERS.forEach :: createdDoctor', createdDoctor);
  //   }
  // })