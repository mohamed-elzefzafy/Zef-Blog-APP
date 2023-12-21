const router = require("express").Router();
const { register, login, verifyUserAccount } = require("../controllers/authController");



router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:userId/verify/:token").get(verifyUserAccount);


module.exports = router;