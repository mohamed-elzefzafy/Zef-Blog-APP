const path = require("path");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { validateCreatePost, PostModel, validateUpdatePost } = require("../models/postModel");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");
const { commentModel } = require("../models/commentModel");


/**---------------------------------------
 * @desc    create new Post
 * @route   /api/v1/posts
 * @method  POST
 * @access  private (only logged in user )
 ----------------------------------------*/
exports.createPost = asyncHandler(async(req , res) => {
  // 1. Validation for image
  if (!req.file) {
    return res.status(400).json({ message: "NO image provided"});
  }
  // 2. Validation for data
  const {error} = validateCreatePost(req.body);
  if (error) {
    return res.status(400).json({message :error.details[0].message});
  }
  // 3. Upload photo
  // const imagePath = path.join(__dirname , `../images/${req.file.filename}`);
// const result =   await cloudinaryUploadImage(imagePath);
const result =   await cloudinaryUploadImage(req.file.path);
  // 4. Create new post and save it to DB  

  const post = await PostModel.create({
    title : req.body.title,
    description : req.body.description,
    category : req.body.category,
    user : req.user.id,
    image :  {
      url :  result.secure_url,
      publicId : result.public_id
    },
  });

  // 5. Send response to the client
  res.status(201).json({data : post})
  // 6. Remove image from the server
// fs.unlinkSync(imagePath);
})

/**---------------------------------------
 * @desc    get all Posts
 * @route   /api/v1/posts
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getAllPosts = asyncHandler(async(req , res) => {
  const POSTS_PER_PAGE = 3;
  const {pageNumber , category} = req.query;
  let filter ={};
  if (category)
  {
    filter = {category : category}
  } 
  let posts ;

  if (pageNumber ) {
    posts = await PostModel.find(filter).skip((pageNumber - 1) * POSTS_PER_PAGE ).limit(POSTS_PER_PAGE).sort({createdAt : -1}).populate("user" , ["-password"]).populate("comments");
      } 

       else {
        posts = await PostModel.find(filter).sort({createdAt : -1}).populate("user" , ["-password"]).populate("comments");
      }
    

  res.status(200).json({result : posts.length , data : posts});
 })


 /**---------------------------------------
 * @desc    get one Post
 * @route   /api/v1/posts/:id
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getOnePost = asyncHandler(async(req , res) => {
  const post = await PostModel.findById(req.params.id).populate("user" , ["-password"]).populate("comments");
  if (!post) {
    return res.status(404).json({message : "this post not found"});
  }
console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);
  res.status(200).json({data : post});
 })


 /**---------------------------------------
 * @desc    get posts count
 * @route   /api/v1/posts/count
 * @method  GET
 * @access  public 
 ----------------------------------------*/
 exports.getPostsCount = asyncHandler(async(req , res) => {
const postCount = await PostModel.countDocuments();
  res.status(200).json({data : postCount});
 })


 /**---------------------------------------
 * @desc    delete post
 * @route   /api/v1/posts/:id
 * @method  DELETE
 * @access  private (only logged user or admin) 
 ----------------------------------------*/
 exports.deletePost = asyncHandler(async(req , res) => {
const post = await PostModel.findById(req.params.id);
if (!post) {
return  res.status(400).json({message : `no post found with id ${req.params.id}`})
}
if (req.user.isAdmin || req.user.id === post.user.toString())
{
  await PostModel.findByIdAndDelete(req.params.id);
  await cloudinaryRemoveImage(post.image.publicId);

 await commentModel.deleteMany({postId : post._id} );

  res.status(200).json({message : "post deleted successfully" , postId : post._id});
} else {
  return res.status(400).json({message : "only admin or the user who wrote the post can delete it"})
}
 })

  /**---------------------------------------
 * @desc    update post
 * @route   /api/v1/posts/:id
 * @method  PUT
 * @access  private (only user owner post) 
 ----------------------------------------*/
 exports.updatePost = asyncHandler(async(req , res) => {
const {error} = validateUpdatePost(req.body);
if (error) {
  return res.status(400).json({message : error.details[0].message});
}
const post = await PostModel.findById(req.params.id);
if (!post) {
return res.status(400).json({message : `no post found with id ${req.params.id}`})
}

if (req.user.id !== post.user.toString())
{
  return res.status(403).json({message : `access denied you are not allowed to access this route`})
}

const updatedPost = await PostModel.findByIdAndUpdate(req.params.id , {
  $set : {
    title : req.body.title ,
    description: req.body.description,
    category : req.body.category
  }
} ,{new : true}).populate("user" , ["-password"]);

res.status(200).json({data : updatedPost})
 })


   /**---------------------------------------
 * @desc    update post image
 * @route   /api/v1/posts/update-image/:id
 * @method  PUT
 * @access  private (only user owner post) 
 ----------------------------------------*/
 exports.updatePostImage = asyncHandler(async(req , res) => {
if (!req.file)
{
  return res.status(400).json({message : `no photo provided`})
}
  const post = await PostModel.findById(req.params.id);
  if (!post) {
  return res.status(404).json({message : `no post found with id ${req.params.id}`})
  }
  
  if (req.user.id !== post.user.toString())
  {
    return res.status(403).json({message : `access denied you are not allowed`})
  }

  await cloudinaryRemoveImage(post.image.publicId);

  const imagePath = path.join(__dirname , `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);


  

  const updatedPost = await PostModel.findByIdAndUpdate(req.params.id , {
    $set : {
    image :  {
      url :  result.secure_url,
      publicId : result.public_id
    },
    }
  } ,{new : true});
  
  res.status(200).json({data : updatedPost});
  fs.unlinkSync(imagePath);
   })

      /**---------------------------------------
 * @desc    Toggle like
 * @route   /api/v1/posts/like/:id
 * @method  PUT
 * @access  private (only logged user) 
 ----------------------------------------*/
 exports.ToggleLike = asyncHandler(async(req , res) => {
let post = await PostModel.findById(req.params.id);

if (!post) {
  return res.status(404).json({message : `no post found with id ${req.params.id}`})
  }

  const isPostLiked = post.likes.find((user) => user.toString() === req.user.id);
console.log(isPostLiked);
if (isPostLiked)
{
  post = await PostModel.findByIdAndUpdate(req.params.id ,{
    $pull : {likes : req.user.id}
    } ,{new : true})
} else {
  post = await PostModel.findByIdAndUpdate(req.params.id ,{
    $push : {likes : req.user.id}
    } ,{new : true})
}

 res.status(200).json({data : post})

 });
 

 