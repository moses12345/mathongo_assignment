const joi = require("joi");
const loginValidationSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
const signupValidationSchema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
const verifyValidationSchema = joi.object({
  email: joi.string().email().required(),
  validemailotp: joi.string().length(4).required(),
});
const changePasswordLinkSchema = joi.object({
  email: joi.string().email().required(),
});
const changePasswordchema = joi.object({
  password: joi.string().required(),
});
module.exports = {
  verifyValidationSchema,
  loginValidationSchema,
  changePasswordLinkSchema,
  signupValidationSchema,
  changePasswordchema,
};
