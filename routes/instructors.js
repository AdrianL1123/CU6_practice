const express = require("express");
const router = express.Router();

const {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = require("../controllers/instructor");
// instruction: import the book model

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await getInstructors();
    res.status(200).send(instructors);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});
// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/:id", async (req, res) => {
  try {
    const intructor = await getInstructor(req.params.id);
    if (intructor) {
      res.status(200).send(intructor);
    } else {
      res.status(404).send({ message: "Instructor not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  try {
    const { name, qualification, profile, coursesTaught } = req.body;
    const newInstructor = await addInstructor(
      name,
      qualification,
      profile,
      coursesTaught
    );
    res.status(200).send(newInstructor);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  try {
    const { name, qualification, profile, coursesTaught } = req.body;
    const instructor_id = req.params.id;
    const updatedInstructor = await updateInstructor(
      instructor_id,
      name,
      qualification,
      profile,
      coursesTaught
    );
    res.status(200).send(updatedInstructor);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});
// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    const deletedInstructor = await deleteInstructor(req.params.id);
    res.status(200).send(deletedInstructor);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

// instruction: export the router
module.exports = router;
