const Learner = require("../model/learner.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/secrets");

const learnersAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").slice(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    const learner = await Learner.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!learner) {
      throw new Error();
    }
    req.token = token;
    req.learner = learner;
    next();
  } catch (error) {
    res.status(401).send({ status: "error", message: "Please authenticate" });
  }
};

module.exports = learnersAuth;
