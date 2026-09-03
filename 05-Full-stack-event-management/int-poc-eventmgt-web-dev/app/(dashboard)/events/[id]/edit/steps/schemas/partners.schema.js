import * as yup from "yup";

export const partnersSchema = yup.object({
  partner: yup.object({
    name: yup
      .string()
      .required("Partner name is required"),

    role: yup
      .string()
      .nullable(),

    website: yup
      .string()
      .url("Invalid website URL")
      .nullable(),

    logo: yup
      .mixed()
      .nullable(),
  }),
});
