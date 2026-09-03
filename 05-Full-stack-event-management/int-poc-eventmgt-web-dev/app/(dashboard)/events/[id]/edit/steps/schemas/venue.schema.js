import * as yup from "yup";

export const venueSchema = yup.object({
    venue: yup.object({
        name: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        country: yup.string().required(),

        state: yup.string().nullable(),
        map_link: yup.string().url().nullable(),
        landmark: yup.string().nullable(),

        has_parking: yup.boolean().required(),
        gates_count: yup
            .number()
            .required()
            .min(1),

        seat_plan_image: yup
            .mixed()
            .required("Seat plan image is required"),

        map_image: yup
            .mixed()
            .required("Venue map image is required"),

        by_car: yup.string().nullable(),
        by_metro: yup.string().nullable(),
        by_bus: yup.string().nullable(),
    }),
});
