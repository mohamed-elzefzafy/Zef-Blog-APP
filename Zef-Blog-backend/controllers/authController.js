const {validateRegisterUser, UserModel, validateLoginUser} = require("../models/userModel")
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");


/**---------------------------------------
 * @desc    Register new user
 * @route   /api/v1/auth/register
 * @method  POST
 * @access  public
 ----------------------------------------*/

exports.register = asyncHandler(async (req , res) => {
const {error} = validateRegisterUser(req.body);
if (error) {
  return res.status(400).json({message : error.details[0].message})
}

let user = await UserModel.findOne({email : req.body.email});

if (user) {
  return res.status(400).json({message : "this user already exists"});
}

const salt = await bcrypt.genSalt(10);
const hashpassword = await bcrypt.hash(req.body.password , salt);

user = new UserModel({
  userName : req.body.userName,
  email : req.body.email,
  password : hashpassword,
})
await user.save();
// ToDo verify account by sending email
// ToDo verify account by sending email
// ToDo verify account by sending email
// ToDo verify account by sending email

res.status(201).json({message : "user registered succesufully please logIn" , data : user});
});


/**---------------------------------------
 * @desc    Login user
 * @route   /api/v1/auth/login
 * @method  POST
 * @access  public
 ----------------------------------------*/

 exports.login = asyncHandler(async (req ,res) => {
  const {errors} = validateLoginUser(req.body);
  if (errors) {
    return res.status(400).json({message : error.details[0].message})
  }

  const user = await UserModel.findOne({email : req.body.email});
  if (!user) {
    return res.status(400).json({message : "invalid email or password"});
  }

const isPasswordMatch =await bcrypt.compare(req.body.password , user.password);
if (!isPasswordMatch)
{
  return res.status(400).json({message : "invalid email or password"});
}

// ToDo verify account by sending email
// ToDo verify account by sending email
// ToDo verify account by sending email
// ToDo verify account by sending email


const token =  user.generateAuthToken();

res.status(200).json({message : "logged in successfully" , data : user , token});

 })