const { findById } = require("../models/course");
const Instructor = require("../models/instructor");

// try {
// } catch (e) {
//   throw new Error(e);
// }

const getInstructors = async () => {
  try {
    const instructors = await Instructor.find();
    return instructors;
  } catch (e) {
    throw new Error(e);
  }
};

const getInstructor = async (id) => {
  try {
    return await Instructor.findById(id);
  } catch (e) {
    throw new Error(e);
  }
};

const addInstructor = async (name, qualification, profile, coursesTaught) => {
  const newInstructor = new Instructor({
    name,
    qualification,
    profile,
    coursesTaught,
  });
  await newInstructor.save();
  return newInstructor;
};

const updateInstructor = async (
  intructor_id,
  name,
  qualification,
  profile,
  coursesTaught
) => {
  const updatedInstructor = await Instructor.findByIdAndUpdate(
    intructor_id,
    {
      name,
      qualification,
      profile,
      coursesTaught,
    },
    { new: true }
  );
  return updatedInstructor;
};

const deleteInstructor = async (id) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    return deletedInstructor;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getInstructors,
  getInstructor,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};
