import express from "express";
import { Course } from "./course.model.js";
import { checkMongoIdValidity } from "../check_mongoID_validity.js";
import { validatedReqBody } from "../middleware/validaton.middleware.js";
import { addCourseSchema } from "./course.validation.js";

const router = express.Router();

//! add course

router.post("/course/add", validatedReqBody(addCourseSchema),

async (req, res) => {
  //   console.log(req.body);
  const newCourse = req.body;

  const requiredCourse = await Course.findOne({ name: newCourse.name });
  if (requiredCourse) {
    return res
      .status(404)
      .send({ message: "course with this name is already exists" });
  }
  await Course.create(newCourse);

  return res.status(201).send({ message: "course is added successfully" });
});

//! get course details

router.get("/course/details/:id", async (req, res) => {
  //extract id from req.params
  const courseId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(courseId);

  //if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  //find course
  const course = await Course.findOne({ _id: courseId });

  // if not course,thorow error
  if (!course) {
    return res.status(404).send({ message: "course doesnot exist" });
  }

  //return course as response
  return res.status(200).send(course);
});

//! delete course

router.delete("/course/delete/:id", async (req, res) => {
  //extract id from req.params
  const courseId = req.params.id;

  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(courseId);

  //if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }

  //find course
  const course = await Course.findOne({ _id: courseId });

  // if not course,thorow error
  if (!course) {
    return res.status(404).message({ message: "course doesnot exist" });
  }
  //delete course
  await Course.deleteOne({ _id: courseId });

  return res.status(201).send({ message: "course is deleted successfully" });
});

//! edit course

router.put("/course/edit/:id", async (req, res) => {
  // extract id from req.params
  const courseId = req.params.id;
  // check for mongo id validity
  const isValidMongoId = checkMongoIdValidity(courseId);

  // if not valid mongo id, throw error
  if (!isValidMongoId) {
    return res.status(400).send({ message: "Invalid mongo id" });
  }
  // find course
  const requiredCourse = Course.findOne({ _id: courseId });
  // if not course, throw error
  if (!requiredCourse) {
    return res.status(400).send({ message: "course doesnot exist" });
  }
  // extract new values from req.body
  const newValues = req.body;
  // edit course
  await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        // name: newValues.name,
        // price: newValues.price,
        // duration: newValues.duration,
        // tutorName: newValues.tutorName,
        ...newValues,
      },
    }
  );
  // send response
  return res.status(201).send({ message: "course updated successfully" });
});

//! get course list

router.post("/course/list", async (req, res) => {
  const page = req.body.page;
  const limit = req.body.limit;

  //calculating skip
  const skip = (page - 1) * limit;

  const courseList = await Course.aggregate([
    { $match: {} },
    { $skip: skip },
    { $limit: limit },
  ]);

  return res.status(201).send({ message: "success", courses: courseList });
});
export default router;
