import { Address } from './api/address/Address';
import { ActiveIngredient } from './api/active-ingredient/ActiveIngredient';
import { AppointmentBilling } from './api/appointment-billing/AppointmentBilling';
import { AppointmentBillingItem } from './api/appointment-billing-item/AppointmentBillingItem';
import { AppointmentNote } from './api/appointment-note/AppointmentNote';
import { AppointmentRequest } from './api/appointment-request/AppointmentRequest';
import { AppointmentVital } from './api/appointment-vital/AppointmentVital';
import { Appointment } from './api/appointment/Appointment';

import { BillingClaim } from './api/billing-claim/BillingClaim';
import { BillingDiagnosis } from './api/billing-diagnosis/BillingDiagnosis';
import { Booking } from './api/booking/Booking';

import { Calendar } from './api/calendar/Calendar';
import { CalendarEvent } from './api/calendar-event/CalendarEvent';
import { CalendarEventType } from './api/calendar-event-type/CalendarEventType';

import { Company } from './api/company/Company';
import { CompanyLocation } from './api/company-location/CompanyLocation';

import { Contract } from './api/contract/Contract';
import { RecurringSlot } from './api/recurring-slot/RecurringSlot';
import { Schedule } from './api/schedule/Schedule';
import { TimeInterval } from './api/time-interval/TimeInterval';

import { Doctor } from './api/doctor/Doctor';
import { Form } from './api/form/Form';
import { FormType } from './api/form-type/FormType';
import { Medication } from './api/medication/Medication';
import { DoctorSpecialty } from './api/doctor-specialty/DoctorSpecialty';
import { DoctorSubSpecialty } from './api/doctor-sub-specialty/DoctorSubSpecialty';
import { Language } from './api/language/Language';
import { HealthCard } from './api/health-card/HealthCard';

import { EmergencyContact } from './api/emergency-contact/EmergencyContact';

import { Patient } from './api/patient/Patient';
import { Pharmacy } from './api/pharmacy/Pharmacy';
import { PharmacyLocation } from './api/pharmacy-location/PharmacyLocation';
import { Prescription } from './api/prescription/Prescription';
import { ProfilePhoto } from './api/profile-photo/model/ProfilePhoto';
import { PrescriptionItem } from './api/prescription-item/PrescriptionItem';

import { ProofOfIdentification } from './api/proof-of-identification/model/ProofOfIdentification';
import { ProofOfInsurance } from './api/proof-of-insurance/model/ProofOfInsurance';
import { ProofOfLicense } from './api/proof-of-license/model/ProofOfLicense';

import { Prompt } from './api/prompt/Prompt';

import { Stepper } from './api/stepper/Stepper';
import { StepperProg } from './api/stepper-prog/StepperProg';
import { StepperStep } from './api/stepper-step/StepperStep';
import { StepperStepProg } from './api/stepper-step-prog/StepperStepProg';

import { User } from './api/user/User';
import { UserInvite } from './api/user-invite/UserInvite';

// Location
import { AdministrativeArea } from './api/administrative-area/AdministrativeArea';
import { Country } from './api/country/Country';

export const lists = {
  ActiveIngredient,
  Address,
  AdministrativeArea,
  Appointment,
  AppointmentBilling,
  AppointmentBillingItem,
  AppointmentNote,
  AppointmentRequest,
  AppointmentVital,
  BillingClaim,
  BillingDiagnosis,
  Booking,
  Calendar,
  CalendarEvent,
  CalendarEventType,
  Company,
  CompanyLocation,
  Contract,
  Country,
  Doctor,
  DoctorSpecialty,
  DoctorSubSpecialty,
  EmergencyContact,
  Form,
  FormType,
  HealthCard,
  Language,
  Medication,
  Patient,
  Pharmacy,
  PharmacyLocation,
  Prescription,
  PrescriptionItem,
  ProfilePhoto,
  Prompt,
  ProofOfIdentification,
  ProofOfInsurance,
  ProofOfLicense,
  RecurringSlot,
  Schedule,
  Stepper,
  StepperProg,
  StepperStep,
  StepperStepProg,
  TimeInterval,
  User,
  UserInvite,
};
