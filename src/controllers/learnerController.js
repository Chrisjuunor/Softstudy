const Learner = require("../model/learner.model");
const bcrypt = require("bcrypt");
const {
  signUpSchema,
  updateSchema,
  personalityTestSchema,
} = require("../utils/validators/learnerValidator");

exports.create = async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
      throw new Error(error);
    }
    const learner = await new Learner(value);
    await learner.save();
    const token = await learner.generateAuthToken();
    res.status(201).send({ status: "success", data: { learner, token } });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .send({ status: "error", message: "Email already exist!" });
      return;
    }
    res.status(400).send({
      status: "error",
      messaage: error.message || "Failed to create user. Try again",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const learner = await Learner.findByCredentials(
      email.toLowerCase(),
      password
    );
    if (!learner) {
      res
        .status(401)
        .send({ status: "error", message: "Invalid email or password" });
      return;
    }
    const token = await learner.generateAuthToken();
    res.send({ status: "success", data: { learner, token } });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Authentication error",
    });
  }
};
exports.getLearnerDetails = (req, res) => {
res.send(req.learner)
}
exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      res.status(400).send({ status: "error", message: error.message });
      return;
    }
    const learner = req.learner;
    for (const update of updates) {
      user[update] = value[update];
    }
    await learner.save();
    res.send({ status: "success", data: learner });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Failed to update user details",
    });
  }
};

exports.addProfileImg = async (req, res) => {
  try {
    // converting and resizing user uploaded image
    // const buffer = await sharp(req.file.buffer)
    //   // .resize({ height: 250, width: 250 })
    //   .png()
    //   .toBuffer();

    req.learner.profileImg = req.file.buffer;
    await req.learner.save();
    res.send({ status: "success", message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message || "failed to upload image",
    });
  }
};

// get profile picture
exports.getProfileImg = async (req, res) => {
  try {
    const learner = req.learner;
    if (!learner.profileImg) {
      return res
        .status(404)
        .send({ status: "error", error: "No profile image found" });
    }
    res.set("Content-Type", "image/jpeg");
    res.send(learner.profileImg);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: error.message || "some error occurred" });
  }
};
//delete profile image
exports.removeProfileImg = async (req, res) => {
  try {
    req.learner.profileImg = undefined;
    await req.learner.save();
    res.send({ status: "success", message: "Profile image deleted" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message || "failed to delete profile image",
    });
  }
};

exports.addPersonalityTest = async (req, res) => {
  const { error, value } = personalityTestSchema.validate(req.body);
  if (error) {
    return res.status(404).send({ status: "error", message: error.message });
  }

  try {
    req.learner.personalityTest = value;
    await req.learner.save();
    res.send({
      status: "success",
      message: "Learner personality test successfully added",
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    req.learner.tokens = req.learner.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.learner.save();
    res.status(200).send({ status: "success", message: "logout successfully" });
  } catch (error) {
    res.status(500).ssend({ status: "error", message: "Logout error" });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.learner.tokens = [];
    await req.learner.save();
    res.status(200).send({
      status: "success",
      message: "logout successfully from all devices",
    });
  } catch (error) {
    res.status(500).ssend({ status: "error", message: "Logout error" });
  }
};
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const learner = req.learner;
    const isMatch = await bcrypt.compare(currentPassword, learner.password);
    if (isMatch) {
      learner.password = newPassword;
      learner.save();
      res.send({
        status: "success",
        message: "Password updated successfully!",
      });
    } else {
      throw new Error("Wrong password");
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "password update failed",
    });
  }
};
