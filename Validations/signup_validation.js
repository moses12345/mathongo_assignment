const joi  = require('joi')

const signupValidationSchema = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});
module.exports = signupValidationSchema; 