const DOCTOR_ONBOARDING_STEPS = [
  {
    description: "",
    component: "profile",
    isFinal: false,
    label: "Public Profile",
    order: 0,
    slug: "profile",
    title: "Public Profile",
  },
  {
    description: "",
    component: "profession",
    isFinal: false,
    label: "Professional Information",
    order: 1,
    slug: "profession",
    title: "Professional Information",
  },
  {
    description: "",
    component: "review",
    isFinal: true,
    label: "Review and Confirm",
    order: 2,
    slug: "review",
    title: "Review and Confirm",
  },
  {
    description: "",
    component: "final",
    isFinal: true,
    label: "Complete",
    order: 3,
    slug: "final",
    title: "Complete",
  },
]

const PATIENT_ONBOARDING_STEPS = [
  {
    description: "",
    component: "personal-data-form",
    isFinal: false,
    label: "Personal Information",
    order: 0,
    slug: "personal-data-form",
    title: "Personal Information",
  },
  {
    description: "",
    component: "contacts",
    isFinal: false,
    label: "Contact Information",
    order: 1,
    slug: "contacts",
    title: "Contact Information",
  },
  {
    description: "",
    component: "healthcard",
    isFinal: false,
    label: "Add Health Card Information",
    order: 2,
    slug: "healthcard",
    title: "Add Health Card Information",
  },
  {
    description: "",
    component: "review",
    isFinal: true,
    label: "Review & Confirm",
    order: 3,
    slug: "review",
    title: "Review & Confirm",
  },
  {
    description: "",
    component: "final",
    isFinal: true,
    label: "Done",
    order: 4,
    slug: "final",
    title: "You are all set and ready to book doctors!",
  },
]


export const STEPPERS = [
  { 
    description: "",
    name: "Patient onboarding",
    slug: "patient",
    stepperSteps: PATIENT_ONBOARDING_STEPS,
    title: "Welcome to PocketMD",
  },
  { 
    description: "",
    name: "Doctor Onboarding",
    slug: "doctor",
    stepperSteps: DOCTOR_ONBOARDING_STEPS,
    title: "Next Generation Health Care",
  },
];