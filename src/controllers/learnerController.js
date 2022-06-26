const Learner = require("../model/learner.model");
const { signUpValidator, updateValidator } = require("../utils/validators/learnerValidator");

exports.create = async (req, res) => {
  try {
    const { error, value } = signUpValidator.validate(req.body);
    if (error) {
      throw new Error(error);
    }

    const learner = await new Learner(value);
    const token = await learner.generateAuthToken();
    await learner.save();
    res.send({ status: "success", data: { learner, token } });
  } catch (error) {
    if (error.code) {
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
  try {
    const learner = await Learner.findOne({
      email: req.body.email.toLowercase(),
      password: req.body.password,
    });
    if (!learner) {
      res
        .status(401)
        .send({ status: "error", message: "Invalid email or password" });
      return;
    }
    const token = learner.generateAuthToken()
    res.send({ status: "success", data: { learner, token } });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Authentication error",
    });
  }
};

exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const { error, value } = updateValidator.validate(req.body);
    if (error) {
      res.status(400).send({ status: "error", message: error.message });
      return;
    }
    const learner = req.learner
    for (const update of updates) {
      user[update] = value[update];
    }
    await learner.save();
    res.send({ status: "success", data: learner });
  } catch (error) {
    res
      .status(400)
      .send({
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
    res
      .status(500)
      .send({
        status: "error",
        message: error.message || "failed to upload image",
      });
  }
};

// get profile picture
exports.getProfileImg = async (req, res) => {
  try {
    const learner = req.learner
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
    res
      .status(500)
      .send({
        status: "error",
        message: error.message || "failed to delete profile image",
      });
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
    res
      .status(200)
      .send({
        status: "success",
        message: "logout successfully from all devices",
      });
  } catch (error) {
    res.status(500).ssend({ status: "error", message: "Logout error" });
  }
};
exports.changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const learner = req.learner;
    if (learner.password === currentPassword) {
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
