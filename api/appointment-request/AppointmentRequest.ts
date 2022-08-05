import { relationship, text, timestamp } from "@keystone-6/core/fields";
import { beforeCreateAppointmentRequest } from "./hooks/beforeCreateAppointmentRequest";

const { list } = require("@keystone-6/core");

export const AppointmentRequest = list({
  fields: {
    createdAt: timestamp({
      defaultValue: {
        kind: "now"
      }
    }),
    reason: text(),
    doctor: relationship({ ref: 'Doctor.appointmentRequests' }),
    event: relationship({ ref: "CalendarEvent.appointmentRequests" }),
    patient: relationship({ ref: 'Patient.appointmentRequests' }),
  },
  hooks: {
    // @ts-ignore
    resolveInput: async ({ context, inputData, operation, resolvedData }) => {
      if (operation === "update") {
        return resolvedData;
      }

      if (operation === "create") {
        await beforeCreateAppointmentRequest({ context, inputData, resolvedData });

        return resolvedData;
      }
    },
  },
}) 