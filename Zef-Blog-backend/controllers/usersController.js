const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { UserModel, validateUpdateUser } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const path = require("path");
const { cloudinaryUploadImage, cloudinaryRemoveImage, cloudinaryRemoveMultipleImage } = require("../utils/cloudinary");
const { PostModel } = require("../models/postModel");
const { commentModel } = require("../models/commentModel");


/**---------------------------------------
 * @desc    get All Users profile
 * @route   /api/v1/users/profile
 * @method  GET
 * @access  private (admin only)
 ----------------------------------------*/
 exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserModel.find().select("-password").populate("posts");
  res.status(200).json({ result : users.length , data : users});
 });


/**---------------------------------------
 * @desc    get one User profile
 * @route   /api/v1/users/profile/:id
 * @method  GET
 * @access  private (admin and specific user only)
 ----------------------------------------*/
 exports.getOneUser = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.params.id).select("-password").populate("posts");
  if (!user) {
return res.status(404).json({message : `User with id ${req.params.id}  not found`})
  }

  res.status(200).json({data : user});
 });


/**---------------------------------------
 * @desc    update one User profile
 * @route   /api/v1/users/profile/:id
 * @method  PUT
 * @access  private (only user himself)
 ----------------------------------------*/
 exports.updateUser = asyncHandler(async (req, res) => {
  const {error} = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({message : error.details[0].message})
  }
  if(req.body.password)
  {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password , salt);
  }
  


const user = await UserModel.findByIdAndUpdate(req.params.id, {
  $set : { 
    userName : req.body.userName,
    password : req.body.password,
    bio : req.body.bio,
  }
} , {new : true}).select("-password")
if (!user) {
  return res.status(404).json({message : `User with id ${req.params.id}  not found`})
    }
  

  res.status(201).json({data : user});
 });

 /**---------------------------------------
 * @desc    get Users count
 * @route   /api/v1/users/count
 * @method  GET
 * @access  private (only Admin)
 ----------------------------------------*/
 exports.getUsersCount = asyncHandler(async (req, res) => {
const count = await UserModel.countDocuments();
res.status(200).json({data : count});
 })


  /**---------------------------------------
 * @desc    profile photo upload
 * @route   /api/v1/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged user)
 ----------------------------------------*/
 exports.profilePhotoUpload = asyncHandler(async (req, res) => {
  // 1. Validation
  if (!req.file)
  {
    return res.status(400).json({message : "no file provided"});
  }
  // 2. Get the path of the image
  const imagePath = path.join(__dirname , `../images/${req.file.filename}`);
  // 3. Upload to cloudinary
  const result = await cloudinaryUploadImage(req.file.path);
  console.log(result);
  // 4. Get the user from DB
  const user = await UserModel.findById(req.user.id);
  // 5. Delete the old profile photo if exist
if (user.profilePhoto.publicId !== null)
{
await  cloudinaryRemoveImage(user.profilePhoto.publicId);
}
  // 6. Change the profilePhoto field in the DB
  user.profilePhoto = {
    url : result.secure_url,
    publicId : result.public_id
  }

  await user.save();
  // 7. Send response to client
  res.status(200).json({message : "your profile photo uploaded successfully",
  profilePhoto : {url : result.secure_url , publicId : result.public_id}
});
  // 8. Remvoe image from the server
fs.unlinkSync(imagePath);
 })


/**---------------------------------------
 * @desc    delete User profile (Account)
 * @route   /api/v1/users/profile/:id
 * @method  DELETE
 * @access  private (admin only or him self)
 ----------------------------------------*/
 exports.deleteUser = asyncHandler(async (req, res) => {
   // 1. Get the user from DB
   const user = await UserModel.findById(req.params.id);
   if (!user) {
    return res.status(404).json({message : `User with id ${req.params.id}  not found`})
      }
    //2. Get all posts from DB
    const posts = await PostModel.find({user : user._id});
    //3. Get the public ids from the posts
    const publicIds = posts?.map((post) => post.image.publicId)
    // 4. Delete all posts image from cloudinary that belong to this user
  if (publicIds?.length > 0) {
    await cloudinaryRemoveMultipleImage(publicIds)
  }
   // 5. Delete the profile picture from cloudinary
   await cloudinaryRemoveImage(user.profilePhoto.publicId)
   // 6. Delete user posts & comments
   await PostModel.deleteMany({user : user._id});
   await commentModel.deleteMany({user : user._id});
   // 7. Delete the user himself
   await UserModel.findByIdAndDelete(req.params.id);
   // 8. Send a response to the client
  res.status(200).json({message : "user deleted successfully"});
 });


