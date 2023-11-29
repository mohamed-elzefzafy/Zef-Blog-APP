const Joi = require("joi");
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
userName : {
  type : String,
  required : true,
  trim : true,
  minlength : 2 ,
  maxlength : 100,
},
email: {
  type : String,
  required : true,
  trim : true,
  minlength : 5 ,
  maxlength : 100,
  unique : true,
},
password: {
  type : String,
  required : true,
  trim : true,
  minlength : 8 ,
},
profilePhoto: {
  type : Object,
default : {
  url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  publicId : null
}
},
bio : {
  type : String,
} ,
isAdmin : {
type : Boolean,
default : false
},
isAccountVerifed : {
type : Boolean,
default : false
}

} 
  , {timestamps : true})

  //generate auth token

  UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id : this._id , isAdmin : this.isAdmin} , process.env.JWT_SECRET_KEY )
  }


  const UserModel = mongoose.model("User" , UserSchema);

  function validateRegisterUser (obj) {
    const schema = Joi.object({
      userName : Joi.string().trim().min(2).max(100).required(),
      email : Joi.string().trim().min(5).max(100).required().email(),
      password : Joi.string().trim().min(8).required(),
    });

    return schema.validate(obj);
  }

  function validateLoginUser (obj) {
    const schema = Joi.object({
      email : Joi.string().trim().min(5).max(100).required().email(),
      password : Joi.string().trim().min(8).required(),
    });

    return schema.validate(obj);
  }


  function validateUpdateUser (obj) {
    const schema = Joi.object({
      userName : Joi.string().trim().min(2).max(100),
      password : Joi.string().trim().min(8),
      bio : Joi.string(),
    });

    return schema.validate(obj);
  }

  module.exports = {UserModel , validateRegisterUser , validateLoginUser , validateUpdateUser};




