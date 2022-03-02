var { faker } = require('@faker-js/faker'); // https://fakerjs.dev/

export const ADMIN_USERS = [
  {
    patient: {
      isCompleteProfile: true,
      healthCards: [
        {
          dateOfBirth: "1990-12-24T18:12:21.313Z",
          expiryDate: "2029-12-24T18:12:21.313Z",
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "Scott Agi",
          versionCode: "Y3",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Local Ranger",
          firstName: "Chuck",
          lastName: "Norris",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: false,
    cellPhoneNumberString: "6136007789",
    homePhoneNumberString: "",
    email: "scott.agirs@gmail.com",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M5J 2H2",
    dateOfBirth: "1990-12-24T18:12:21.313Z",
    firstName: "Scott",
    lastName: "Agirs",
    password:"123123123",
    sex: "male",
    username: "admin",
  }
]

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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y3",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "pat-0@example.com",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M5J 2H2",
    dateOfBirth: "2000-12-21T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y2",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M5J 2H2",
    dateOfBirth: "2000-12-21T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y1",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M5J 2H2",
    dateOfBirth: "2000-12-21T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
    sex: "male",
    username: "",
  },
  // Doctor Users
  {
    doctor: {
      doctorSpecialty: {
        value: "anesthesiology"
      },
      doctorSubSpecialties: [
        { value: "cardiology" }
      ],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "666",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y4",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "doc-0@example.com",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M8J 1A1",
    dateOfBirth: "1985-02-03T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
    sex: "male",
    username: "",
  },
  {
    doctor: {
      doctorSpecialty: {
        value: "anesthesiology"
      },
      doctorSubSpecialties: [
        { value: "cardiology" }
      ],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "666",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y5",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M8J 1A1",
    dateOfBirth: "1985-02-03T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
    sex: "male",
    username: "",
  },
  {
    doctor: {
      doctorSpecialty: {
        value: "anesthesiology"
      },
      doctorSubSpecialties: [
        { value: "cardiology" }
      ],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "666",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y6",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    // email: "",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M8J 1A1",
    dateOfBirth: "1985-02-03T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
    sex: "female",
    username: "",
  },
  {
    doctor: {
      doctorSpecialty: {
        value: "anesthesiology"
      },
      doctorSubSpecialties: [
        { value: "cardiology" }
      ],
      doctorSince: "",
      insuranceProvider: "RBC",
      insurancePolicyNumber: "666",
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
          insurancePolicyNumber: "666",
          insuranceProvider: "RBC",
          isVerified: true,
          nameOnCard: "",
          versionCode: "Y7",
        }
      ],
      emergencyContacts: [
        {
          email: "dummy@example.co",
          relation: "Brother",
          firstName: "",
          lastName: "",
          cellPhoneNumberString: "4163334444",
        }
      ]
    },
    isDummy: true,
    cellPhoneNumberString: "",
    homePhoneNumberString: "",
    email: "",
    country: "CA",
    administrativeArea: "ON",
    locality: "Toronto",
    postalCode: "M8J 1A1",
    dateOfBirth: "1985-02-03T18:12:21.313Z",
    firstName: "",
    lastName: "",
    password:"123123123",
    sex: "female",
    username: "",
  },
];

export const enrichedUsers = () => {
  const enriched = DUMMY_USERS.map(u => {

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = `${firstName} ${lastName}`;
    
    const emConFirstName = faker.name.firstName();
    const emConLastName = faker.name.lastName();

    const dob = faker.date.between('1950-01-01T00:00:00.000Z', '1990-01-01T00:00:00.000Z');

    if (!u.username) {
      u.email = `${fullName.replace(" ", ".")}@example.lv`;
      u.firstName = firstName;
      u.lastName = lastName;
      u.username = `${firstName}-${lastName}`;
      u.cellPhoneNumberString = faker.phone.phoneNumber('416######');

      u.dateOfBirth = dob;
      
      if (u.doctor) {
        u.doctor.doctorSince = faker.date.between('1950-01-01T00:00:00.000Z', '2019-01-01T00:00:00.000Z');
      }
        
      u.patient.healthCards[0].dateOfBirth = dob;
      u.patient.healthCards[0].expiryDate = faker.date.future();
      u.patient.healthCards[0].nameOnCard = fullName;
      
      u.patient.emergencyContacts[0].firstName = emConFirstName;
      u.patient.emergencyContacts[0].lastName = emConLastName;
      u.patient.emergencyContacts[0].relation = "Dummy";
      u.patient.emergencyContacts[0].cellPhoneNumberString = faker.phone.phoneNumber('613######');
    }

    return u;
  })

  return enriched;
}