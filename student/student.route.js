import express from "express";
import { addStudentSchema } from "./student_validation.js";
import { Student } from "./student.model.js";
import { validatedReqBody } from "../middleware/validaton.middleware.js";

const router = router();

// // add student route

// router.post("/student/add", async (req, res) => {
//   //extract new student from req.body
//   const newStudent = req.body;
//   //! aaba req ko body ko student lai database bhanda pailai validate garnu paryo .we use is Yup. for writing schema and middleware for validaton using code
//   let validatedStudentData;
//   try {
//     const validatedStudentData = await studentSchema.validate(newStudent);
//   } catch (error) {
//     return res.status(400).send({ message: error.message });
//   }
//   //! aaba palo mongodb ko
//   //! firstly find the student if provided name is present or not .If present thorw error
//   const student = await Student.findOne({ email: validatedStudentData.email });
//   if (student) {
//     return res
//       .status(201)
//       .send({ message: "student with provided email already exist" });
//   }
//  await Student.create(newStudent);
//     return res.status(201).send({ message: "student added successfully" });
  
// });

// rou
router.post(
  "/student/add",
  validatedReqBody(addStudentSchema),
  async (req, res) => {
    const newStudent = req.body;

    const requiredStudent = await Student.findOne({ email: newStudent.email });
    if (requiredStudent) {
      return res.status(400).send({ message: "emil already exists" });
    }
    await Student.create(newStudent);
    return res.status(201).send({ message: "student added successfully" });
  }
);
