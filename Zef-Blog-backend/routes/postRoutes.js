const { createPost, getOnePost, deletePost, updatePost, updatePostImage, ToggleLike, getPostsCount, getAllPosts } = require("../controllers/postsController");
const {photoUpload} = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenUserNotAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();


router.route("/").post( verifyToken , photoUpload.single("image") , createPost)
                 .get(getAllPosts);
router.route("/count").get(getPostsCount);   
router.route("/:id").get(validateObjectId , getOnePost).delete(validateObjectId ,verifyToken ,  deletePost)
                    .put(validateObjectId , verifyToken , updatePost);    
router.route("/update-image/:id").put(validateObjectId , verifyToken , photoUpload.single("image") , updatePostImage)     
router.route("/like/:id").put(validateObjectId , verifyTokenUserNotAdmin , ToggleLike)     
               
          

module.exports = router;