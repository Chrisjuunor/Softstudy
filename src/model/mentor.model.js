const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  areaOfSpeciality: {
    type: String,
    trim: true,
    required: true,
  },
}, {timestamps: true});


const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
