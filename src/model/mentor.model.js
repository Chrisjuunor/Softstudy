const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_SALT, JWT_SECRET } = require("../utils/secrets");
const mentorSchema = new mongoose.Schema(
  {
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
    profileImg: {
      type: Buffer
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

mentorSchema.methods.toJSON = function() {
  const mentor = this;
  const mentorObject = mentor.toObject();
  delete mentorObject.password;
  delete mentorObject.tokens;
  return mentorObject;
};

// creating generateAuthToken method that generate and return a token
mentorSchema.methods.generateAuthToken = async function () {
  const mentor = this;
  const token = jwt.sign({ _id: mentor._id.toString() }, JWT_SECRET);
  mentor.tokens = mentor.tokens.concat({ token });
  mentor.save();
  return token;
};

// hash mentors password when saving or updating a new mentor details
mentorSchema.statics.findByCredentials = async (email, password) => {
  const mentor = await Mentor.findOne({ email });
  if (!mentor) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, mentor.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return mentor;
};

mentorSchema.pre("save", async function (next) {
  const mentor = this;
  if (mentor.isModified("password")) {
    mentor.password = await bcrypt.hash(mentor.password, Number(BCRYPT_SALT));
  }
  next();
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
