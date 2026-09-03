// import * as yup from "yup";

// export const ticketsSchema = yup.object({
//   ticket: yup.object({
//     name: yup
//       .string()
//       .required("Ticket name is required")
//       .min(2, "Minimum 2 characters"),

//     price: yup
//       .number()
//       .typeError("Price must be a number")
//       .required("Price is required")
//       .min(0, "Price cannot be negative"),

//     seat_zone_id: yup
//       .string()
//       .required("Seat zone is required"),

//     access_type: yup
//       .string()
//       .required("Access type is required"),

//     is_vip: yup.boolean(),

//     benefits: yup.string().nullable(),
//   }),
// });


import * as yup from "yup";

const capitalizeWords = (value) => {
  if (!value) return value;
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const ticketsSchema = (existingTickets = []) =>
  yup.object({
    ticket: yup.object({
      name: yup
        .string()
        .transform((value) => capitalizeWords(value))
        .required("Ticket name is required")
        .min(2, "Minimum 2 characters")
        .max(100, "Maximum 100 characters")

        // ❌ block numbers-only / symbols-only
        .matches(
          /^[A-Za-z][A-Za-z0-9 ]*$/,
          "Ticket name must start with a letter and contain only letters, numbers, and spaces"
        )

        // ❌ first letter must be capital
        .test(
          "first-letter-capital",
          "First letter must be capital",
          (value) => value && value[0] === value[0].toUpperCase()
        )

        // ❌ duplicate ticket name (case-insensitive)
        .test(
          "unique-ticket",
          "Ticket name already exists",
          (value) => {
            if (!value) return true;
            return !existingTickets.some(
              (t) => t.name?.toLowerCase() === value.toLowerCase()
            );
          }
        ),

      price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(0, "Price cannot be negative"),

      seat_zone_id: yup
        .string()
        .required("Seat zone is required"),

      access_type: yup
        .string()
        .required("Access type is required"),

      is_vip: yup.boolean(),

      benefits: yup.string().nullable(),
    }),
  });
