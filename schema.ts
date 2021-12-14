import { Appointment } from "./api/appointment/Appointment";
import { Booking } from "./api/booking/Booking";
import { User } from "./api/user/User";
import { Patient } from "./api/patient/Patient";
import { Prompt } from "./api/prompt/Prompt";

import { Calendar } from "./api/calendar/Calendar";
import { CalendarEvent } from "./api/calendar-event/CalendarEvent";
import { CalendarEventType } from "./api/calendar-event-type/CalendarEventType";
import { Schedule } from "./api/schedule/Schedule";

import { Doctor } from "./api/doctor/Doctor";
import { DoctorType } from "./api/doctor-type/DoctorType";
import { DoctorLanguage } from "./api/doctor-language/DoctorLanguage";
import { HealthCard } from "./api/health-card/HealthCard";

import { EmergencyContact } from "./api/emergency-contact/EmergencyContact";

import { Stepper } from "./api/stepper/Stepper";
import { StepperProg } from "./api/stepper-prog/StepperProg";
import { StepperStep } from "./api/stepper-step/StepperStep";
import { StepperStepProg } from "./api/stepper-step-prog/StepperStepProg";

// Location
import { AdministrativeArea } from "./api/administrative-area/AdministrativeArea";
import { Country } from "./api/country/Country";


export const lists = {
  Appointment,
  Booking,
  // Calendar,
  Calendar,
  CalendarEvent,
  CalendarEventType,
  Schedule,
  // Doctor,
  Doctor,
  DoctorLanguage,
  DoctorType,
  // HealthCard
  HealthCard,
  // Country
  Country,
  AdministrativeArea,
  // EmergencyContact,
  EmergencyContact,
  User,
  Patient,
  Prompt,
  // Stepper
  Stepper,
  StepperProg,
  StepperStep,
  StepperStepProg,
};
