import { DUMMY_USERS, enrichedUsers } from "./dummy-users"; // total 7 users

export async function populateDummyUsers(keystone: any) {
  console.log(`-----------------------------------------------`);
  console.log(`🌱 Seeding [${DUMMY_USERS.length}] Users`);
  console.log(`-----------------------------------------------`);

  const dummyUsers = enrichedUsers()

  let i = 0;
  for (const userSeedData of dummyUsers) {
    // https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#helpers

    const { doctor: doctorData = {}, patient: patientData, ...user } = userSeedData;
    
    const { emergencyContacts, healthCards, ...patient } = patientData;
    
    const { 
      // @ts-ignore
      doctorSpecialty, 
      // @ts-ignore
      doctorSubSpecialties, 
      // @ts-ignore
      calendar: calendarData = {},
      ...doctor 
    } = doctorData;
    
    const hasCalendar = !!Object.keys(calendarData).length;
    
    const { 
      // @ts-ignore
      events: eventsData, 
      // @ts-ignore
      defaultSchedule, 
      ...calendar 
    } = calendarData;
    
    const hasDoctor = !!Object.keys(doctor).length;
    console.log('populateDummyUsers :: doctor', doctor);

    const createdSchedule = defaultSchedule && await keystone.db.Schedule.createOne({
      data: defaultSchedule
    });

    const createDoctorData =  (!hasCalendar || !hasDoctor) ? {} : {
      ...doctor,
      calendar: {
        create: {
          ...calendar,
          schedules: {
            connect: [{id: createdSchedule.id}]
          },
          defaultSchedule: {
            connect: {
              id: createdSchedule.id
            }
          },
          events: {
            create: eventsData.map((event:any) => ({
              ...event,
              eventType: { connect: { value: event.eventType.value } }
            }))
          }
        }
      },
      doctorSpecialty: {
        connect: { value: doctorSpecialty.value },
      },
      doctorSubSpecialties: {
        connect: doctorSubSpecialties.map((sp:any) => ({ value: sp.value })),
      }
    }

    const createdDoctor = defaultSchedule && await keystone.db.Doctor.createOne({
      data: createDoctorData
    });

    await keystone.db.User.createOne({
      data: {
        ...user,
        // @ts-ignore
        doctor: hasDoctor ? { connect:{ id:createdDoctor.id } } : undefined,
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
        if (!createdUser) {
          throw new Error(`Failed to create a user ${DUMMY_USERS[i].username}`);
        }
      });
      
    console.log(`🦶🏼 ✅ Seeded user [${userSeedData.username}]`);
    i = i + 1;
  }

  console.log(`✅ Seeded [${DUMMY_USERS.length}] (🤪) Users 🌳`);
}