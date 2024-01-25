import * as Yup from "yup";

 export let addStudentSchema = Yup.object({
  firstName: Yup.string()
    .required("first name is required")
    .trim()
    .max(55, "first name must be 55 character"),
  lastName: Yup.string()
    .required("first name is required")
    .trim()
    .max(55, "first name must be 55 character"),
  dob: Yup.date(),
  gender: Yup.string().oneOf(["male", "female", "other"]),
  email: string().email().lowercase().required("email is required"),
});
