// import * as yup from "yup";

// export const basicDetailsSchema = yup.object({
//     basic_details: yup.object({
//         name: yup
//             .string()
//             .required("Event name is required"),

//         category_id: yup
//             .string()
//             .required("Category is required"),

//         description: yup
//             .string()
//             .required("Description is required"),

//         location: yup
//             .string()
//             .nullable(),

//         event_date: yup.string().when("$isEdit", {
//             is: true,
//             then: (s) => s.notRequired(),
//             otherwise: (s) => s.required("Event date is required"),
//         }),
//         start_time: yup.string().when("$isEdit", {
//             is: true,
//             then: (s) => s.notRequired(),
//             otherwise: (s) => s.required("Start time is required"),
//         }),
//         end_time: yup.string().when("$isEdit", {
//             is: true,
//             then: (s) => s.notRequired(),
//             otherwise: (s) => s.required("End time is required"),
//         }),


//         gate_open_time: yup
//             .string()
//             .nullable(),

//         last_entry_time: yup
//             .string()
//             .nullable(),

//         terms: yup
//             .string()
//             .nullable(),

//         banner_image: yup.mixed().when("$isEdit", {
//             is: true,
//             then: (schema) => schema.nullable(),
//             otherwise: (schema) => schema.required("Banner image is required"),
//         }),

//     }),
// });


import * as yup from "yup";

export const basicDetailsSchema = yup.object({
  basic_details: yup.object({

    name: yup
      .string()
      .required("Event name is required"),

    category_id: yup
      .string()
      .required("Category is required"),

    description: yup
      .string()
      .required("Description is required"),

    location: yup
      .string()
      .nullable(),

    event_date: yup.string().when("$isEdit", {
      is: true,
      then: (s) => s.notRequired(),
      otherwise: (s) => s.required("Event date is required"),
    }),

    start_time: yup.string().when("$isEdit", {
      is: true,
      then: (s) => s.notRequired(),
      otherwise: (s) => s.required("Start time is required"),
    }),

    end_time: yup.string().when("$isEdit", {
      is: true,
      then: (s) => s.notRequired(),
      otherwise: (s) => s.required("End time is required"),
    }),

    gate_open_time: yup.string().nullable(),
    last_entry_time: yup.string().nullable(),

    /* =========================
       PRE SHOW
    ========================= */
    has_pre_show: yup.boolean().default(false),

    pre_show_start: yup.string().when("has_pre_show", {
      is: true,
      then: (s) => s.required("Pre-show start time required"),
      otherwise: (s) => s.nullable(),
    }),

    pre_show_end: yup.string().when("has_pre_show", {
      is: true,
      then: (s) => s.required("Pre-show end time required"),
      otherwise: (s) => s.nullable(),
    }),

    /* =========================
       OPENING
    ========================= */
    has_opening: yup.boolean().default(false),

    opening_start: yup.string().when("has_opening", {
      is: true,
      then: (s) => s.required("Opening start time required"),
      otherwise: (s) => s.nullable(),
    }),

    opening_end: yup.string().when("has_opening", {
      is: true,
      then: (s) => s.required("Opening end time required"),
      otherwise: (s) => s.nullable(),
    }),

    terms: yup.string().nullable(),

    banner_image: yup.mixed().when("$isEdit", {
      is: true,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.required("Banner image is required"),
    }),
  }),
});
