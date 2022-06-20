const Mentor = require("../model/mentor.model");
const {
  signUpValidator,
  updateValidator,
} = require("../utils/mentorValidator");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
  try {
    const { error, value } = signUpValidator.validate(req.body);
    if (error) {
      throw new Error(error);
    }

    const mentor = new Mentor(value);
    await mentor.save();
    res.send({ status: "success", data: mentor });
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
    const mentor = await Mentor.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!mentor) {
      res
        .status(401)
        .send({ status: "error", message: "Invalid email or password" });
      return;
    }
    res.send(mentor);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "Authentication error",
    });
  }
};

exports.update = async (req, res) => {
  const updates = Object.keys(req.body);
  const { id } = req.params;
  try {
    const { error, value } = updateValidator.validate(req.body);
    if (error) {
      res.status(400).send({ status: "error", message: error.message });
      return;
    }
    const mentor = await Mentor.findById(id);
    if (!mentor) {
      throw new Error();
    }
    for (const update of updates) {
      mentor[update] = value[update];
    }
    await mentor.save();
    res.send(mentor);
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: `can't update mentor with id ${id}`,
    });
  }
};

exports.changePassword = (req, res) => {
  try {
    const id = req.params.id;
    const mentor = Mentor.findById(id);
    if (!mentor) return new Error("No mentor found");
    if (mentor.password === req.body.currentPassword) {
      mentor.password = req.body.password;
      mentor.save();
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

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // checking if mentor with this email exists in database
    const mentor = await Mentor.findOne({ email });
    if (mentor.length) {
      // making a one timelink that will expire in 15 minutes
      const JWT_SECRET = "THIS is some secret";
      const SECRET = JWT_SECRET + mentor.password;
      const payload = {
        _id: mentor._id,
        email: mentor.email,
      };
      const token = jwt.sign(payload, SECRET, { expiresIn: "15m" });
      const link = `http://localhost:3000/${mentor._id}/${token}`;
      // send link to email
      // sendMail(link, mentor.email)
      res.status(200).send({
        status: "success",
        message: "reset password link has been sent to your email",
      });
    } else {
      throw new Error("No mentor found");
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "password reset failed",
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const mentor = await Mentor.findById(id);
    if (mentor.length) {
      const secret = JWT_SECRET + mentor.password;
      const payload = jwt.verify(token, secret);
      if (payload.email.toLowerCase() === mentor.email) {
        mentor.password = password;
        await mentor.save();
        res
          .status(200)
          .send({ status: "success", message: "password reset successfull" });
        return;
      }
    } else {
      throw new Error("password reset error");
    }
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message || "password reset failure",
    });
  }
};
