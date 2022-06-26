const Joi = require("joi");

const signUpValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date().less("now").required(),
});
const updateValidator = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  dateOfBirth: Joi.date().less("now"),
});

module.exports = { signUpValidator, updateValidator };
