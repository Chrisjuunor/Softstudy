const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    banner: Buffer
  },
  { timestamps: true }
);

courseSchema.virtual("courseLessons", {
  ref: "Lesson",
  localField: "_id",
  foreignField: "course",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
