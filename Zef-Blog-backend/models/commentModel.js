const Joi = require("joi");
const mongoose  = require("mongoose");


const CommentScema = new mongoose.Schema({
postId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : "Post",
  required : true,
},
user : {
  type : mongoose.Schema.Types.ObjectId,
  ref : "User",
  required : true,
},
text : {
  type : String,
  required : true,
},
userName : {
  type : String,
  required : true,
},

} ,{timestamps : true});



const commentModel = mongoose.model("Comment" , CommentScema);

function validateCreateComment (obj) {
  const schema = Joi.object({
    postId : Joi.string().required(),
    text : Joi.string().trim().required(),
  })
  return schema.validate(obj);
}

function validateUpdateComment (obj) {
  const schema = Joi.object({
    text : Joi.string().trim().required(),
  })
  return schema.validate(obj);
}

module.exports = { commentModel , validateCreateComment  , validateUpdateComment};