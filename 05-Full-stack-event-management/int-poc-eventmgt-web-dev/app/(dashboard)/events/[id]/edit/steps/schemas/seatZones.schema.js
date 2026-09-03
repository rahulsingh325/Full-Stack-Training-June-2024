// import * as yup from "yup";

// export const seatZonesSchema = yup.object({
//   zone: yup.object({
//     name: yup
//       .string()
//       .required("Zone name is required")
//       .min(2, "Minimum 2 characters")
//       .max(100, "Maximum 100 characters"),

//     gate_no: yup
//       .number()
//       .typeError("Gate number must be a number")
//       .required("Gate number is required")
//       .integer("Gate number must be an integer")
//       .positive("Gate number must be greater than 0"),

//     capacity: yup
//       .number()
//       .typeError("Capacity must be a number")
//       .required("Capacity is required")
//       .integer("Capacity must be an integer")
//       .positive("Capacity must be greater than 0"),
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

export const seatZonesSchema = (existingZones = []) =>
  yup.object({
    zone: yup.object({
      name: yup
        .string()
        .transform((value) => capitalizeWords(value))
        .required("Zone name is required")
        .min(2, "Minimum 2 characters")
        .max(100, "Maximum 100 characters")

        // ❌ numbers-only / symbols-only block
        .matches(
          /^[A-Za-z][A-Za-z0-9 ]*$/,
          "Zone name must start with a letter and contain only letters, numbers, and spaces"
        )

        // ❌ first letter capital enforce
        .test(
          "first-letter-capital",
          "First letter must be capital",
          (value) => value && value[0] === value[0].toUpperCase()
        )

        // ❌ duplicate name block (case-insensitive)
        .test(
          "unique-zone",
          "Zone name already exists",
          (value) => {
            if (!value) return true;
            return !existingZones.some(
              (z) => z.name.toLowerCase() === value.toLowerCase()
            );
          }
        ),

      gate_no: yup
        .number()
        .typeError("Gate number must be a number")
        .required("Gate number is required")
        .integer("Gate number must be an integer")
        .positive("Gate number must be greater than 0")
        .max(100, "Gate number seems invalid"),

      capacity: yup
        .number()
        .typeError("Capacity must be a number")
        .required("Capacity is required")
        .integer("Capacity must be an integer")
        .positive("Capacity must be greater than 0")
        .max(100000, "Capacity too large for a single zone"),
    }),
  });
