const UserSchema = require("./Schemas/UserSchema");
const User = require("./Schemas/UserSchema");
const bcrypt = require("bcrypt");
const {
  verifyValidationSchema,
  loginValidationSchema,
  changePasswordLinkSchema,
  signupValidationSchema,
  changePasswordchema,
} = require("./validations.js");

// commom function
const checkForExsiting = async (email) => {
  const exsitUserWithSameEmail = await User.findOne({
    email,
  }).lean();
  if (exsitUserWithSameEmail != null) {
    return true;
  }
  return false;
};

// main apis

// login api
const login = async (req, res) => {
  try {
    const { error } = loginValidationSchema.validate({
      ...req.body,
    });
    if (error) {
      return res
        .status(400)
        .json({ validationerrors: error.details[0].message });
    }
    if (!(await checkForExsiting(req.body.email))) {
      return res.status(400).json({
        message: `User Doesn't Exsit With This ${JSON.stringify(
          req.body.email
        )} Email Id`,
      });
    }
    const user = await UserSchema.findOne({ email: req.body.email }).lean();
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparePassword) {
      return res.json({
        message:`Hi ${user.firstname + " " + user.lastname} You Logged In Successfully`
      });
    }
    return res.status(400).json({ message: "Check your password" });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// sigup or registration api
const signUp = async (req, res) => {
  try {
    const { error } = signupValidationSchema.validate({
      ...req.body,
    });
    if (error) {
      return res
        .status(400)
        .json({ validationerrors: error.details[0].message });
    }
    if (await checkForExsiting(req.body.email)) {
      return res.status(400).json({
        message: `User Already Exsit With This ${JSON.stringify(
          req.body.email
        )} Email Id`,
      });
    }
    const otp = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);
    const user = await new User({
      ...req.body,
      validemailotp: otp,
    });
    await user.save();
    return res.json({
      message: "User Signup Successfully",
      emailotp: user.validemailotp,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// verify email api
const verifyEmail = async (req, res) => {
  try {
    const { error } = verifyValidationSchema.validate({
      ...req.body,
    });
    if (error) {
      return res
        .status(400)
        .json({ validationerrors: error.details[0].message });
    }

    if (!(await checkForExsiting(req.body.email))) {
      return res.status(400).json({
        message: `User Doesn't Exsit With This ${JSON.stringify(
          req.body.email
        )} Email Id`,
      });
    }
    const verify = await User.findOne({
      ...req.body,
    }).lean();
    if (verify) {
      const updateVerify = await User.updateOne(
        { email:req.body.email },
        {
          isemailvalid: true,
        }
      );
      return res.json({
        message: `Your ${JSON.stringify(req.body.email)} Email Id Got Verified`,
      });
    }
    return res
      .status(400)
      .json({ message: `${req.body.validemailotp} is not valid` });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// forget password api
const forgetPassword = async (req, res) => {
  try {
    const { error } = changePasswordLinkSchema.validate({
      ...req.body,
    });
    if (error) {
      return res
        .status(400)
        .json({ validationerrors: error.details[0].message });
    }

    if (!(await checkForExsiting(req.body.email))) {
      return res.status(400).json({
        message: `User Doesn't Exsit With This ${JSON.stringify(
          req.body.email
        )} Email Id`,
      });
    }
    return res.json({
      message: `Email has been sent to this ${req.body.email} Email Id`,
      method: "POST",
      apiendpoint: `https://mathongo-api-assignment.herokuapp.com/api/changepassword?email=${req.body.email}`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// change password api
const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordchema.validate({
      ...req.body,
    });
    if (error) {
      return res
        .status(400)
        .json({ validationerrors: error.details[0].message });
    }
    if (!(await checkForExsiting(req.query.email))) {
      return res.status(400).json({
        message: `User Doesn't Exsit With This ${JSON.stringify(
          req.query.email
        )} Email Id`,
      });
    }
    const encryptpassword = await bcrypt.hash(req.body.password, 10);
    const updatepassword = await User.updateOne(
      { email: req.query.email },
      {
        password: encryptpassword,
      }
    );
    return res.json({
      message: `Your ${JSON.stringify(req.query.email)} Password Has Changed`,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
  return res.json({ message: "hi" });
};
module.exports = {
  login,
  signUp,
  verifyEmail,
  forgetPassword,
  changePassword,
};
