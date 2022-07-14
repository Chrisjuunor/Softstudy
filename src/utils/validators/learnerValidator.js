const Joi = require("joi");

const signUpSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
  dateOfBirth: Joi.date().less("now").required(),
});
const updateSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  dateOfBirth: Joi.date().less("now"),
});

const personalityTestSchema = Joi.object({
  bestFormOfLearning: Joi.string().required(),
  bestReadingTime: Joi.string().required(),
  likeOrganizationTools: Joi.string().required(),
  canManageExamsPressure: Joi.string().required(),
  meetLikeMindedPersons: Joi.string().required(),
  likeStudyGroups: Joi.string().required(),
  preparationPreference: Joi.string().required(),
  completeTaskBeforeRelaxing: Joi.string().required(),
  struggleWithDeadline: Joi.string().required(),
  likeStudying: Joi.string().required(),
});

module.exports = {
  signUpSchema,
  updateSchema,
  personalityTestSchema,
};
