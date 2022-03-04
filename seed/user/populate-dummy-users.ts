import { DUMMY_USERS, enrichedUsers } from "./dummy-users"; // total 7 users

let running = false;

export async function populateDummyUsers(keystone: any) {
  console.log(`-----------------------------------------------`);
  console.log(`🌱 Seeding [${DUMMY_USERS.length}] Users`);
  console.log(`-----------------------------------------------`);

  

  const dummyUsers = enrichedUsers()

  let i = 0;
  for (const userSeedData of dummyUsers) {
    console.log('populateDummyUsers :: total dummyUsers', dummyUsers.length, " - current user", i);
    // https://rawgit.com/Marak/faker.js/master/examples/browser/index.html#helpers
    
    const { doctor: doctorData = {}, patient: patientData, ...user } = userSeedData;
    const existingUser = await keystone.db.User.findOne({
      where: {
        subjectId: user.subjectId
      }
    })
    console.log('populateDummyUsers :: existingUser', existingUser?.username);
    console.log('populateDummyUsers :: user', user?.username);
    if (existingUser) {
      console.log("User found, skipping...", user.username, user.subjectId);
      return null;}
    
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
      events: eventsData = {}, 
      // @ts-ignore
      defaultSchedule: scheduleData = {}, 
      ...calendar 
    } = calendarData;
    
    const hasDoctor = !!Object.keys(doctor).length;
    const hasEvents = eventsData && !!Object.keys(eventsData).length;
    
    const {
      recurringSlots,
      ...schedule
    } = scheduleData;
    
    const hasSchedule = !!Object.keys(scheduleData).length;
    console.log("0");

    const createdSchedule = hasSchedule && await keystone.db.Schedule.createOne({
      data: {
        ...schedule,
        recurringSlots: !hasSchedule ? undefined : {
          create: recurringSlots.map((rs: any) => {
            const { timeIntervals, ...recSlotData } = rs;
            
            return {
              ...recSlotData,
              timeIntervals: {
                create: timeIntervals.map((ti: any) => {
                  const { from, to } = ti;
                  return {
                    from,
                    to,
                  }
                })
              }
            }
          }
          )
        }
      }
    });
    console.log("1");
    const createdEvents = hasCalendar && hasEvents && await keystone.db.CalendarEvent.createMany({
      data: eventsData.map((event:any) => ({
        ...event,
        eventType: { connect: { value: event.eventType.value } }
      }))
    });
    console.log("2");

    const createDoctorData =  (!hasDoctor) ? {} : {
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
            connect: [...createdEvents.map((event:any) => ({id: event.id}))] 
          }
        }
      },
      calendarEvents: {
        connect: [...createdEvents.map((event:any) => ({id: event.id}))] 
      },
      doctorSpecialty: {
        connect: { value: doctorSpecialty.value },
      },
      doctorSubSpecialties: {
        connect: doctorSubSpecialties.map((sp:any) => ({ value: sp.value })),
      }
    }

    const createdDoctor = hasSchedule && await keystone.db.Doctor.createOne({
      data: createDoctorData
    });
    console.log("3");
    
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
      console.log("4");
      
    console.log(`🦶🏼 ✅ Seeded user [${userSeedData.username}]`);
    i = i + 1;
    console.log('DONE :: i', i);
  }

  console.log(`✅ Seeded [${DUMMY_USERS.length}] (🤪) Users 🌳`);
}