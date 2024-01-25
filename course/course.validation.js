import * as Yup from "yup";

export const addCourseSchema = Yup.object({
  name: Yup.string().required().trim().max(55),
  price: Yup.number().required(),
  duration: Yup.string().required(),
  tutorName: Yup.string().required().max(55),
});
