const { createCategory, getAllCategories, deleteCategory, getOneCategory } = require("../controllers/categoryController");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();


router.route("/").post(verifyTokenAndAdmin , createCategory)
                 .get(getAllCategories);
router.route("/:id").get(validateObjectId , getOneCategory).delete(validateObjectId  , verifyTokenAndAdmin , deleteCategory)
module.exports = router;