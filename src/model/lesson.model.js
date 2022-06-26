const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    video: {
      type: Buffer
    },
    text: {
      type: String,
      required: true
    },
    course:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }
  },
  { timestamps: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
