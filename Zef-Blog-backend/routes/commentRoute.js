const { createComment, getAllComments, deleteComment, updateComment } = require("../controllers/commentsController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyTokenUserNotAdmin, verifyTokenAndAdmin, verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();


router.route("/").post(verifyTokenUserNotAdmin ,createComment)
                 .get(verifyTokenAndAdmin , getAllComments);
router.route("/:id").delete(validateObjectId , verifyToken , deleteComment)   
                    .put(validateObjectId , verifyToken , updateComment)              



module.exports = router;