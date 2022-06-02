const router = require("express").Router();
const controllers = require("./controllers");

router.post("/login", (req, res) => controllers.login(req, res));
router.post("/signup", (req, res) => controllers.signUp(req, res));
router.post("/verifyemail", (req, res) => controllers.verifyEmail(req, res));
router.post("/forgetpassword", (req, res) =>
  controllers.forgetPassword(req, res)
);
router.post("/changepassword", (req, res) =>
  controllers.changePassword(req, res)
);

module.exports = router;
