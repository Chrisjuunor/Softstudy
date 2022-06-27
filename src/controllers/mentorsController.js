const Mentor = require("../model/mentor.model");
// const sharp = require("sharp");

const {
  signUpValidator,
  updateValidator,
} = require("../utils/validators/mentorValidator");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  try {
    const { error, value } = signUpValidator.validate(req.body);
    if (error) {
      throw new Error(error);
    }

    const mentor = new Mentor(value);
    await mentor.save();
    const token = await mentor.generateAuthToken();
    res.send({ status: "success", data: { mentor, token } });
  } catch (error) {
    if (error.code) {
      res
        .status(400)
        .send({ status: "error", message: "Email already exist!" });
      return;
    }
    res.status(400).send({
      status: "error",
      messaage: error.message || "Failed to create mentor. Try again",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const mentor = await Mentor.findByCredentials(
      email.toLowerCase(),
      password
    );
    const token = await mentor.generateAuthToken();
    res.send({ status: "success", data: { mentor, token } });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Authentication error",
    });
  }
};

// upload profile image
exports.addProfileImg = async (req, res) => {
  try {
    // converting and resizing user uploaded image
    // const buffer = await sharp(req.file.buffer)
    //   // .resize({ height: 250, width: 250 })
    //   .png()
    //   .toBuffer();

    req.mentor.profileImg = req.file.buffer;
    await req.mentor.save();
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
    const mentor = req.mentor
    if (!mentor || !mentor.profileImg) {
      return res
        .status(404)
        .send({ status: "error", error: "No profile image found" });
    }
    res.set("Content-Type", "image/jpeg");
    res.send(mentor.profileImg);
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: error.message || "some error occurred" });
  }
};
//delete profile image
exports.removeProfileImg = async (req, res) => {
  try {
    req.mentor.profileImg = undefined;
    await req.mentor.save();
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
    req.mentor.tokens = req.mentor.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.mentor.save();
    res.status(200).send({ status: "success", message: "logout successfully" });
  } catch (error) {
    res.status(500).ssend({ status: "error", message: "Logout error" });
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.mentor.tokens = [];
    await req.mentor.save();
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

exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const { error, value } = updateValidator.validate(req.body);
    if (error) {
      res.status(400).send({ status: "error", message: error.message });
      return;
    }
    const mentor = req.mentor;
    if (!mentor) {
      throw new Error();
    }
    for (const update of updates) {
      mentor[update] = value[update];
    }
    await mentor.save();
    res.send({ status: "success", data: mentor });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Profile update failed",
    });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const mentor = req.mentor;
    if (mentor.password === currentPassword) {
      mentor.password = newPassword;
      await mentor.save();
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

// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     // checking if mentor with this email exists in database
//     const mentor = await Mentor.findOne({ email });
//     if (mentor.length) {
//       // making a one timelink that will expire in 15 minutes
//       const JWT_SECRET = "THIS is some secret";
//       const SECRET = JWT_SECRET + mentor.password;
//       const payload = {
//         _id: mentor._id,
//         email: mentor.email,
//       };
//       const token = jwt.sign(payload, SECRET, { expiresIn: "15m" });
//       const link = `http://localhost:3000/${mentor._id}/${token}`;
//       // send link to email
//       // sendMail(link, mentor.email)
//       res.status(200).send({
//         status: "success",
//         message: "reset password link has been sent to your email",
//       });
//     } else {
//       throw new Error("No mentor found");
//     }
//   } catch (error) {
//     res.status(400).send({
//       status: "error",
//       message: error.message || "password reset failed",
//     });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;
//   try {
//     const mentor = await Mentor.findById(id);
//     if (mentor.length) {
//       const secret = JWT_SECRET + mentor.password;
//       const payload = jwt.verify(token, secret);
//       if (payload.email.toLowerCase() === mentor.email) {
//         mentor.password = password;
//         await mentor.save();
//         res
//           .status(200)
//           .send({ status: "success", message: "password reset successfull" });
//         return;
//       }
//     } else {
//       throw new Error("password reset error");
//     }
//   } catch (error) {
//     res.status(400).send({
//       status: "error",
//       message: error.message || "password reset failure",
//     });
//   }
// };
