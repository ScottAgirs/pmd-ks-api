import { integer, relationship, text, timestamp } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

/**
 * Medication is ..
 */
export const Medication = list({
  fields: {
    activeIngredient: text({ isIndexed: true }),
    companyName: text(),
    drugCode: integer({ isIndexed: true }),
    // QUESTION: [HealthCanada]: Can the brandName be not UNIQUE?
    brandName: text({ isIndexed: true }),
    dosageCount: integer({ 
      // validation:{
      //   isRequired: true,
      // }
    }),
    dosageUnit: text({ 
      // validation:{
      //   isRequired: true,
      // }  
    }),
    patient: relationship({ ref: 'Patient.medications' }),
    prescription: relationship({ ref: 'Prescription.medications' }),
    prescriptionItem: relationship({ ref: 'PrescriptionItem.medication' }),
  },
})