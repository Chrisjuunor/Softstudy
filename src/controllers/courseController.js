const Course = require("../model/course.model")
const Lesson = require("../model/lesson.model")

exports.create = async (req, res)=> {
try{
  const course = new Course(req.body)
  await course.save();

  res.send({ status: "success", data: course});
}catch(error){
  res.status(400).send({
    status: "error",
    messaage: error.message || "Failed to create course. Try again",
  });
}
}

exports.uploadBanner = async (req, res) => {
try {
  const banner = req.file.buffer

  const course = await Course.findById(req.params._id)
  course.banner = banner
  await course.save()
  res.send({status: "success", message: "Banner uploaded successfully"})
} catch (error) {
   res.status(400).send({ status: "error", messaage: error.message || "No course found" });
}
}

exports.getBanner = async (req, res) => {
  try {
    const course = await Course.findById(req.params._id);
    if (!course || !course.banner) {
      return res
        .status(404)
        .send({ status: "error", error: "No profile image found" });
    }
    res.set("Content-Type", "image/jpeg");
    res.send(course.banner);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: error.message || "some error occurred" });
  }
};

exports.getAll = async (req, res) => {
  const match = {};
  const sort = {};
try {
  const courses = await Course.find({})
  res.send({status: "success", data: courses})
} catch (error) {
  res.status(400).send({status: "error", messaage: error.message || "No course found" });
}
}

exports.getOne = async (req, res) => {
  
  const {_id}= req.params
  try {
    const course = await Course.findOne({_id })
    const lessons = await Lesson.find({course: _id})
    res.send({courseDetails:course, courseLessons:lessons});
  } catch (error) {
    res.status(400).send({
      status: "error",
      messaage: error.message || "No Lessons found",
    });
  }
}