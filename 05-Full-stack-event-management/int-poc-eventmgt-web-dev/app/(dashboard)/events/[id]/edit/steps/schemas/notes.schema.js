
import * as yup from "yup";

/* =========================
   NOTES
========================= */
export const notesSchema = yup.object({
  note: yup.object({
    text: yup
      .string()
      .trim()
      .required("Note is required"),
  }),
});

/* =========================
   ARTISTS
========================= */
export const artistSchema = yup.object({
  artist: yup.object({
    name: yup
      .string()
      .trim()
      .required("Artist name is required"),

    role: yup
      .string()
      .trim()
      .nullable(),

    display_order: yup
      .number()
      .typeError("Display order must be a number")
      .integer("Display order must be an integer")
      .min(1, "Display order must be at least 1")
      .required("Display order is required"),
  }),
});

/* =========================
   PROHIBITED ITEMS
========================= */
export const prohibitedItemSchema = yup.object({
  item: yup.object({
    title: yup.string().required("Title is required"),
    icon_key: yup.string().required("Icon is required"),
    note: yup.string().nullable(),
  }),
});
