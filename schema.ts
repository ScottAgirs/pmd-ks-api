import { Address } from "./api/address/Address";
import { AppointmentBilling } from "./api/appointment-billing/AppointmentBilling";
import { AppointmentBillingItem } from "./api/appointment-billing-item/AppointmentBillingItem";
import { AppointmentNote } from "./api/appointment-note/AppointmentNote";
import { AppointmentVital } from "./api/appointment-vital/AppointmentVital";
import { Appointment } from "./api/appointment/Appointment";
import { Booking } from "./api/booking/Booking";

import { Calendar } from "./api/calendar/Calendar";
import { CalendarEvent } from "./api/calendar-event/CalendarEvent";
import { CalendarEventType } from "./api/calendar-event-type/CalendarEventType";
import { Contract } from "./api/contract/Contract";
import { RecurringSlot } from "./api/recurring-slot/RecurringSlot";
import { Schedule } from "./api/schedule/Schedule";
import { TimeInterval } from "./api/time-interval/TimeInterval";

import { Doctor } from "./api/doctor/Doctor";
import { Medication } from "./api/medication/Medication";
import { DoctorSpecialty } from "./api/doctor-specialty/DoctorSpecialty";
import { DoctorSubSpecialty } from "./api/doctor-sub-specialty/DoctorSubSpecialty";
import { Language } from "./api/language/Language";
import { HealthCard } from "./api/health-card/HealthCard";

import { EmergencyContact } from "./api/emergency-contact/EmergencyContact";

import { Patient } from "./api/patient/Patient";
import { Prescription } from "./api/prescription/Prescription";
import { PrescriptionItem } from "./api/prescription-item/PrescriptionItem";
import { Prompt } from "./api/prompt/Prompt";

import { Stepper } from "./api/stepper/Stepper";
import { StepperProg } from "./api/stepper-prog/StepperProg";
import { StepperStep } from "./api/stepper-step/StepperStep";
import { StepperStepProg } from "./api/stepper-step-prog/StepperStepProg";

import { User } from "./api/user/User";

// Location
import { AdministrativeArea } from "./api/administrative-area/AdministrativeArea";
import { Country } from "./api/country/Country";

export const lists = {
  Address,
  // Appointment
  Appointment,
  AppointmentBilling,
  AppointmentBillingItem,
  AppointmentNote,
  AppointmentVital,
  Booking,
  // Calendar,
  Calendar,
  CalendarEvent,
  CalendarEventType,
  Schedule,
  RecurringSlot,
  TimeInterval,
  // Contracts
  Contract,
  // Doctor,
  Doctor,
  Language,
  DoctorSpecialty,
  DoctorSubSpecialty,
  // HealthCard
  HealthCard,
  // Country
  Country,
  AdministrativeArea,
  // EmergencyContact,
  EmergencyContact,
  User,
  Patient,
  Medication,
  Prescription,
  PrescriptionItem,
  Prompt,
  // Stepper
  Stepper,
  StepperProg,
  StepperStep,
  StepperStepProg,
};
