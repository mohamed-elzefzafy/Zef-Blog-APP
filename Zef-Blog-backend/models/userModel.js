const Joi = require("joi");
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

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
  url : "https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487318/Zef-Blog/Default%20images/download_w26sr9.jpg",
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
  , {
      timestamps : true ,
      toJSON : {virtuals : true},
      toObject : {virtuals : true}
  }
  )

  // Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts" , {
 ref : "Post",
foreignField : "user",
localField : "_id"
 
})


  UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id : this._id , isAdmin : this.isAdmin} , process.env.JWT_SECRET_KEY )
  }


  const UserModel = mongoose.model("User" , UserSchema);

  function validateRegisterUser (obj) {
    const schema = Joi.object({
      userName : Joi.string().trim().min(2).max(100).required(),
      email : Joi.string().trim().min(5).max(100).required().email(),
      password : passwordComplexity().required(),
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
      password : passwordComplexity(),
      bio : Joi.string(),
    });

    return schema.validate(obj);
  }

  function validateEmail (obj) {
    const schema = Joi.object({
      email : Joi.string().trim().min(5).max(100).required().email(),
    });

    return schema.validate(obj);
  }

  function validateNewPassword (obj) {
    const schema = Joi.object({
      password : passwordComplexity().required(),
    });

    return schema.validate(obj);
  }



  module.exports = { UserModel , validateRegisterUser , validateLoginUser , validateUpdateUser ,
                               validateEmail , validateNewPassword};




