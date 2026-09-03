import * as yup from "yup";

const activeEventSchema = yup.object({
  basic_details: yup.object({
    description: yup.string().required("Description is required"),
  }),

  terms_conditions: yup
    .string()
    .required("Terms & Conditions required"),
});

export default activeEventSchema;
