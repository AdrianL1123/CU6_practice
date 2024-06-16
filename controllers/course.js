const Course = require("../models/course");

// try {
// } catch (e) {
//   throw new Error(e);
// }

const getCourses = async () => {
  try {
    const courses = await Course.find().populate("instructor");
    return courses;
  } catch (e) {
    throw new Error(e);
  }
};

const getCourse = async (id) => {
  try {
    return await Course.findById(id).populate("instructor");
  } catch (e) {
    throw new Error(e);
  }
};

const addCourse = async (
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const newCourse = new Course({
    title,
    instructor,
    startDate,
    endDate,
    subject,
    description,
    enrollmentCount,
  });
  await newCourse.save();
  return newCourse;
};

const updateCourse = async (
  course_id,
  title,
  instructor,
  startDate,
  endDate,
  subject,
  description,
  enrollmentCount
) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    course_id,
    {
      title,
      instructor,
      startDate,
      endDate,
      subject,
      description,
      enrollmentCount,
    },
    { new: true }
  );
  return updatedCourse;
};

const deleteCourse = async (id) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    return deletedCourse;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
