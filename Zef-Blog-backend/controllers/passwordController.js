const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { validateEmail, UserModel, validateNewPassword } = require("../models/userModel");
const VerificationTokenModel = require("../models/verificationTokenModel");

/**---------------------------------------
 * @desc    send rest password link
 * @route   /api/v1/passwort/reset-password-link
 * @method  POST
 * @access  public
 ----------------------------------------*/
 exports.sendResetPassword = asyncHandler(async (req , res) => {
      // 1. Validation
      const {error} = validateEmail(req.body);
      if (error) {
        return res.status(400).json({message : error.details[0].message});
      }
    // 2. Get the user from DB by email
    const user = await UserModel.findOne({email : req.body.email});
if (!user) {
  return res.status(404).json({message : "invalid email"});
}
    // 3. Creating VerificationToken
    let vericationToken = await VerificationTokenModel.findOne({userId : user.id});
    if (!vericationToken) {
      vericationToken = new VerificationTokenModel({
        userId : user._id, 
        token : crypto.randomBytes(32).toString("hex"),
      }) ;

      vericationToken.save();
    }
    // 4. Creating link
    const link = `${process.env.FRONT_URL}/reset-password/${user._id}/${vericationToken.token}`;
    // 5. Creating HMTL template
    const htmlTemplate = `<a href="${link}">click here to reset your password </a>`
     // 6. Sending Email
    await sendEmail(user.email , "Reset-Password", htmlTemplate);
    // 7. Response to the client
res.status(200).json({message : "we sent you email to reset your password"});
 })


/**---------------------------------------
 * @desc    get rest password link
 * @route   /api/v1/passwort/reset-password/:userId/:token
 * @method  GET
 * @access  public
 ----------------------------------------*/
 exports.getResetPasswordLink = asyncHandler(async (req , res) => {
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

  res.status(200).json({message : "Valid Url"});
 })


/**---------------------------------------
 * @desc    reset Password
 * @route   /api/v1/passwort/reset-password/:userId/:token
 * @method  post
 * @access  public
 ----------------------------------------*/
 exports.resetPassword = asyncHandler(async (req , res) => {
  const {error} = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({message : error.details[0].message});
  }
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

  if (!user.isAccountVerifed) {
    user.isAccountVerifed = true;
  }

  const salt =  await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password , salt);

  user.password = hashPassword;

  await user.save();
  await vericationToken.deleteOne();

  res.status(200).json({message : "password reset successfully please login"});
 })




