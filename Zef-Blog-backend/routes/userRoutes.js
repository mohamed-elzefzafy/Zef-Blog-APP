const router = require("express").Router();
const { verifyToken, verifyTokenAndAdmin , verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const {photoUpload} = require("../middlewares/photoUpload");
const { getAllUsers, getOneUser, updateUser, deleteUser, profilePhotoUpload, getUsersCount } = require("../controllers/usersController");



router.route("/profile").get( verifyTokenAndAdmin , getAllUsers);
router.route("/profile/:id").get(  validateObjectId, verifyToken , getOneUser)
                            .put(validateObjectId , verifyTokenAndOnlyUser , updateUser)
                            .delete( validateObjectId , verifyTokenAndAuthorization , deleteUser);
router.route("/profile/profile-photo-upload").post(verifyToken , photoUpload.single("image") , profilePhotoUpload)
router.route("/count").get(verifyTokenAndAdmin , getUsersCount)

module.exports = router;
