const asyncHandler = require("express-async-handler");
const { commentModel, validateCreateComment, validateUpdateComment } = require("../models/commentModel");
const { UserModel } = require("../models/userModel");

/**---------------------------------------
 * @desc    create Comment
 * @route   /api/v1/comments
 * @method  POST
 * @access  private (user logged in user)
 ----------------------------------------*/
 exports.createComment = asyncHandler(async (req, res) => {
  const commentsValidate = await commentModel.findOne({user : req.user.id ,postId : req.body.postId });
  if (commentsValidate){
    return res.status(404).json({message : "you wrote a comment on this post already"});
  }

  const {error} = validateCreateComment(req.body);
  if (error) {
    return res.status(404).json({message : error.details[0].message});
  }

  const userProfile = await UserModel.findById(req.user.id);
const comment = await commentModel.create({
  postId :  req.body.postId,
  user : req.user.id,
  text : req.body.text ,
  userName : userProfile.userName
});

res.status(201).json({data : comment});
 })


/**---------------------------------------
 * @desc    get all Comments
 * @route   /api/v1/comments
 * @method  GET
 * @access  private (only admin)
 ----------------------------------------*/
 exports.getAllComments = asyncHandler(async (req, res) => {

const comments = await commentModel.find().populate("user");

res.status(200).json({result : comments.length , data : comments});
 })

 
/**---------------------------------------
 * @desc    get all Comments
 * @route   /api/v1/comments/:id
 * @method  DELETE
 * @access  private (only admin or user owner the comment)
 ----------------------------------------*/
 exports.deleteComment = asyncHandler(async (req, res) => {
const comment = await commentModel.findById(req.params.id);
if (!comment) {
  return res.status(404).json({message : `thers no comment with this id ${req.params.id}`});
}
if (req.user.isAdmin || req.user.id === comment.user.toString()) {
 await commentModel.findByIdAndDelete(req.params.id);
  res.status(200).json({message : "comment deleted succssefully"});
} else {
  return res.status(403).json({message : "you are not allowed to access this route"});
}
 })

/**---------------------------------------
 * @desc    Update Comment
 * @route   /api/v1/comments/:id
 * @method  PUT
 * @access  private (only user owner of the comment)
 ----------------------------------------*/
 exports.updateComment = asyncHandler(async (req, res) => {
  const {error} = validateUpdateComment(req.body);
  if (error) {
    return res.status(404).json({message : error.details[0].message});
  }

const comment = await commentModel.findById(req.params.id);
if (!comment) {
  return res.status(404).json({message : `thers no comment with this id ${req.params.id}`});
}

if (req.user.id !== comment.user.toString()) {
  return res.status(403).json({message :  "you are not allowed to access this route only user himself "});
}
const updatedComment = await commentModel.findByIdAndUpdate(req.params.id , {
  $set : {
    text : req.body.text,
  }
} , {new : true});
  res.status(200).json({data :updatedComment});
 })