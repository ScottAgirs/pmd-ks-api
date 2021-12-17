const DOCTOR_ONBOARDING_STEPS = [
  {
    title: "Next Generation Health Care",
    description: "",
    component: "profile",
    slug: "profile",
    isFinal: false,
    order: 0,
  },
  {
    title: "Next Generation Health Care",
    description: "",
    component: "profession",
    slug: "profession",
    isFinal: false,
    order: 1,
  },
  {
    title: "Next Generation Health Care",
    description: "",
    component: "review",
    slug: "review",
    isFinal: true,
    order: 2,
  },
]

const PATIENT_ONBOARDING_STEPS = [
  {
    title: "Personal Information",
    description: "",
    component: "personal-data-form",
    slug: "personal-data-form",
    isFinal: false,
    order: 0,
  },
  {
    title: "Contact Information",
    description: "",
    component: "contacts",
    slug: "contacts",
    isFinal: false,
    order: 1,
  },
  {
    title: "Add Health Card Information",
    description: "",
    component: "healthcard",
    slug: "healthcard",
    isFinal: false,
    order: 2,
  },
  {
    title: "Review & Confirm",
    description: "",
    component: "review",
    slug: "review",
    isFinal: true,
    order: 3,
  },
  {
    title: "Done",
    description: "",
    component: "final",
    slug: "final",
    isFinal: true,
    order: 4,
  },
]


export const STEPPERS = [
  { title: "Welcome to PocketMD",
    name: "Patient onboarding",
    description: "",
    slug: "patient",
    stepperSteps: PATIENT_ONBOARDING_STEPS,
  },
  { 
    title: "Next Generation Health Care",
    name: "Doctor Onboarding",
    description: "",
    slug: "doctor",
    stepperSteps: DOCTOR_ONBOARDING_STEPS,
  },
];