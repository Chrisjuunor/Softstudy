const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_SALT, JWT_SECRET } = require("../utils/secrets");

const learnerSchema = new mongoose.Schema(
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
    dateOfBirth: {
      type: Date,
    },
    profileImg: {
      type: Buffer,
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

learnerSchema.methods.toJSON = function () {
  const learner = this;
  const learnerObject = learner.toObject();
  delete learnerObject.password;
  delete learnerObject.tokens;
  return learnerObject;
};

// creating generateAuthToken method that generate and return a token
learnerSchema.methods.generateAuthToken = async function () {
  const learner = this;
  const token = jwt.sign({ _id: learner._id.toString() }, JWT_SECRET);
  learner.tokens = learner.tokens.concat({ token });
  learner.save();
  return token;
};

// hash learners password when saving or updating a new learner details
learnerSchema.statics.findByCredentials = async (email, password) => {
  const learner = await Learner.findOne({ email });
  if (!learner) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, learner.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  return learner;  
};

learnerSchema.pre("save", async function (next) {
  const learner = this;
  if (learner.isModified("password")) {
    learner.password = await bcrypt.hash(learner.password, Number(BCRYPT_SALT));
  }
  next();
});

const Learner = mongoose.model("Learner", learnerSchema);

module.exports = Learner;
