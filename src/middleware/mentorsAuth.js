const Mentor = require("../model/mentor.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/secrets");

const mentorsAuth = async (req, res, next) => {
  try {
    const token = req.header["Authorization"].splice(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    const mentor = await Mentor.findOne({_id: decoded._id,"tokens.token": token});
    if(!mentor){
      throw new Error()
    }
    req.token = token
    req.mentor = mentor
    next()
  } catch (error) {
    res.status(401).send({status: "error", message: "Please authenticate"})
  }
};

module.exports = mentorsAuth;
