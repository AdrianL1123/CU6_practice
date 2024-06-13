const express = require("express");
const router = express.Router();

// instruction: import the course model
const Course = require("../models/course");

const {
  getCourse,
  getCourses,
  addCourse,
  updateCourse,
} = require("../controllers/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (req, res) => {
  try {
    const { instructor } = req.query;
    const courses = await getCourses(instructor);
    res.status(200).send(courses);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (req, res) => {
  try {
    const course = await getCourse(req.params.id);
    if (course) {
      res.status(200).send(course);
    } else {
      res.status(404).send({ message: "Course not found!" });
    }
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (req, res) => {
  try {
    const {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    } = req.body;
    const newCourse = await addCourse(
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount
    );
    res.status(200).send(newCourse);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (req, res) => {
  try {
    const {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    } = req.body;
    const course_id = req.params.id;
    const updatedCourse = await updateCourse(
      course_id,
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount
    );
    res.status(200).send(updatedCourse);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`
router.delete("/:id", async (req, res) => {
  try {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteCourse);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

// instruction: export the router
module.exports = router;
