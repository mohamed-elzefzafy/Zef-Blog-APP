const {validateRegisterUser, UserModel, validateLoginUser} = require("../models/userModel")
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const VerificationTokenModel = require("../models/verificationTokenModel");
const sendEmail = require("../utils/sendEmail");

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
const hashPassword = await bcrypt.hash(req.body.password , salt);

user = new UserModel({
  userName : req.body.userName,
  email : req.body.email,
  password : hashPassword,
})
await user.save();

 // Creating new VerificationToken & save it toDB
 const vericationToken = new VerificationTokenModel({
  userId : user._id ,
  token : crypto.randomBytes(32).toString("hex"),

 })

 await vericationToken.save();
// Making the link
const link = `${process.env.FRONT_URL}/users/${user._id}/verify/${vericationToken.token}`;
                                     
// Putting the link into an html template
const htmlTemplate = `
<div>
<p>clicl on the link below to verify your email </p>
<a href="${link}">verify</a>
</div>
`
// Sending email to the user
await sendEmail(user.email , "verify email", htmlTemplate)


res.status(201).json({message : "we sent you email please verify your email"});
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

const isPasswordMatch = await bcrypt.compare(req.body.password , user.password);

if (!isPasswordMatch)
{
  return res.status(400).json({message : "invalid email or password"});
}


if (!user.isAccountVerifed) {
  let verificationToken = await VerificationTokenModel.findOne({
    userId : user._id, 
  })

  if (!verificationToken) {
    verificationToken = new VerificationTokenModel({
      userId : user._id, 
      token : crypto.randomBytes(32).toString("hex"),
    }) ;

    await verificationToken.save();
  }

  const link = `${process.env.FRONT_URL}/users/${user._id}/verify/${verificationToken.token}`;
                                     
const htmlTemplate = `
<div>
<p>clicl on the link below to verify your email </p>
<a href="${link}">verify</a>
</div>
`
await sendEmail(user.email , "verify email", htmlTemplate)



   return  res.status(400).json({message : "we sent you email please verify your email"});
}

const token =  user.generateAuthToken();

res.status(200).json({message : "logged in successfully" 
, _id : user._id , userName : user.userName 
, profilePhoto : user.profilePhoto ,
isAdmin : user.isAdmin, 
 token 
});
 })


 /**---------------------------------------
 * @desc    verify User Account
 * @route   /api/v1/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ----------------------------------------*/

 exports.verifyUserAccount = asyncHandler(async (req ,res) => {
  const user = await UserModel.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({message : "invalid link"});
  }

  const vericationToken  = await VerificationTokenModel.findOne({
    userId : user._id, 
    token : req.params.token
  });
  if (!vericationToken ) {
    return res.status(400).json({message : "invalid link"});
  }

  user.isAccountVerifed = true;
  await user.save();

  await vericationToken.deleteOne();

  res.status(200).json({message : "your account verified"});
 })