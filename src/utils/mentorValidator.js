const Joi = require("joi");

const signUpValidator = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
  areaOfSpeciality: Joi.string().trim().required(),
});
const updateValidator = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  areaOfSpeciality: Joi.string().trim(),
});

module.exports = { signUpValidator, updateValidator };
