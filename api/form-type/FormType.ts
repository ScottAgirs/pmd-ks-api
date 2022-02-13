import { relationship, text } from "@keystone-6/core/fields";

const { list } = require("@keystone-6/core");

export const FormType = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    forms: relationship({ ref: 'Form.formType', many: true }),
    slug: text({ validation: { isRequired: true } }),
  },
}) 