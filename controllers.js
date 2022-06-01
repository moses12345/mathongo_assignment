const Joi = require("joi");
const User = require("./Schemas/UserSchema");
const Signupvalidationschema = require("./Validations/signup_validation");

const login = async (req, res) => {
  const user = await user.findOne({...req.body})
  return res.send("<h1>login hi</h1>");
};

const signUp = async (req, res) => {
  try {
    const { error } = Signupvalidationschema.validate({
      ...req.body,
    });
    if (error) {
      return res.status(400).json({ validationerrors: error });
    }
    const user = await new User({
      ...req.body,
    });
    await user.save();
    return res.json({message:"User Signup Successfully"});
  } catch (err) {
    return res
      .status(500)
      .json({ fields: err.keyValue, message: "Unique Fields, Already Exsits" });
  }
};

const verifyEmail = (req, res) => {
  return res.send("<h1>verifyemail</h1>");
};

const forgetPassword = (req, res) => {
  return res.send("<h1>forgetpassword</h1>");
};
module.exports = {
  login,
  signUp,
  verifyEmail,
  forgetPassword,
};
