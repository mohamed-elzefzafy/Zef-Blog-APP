const { sendResetPassword, getResetPasswordLink, resetPassword } = require("../controllers/passwordController");

const router = require("express").Router();


router.route("/reset-password-link").post(sendResetPassword);
router.route("/reset-password/:userId/:token").get(getResetPasswordLink)
                                              .post(resetPassword);


module.exports = router;