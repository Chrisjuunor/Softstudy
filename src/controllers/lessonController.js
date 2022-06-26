const Lesson = require("../model/lesson.model")

exports.addLesson =async (req, res)=> {
  const {course_id} = req.params
  try {
    const lesson = new Lesson({...req.body, course: course_id})
    await lesson.save()
    res.send({status: "succcess", data: lesson})
  } catch (error) {
    res.status(400).send({
      status: "error",
      messaage: error.message || "Failed to add lesson. Try again",
    });
  }
}

exports.uploadVideo = async (req, res)=> {
  try {
    const {lesson_id} = req.params
    const video = req.file.buffer
    const lesson = await Lesson.findById(lesson_id)
    lesson.video = video
    await lesson.save()
    res.send({ status: "success", message: "video uploaded successfully" });
  } catch (error) {
    res.status(400).send({
      status: "error",
      messaage: error.message || "Failed to add lesson. Try again",
    });
  }
}