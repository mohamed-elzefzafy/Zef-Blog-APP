const express = require("express");
const { getAllUsers, getOneUser, updateUser, getUsersCount, profilePhotoUpload } = require("../controllers/userController");
const { verifyToken, verifyTokenAndAdmin , verifyTokenAndOnlyUser } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const router = express.Router();


router.route("/profile").get( verifyTokenAndAdmin , getAllUsers);
router.route("/profile/:id").get(  validateObjectId, verifyToken , getOneUser)
                            .put(validateObjectId , verifyTokenAndOnlyUser , updateUser);
router.route("/profile/profile-photo-upload").post(verifyToken , photoUpload.single("image") , profilePhotoUpload)
router.route("/count").get(verifyTokenAndAdmin , getUsersCount)

module.exports = router;
