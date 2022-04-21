var { faker } = require("@faker-js/faker"); // https://fakerjs.dev/

export const ADMIN_USERS = [
  {
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "1990-12-24T18:12:21.313Z",
          expiryDate: "2029-12-24T18:12:21.313Z",
          insurancePolicyNumber: "672",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "Scott Agi",
          versionCode: "Y3",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Local Ranger",
          firstName: "Chuck",
          lastName: "Norris",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: false,
    cellPhoneNumberString: "6136007789",
    homePhoneNumberString: "",
    email: "scott.agirs@gmail.com",
    dateOfBirth: "1990-12-24T18:12:21.313Z",
    firstName: "Scott",
    lastName: "Agirs",
    subjectId: "123123123",
    sex: "male",
    username: "admin",
  },
];

export const DUMMY_USERS = [
  // Patient Users
  {
    // doctor: null,
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "667",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y3",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "pat-0@example.com",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123124",
    sex: "male",
    username: "",
  },
  {
    // doctor: null,
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "668",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y2",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123125",
    sex: "male",
    username: "",
  },
  {
    // doctor: null,
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "669",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y1",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123126",
    sex: "male",
    username: "",
  },
  // Doctor Users
  {
    doctor: {
      calendar: {
        name: "",
        defaultSchedule: {
          description: "My Regular Working Hours",
          recurringSlots: [
            {
              wday: "monday",
              isActive: true,
              interval: "week",
              intervalCount: 1,
              timeIntervals: [
                {
                  from: "09:00:00",
                  to: "09:15:00",
                },
              ],
            },
          ],
          title: "Working Hours",
          tz: "America/Toronto",
        },
        events: [
          {
            description: "In-person examination",
            durationMins: 15,
            eventType: { value: "in-person" },
            isActive: true,
            title: "In-person examination",
          },
          {
            description: "Virtual Appointment",
            durationMins: 15,
            eventType: { value: "virtual" },
            isActive: true,
            title: "Virtual Appointment",
          },
        ],
      },
      doctorSpecialty: {
        value: "anesthesiology",
      },
      doctorSubSpecialties: [{ value: "cardiology" }],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "670",
      isCompleteProfile: true,
      isVerified: true,
      licensedBy: "CPSO",
      licenseNumber: "780",
    },
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "671",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y4",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "doc-0@example.com",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123127",
    sex: "male",
    username: "",
  },
  {
    doctor: {
      calendar: {
        name: "",
        defaultSchedule: {
          description: "My Regular Working Hours",
          recurringSlots: [
            {
              wday: "monday",
              isActive: true,
              interval: "week",
              intervalCount: 1,
              timeIntervals: [
                {
                  from: "09:00:00",
                  to: "10:15:00",
                },
              ],
            },
          ],
          title: "Working Hours",
          tz: "America/Toronto",
        },
        events: [
          {
            description: "In-person examination",
            durationMins: 15,
            eventType: { value: "in-person" },
            isActive: true,
            title: "In-person examination",
          },
          {
            description: "Virtual Appointment",
            durationMins: 15,
            eventType: { value: "virtual" },
            isActive: true,
            title: "Virtual Appointment",
          },
        ],
      },
      doctorSpecialty: {
        value: "anesthesiology",
      },
      doctorSubSpecialties: [{ value: "cardiology" }],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "666",
      isCompleteProfile: true,
      isVerified: true,
      licensedBy: "CPSO",
      licenseNumber: "778",
    },
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "673",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y5",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123128",
    sex: "male",
    username: "",
  },
  {
    doctor: {
      calendar: {
        name: "",
        defaultSchedule: {
          description: "My Regular Working Hours",
          recurringSlots: [
            {
              wday: "monday",
              isActive: true,
              interval: "week",
              intervalCount: 1,
              timeIntervals: [
                {
                  from: "09:00:00",
                  to: "11:15:00",
                },
              ],
            },
          ],
          title: "Working Hours",
          tz: "America/Toronto",
        },
        events: [
          {
            description: "In-person examination",
            durationMins: 15,
            eventType: { value: "in-person" },
            isActive: true,
            title: "In-person examination",
          },
          {
            description: "Virtual Appointment",
            durationMins: 15,
            eventType: { value: "virtual" },
            isActive: true,
            title: "Virtual Appointment",
          },
        ],
      },
      doctorSpecialty: {
        value: "anesthesiology",
      },
      doctorSubSpecialties: [{ value: "cardiology" }],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "674",
      isCompleteProfile: true,
      isVerified: true,
      licensedBy: "CPSO",
      licenseNumber: "779",
    },
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "675",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y6",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123129",
    sex: "female",
    username: "",
  },
  {
    doctor: {
      calendar: {
        name: "",
        defaultSchedule: {
          description: "My Regular Working Hours",
          recurringSlots: [
            {
              wday: "monday",
              isActive: true,
              interval: "week",
              intervalCount: 1,
              timeIntervals: [
                {
                  from: "09:00:00",
                  to: "12:15:00",
                },
              ],
            },
          ],
          title: "Working Hours",
          tz: "America/Toronto",
        },
        events: [
          {
            description: "In-person examination",
            durationMins: 15,
            eventType: { value: "in-person" },
            isActive: true,
            title: "In-person examination",
          },
          {
            description: "Virtual Appointment",
            durationMins: 15,
            eventType: { value: "virtual" },
            isActive: true,
            title: "Virtual Appointment",
          },
        ],
      },
      doctorSpecialty: {
        value: "anesthesiology",
      },
      doctorSubSpecialties: [{ value: "cardiology" }],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "676",
      isCompleteProfile: true,
      isVerified: true,
      licensedBy: "CPSO",
      licenseNumber: "777",
    },
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "",
          expiryDate: "",
          insurancePolicyNumber: "677",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y7",
        },
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        },
      ],
    },
    isDummy: true,
    photoSrc: "",
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    subjectId: "123123130",
    sex: "female",
    username: "",
  },
];

export const enrichedUsers = () => {
  const enriched = DUMMY_USERS.map((u) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = `${firstName} ${lastName}`;

    const emConFirstName = faker.name.firstName();
    const emConLastName = faker.name.lastName();

    const dob = faker.date.between(
      "1950-01-01T00:00:00.000Z",
      "1990-01-01T00:00:00.000Z"
    );

    if (!u.username) {
      u.email = `${fullName.replace(" ", ".")}@example.lv`;
      u.firstName = firstName;
      u.lastName = lastName;
      u.username = `${firstName}-${lastName}`;
      u.photoSrc = faker.image.avatar();
      u.cellPhoneNumberString = faker.phone.phoneNumber("416######");

      u.dateOfBirth = dob;

      if (u.doctor) {
        u.doctor.calendar.name = `${firstName}'s Calendar`;
        u.doctor.doctorSince = faker.date.between(
          "1950-01-01T00:00:00.000Z",
          "2019-01-01T00:00:00.000Z"
        );
      }

      u.patient.healthCards[0].dateOfBirth = dob;
      u.patient.healthCards[0].expiryDate = faker.date.future();
      u.patient.healthCards[0].nameOnCard = fullName;

      u.patient.emergencyContacts[0].firstName = emConFirstName;
      u.patient.emergencyContacts[0].lastName = emConLastName;
      u.patient.emergencyContacts[0].relation = "Dummy";
      u.patient.emergencyContacts[0].cellPhoneNumberString =
        faker.phone.phoneNumber("613######");
    }

    return u;
  });

  return enriched;
};
