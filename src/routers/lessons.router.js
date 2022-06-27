const router = require("express").Router();
const mentorsAuth = require("../middleware/mentorsAuth");
const lessonController = require("../controllers/lessonController");
const { videoUpload } = require("../utils/uploadFiles");

router.post("/:course_id/add-lesson", mentorsAuth, lessonController.addLesson);
router.post(
  "/:lesson_id/upload-video",
  mentorsAuth,
  videoUpload.single("video"),
  lessonController.uploadVideo
);

module.exports = router;
