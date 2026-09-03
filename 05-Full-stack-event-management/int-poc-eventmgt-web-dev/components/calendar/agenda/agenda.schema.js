import * as yup from "yup";

export const agendaSchema = yup.object({
  agenda_type: yup.string().required("Agenda type is required"),
  title: yup.string().required("Title is required"),

  agenda_date: yup.string().required("Agenda date is required"),
  start_time: yup.string().required("Start time is required"),
  end_time: yup
    .string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (value) {
        const { start_time } = this.parent;
        return !start_time || !value || value > start_time;
      }
    ),

  location: yup.string().nullable(),

  pic_name: yup.string().nullable(),
  pic_role: yup.string().nullable(),
  pic_phone: yup.string().nullable(),
  pic_email: yup.string().email("Invalid email").nullable(),

  notes: yup.string().nullable(),
});
