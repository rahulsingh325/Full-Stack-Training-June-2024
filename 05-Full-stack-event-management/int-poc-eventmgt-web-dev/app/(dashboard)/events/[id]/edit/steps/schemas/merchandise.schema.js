import * as yup from "yup";

export const merchandiseSchema = yup.object({
  merch: yup.object({
    name: yup
      .string()
      .required("Item name is required"),

    price: yup
      .number()
      .typeError("Price must be a number")
      .min(0, "Price cannot be negative")
      .required("Price is required"),

    stock: yup
      .number()
      .typeError("Stock must be a number")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),

    description: yup
      .string()
      .nullable(),

    image: yup
      .mixed()
      .nullable(),
  }),
});
