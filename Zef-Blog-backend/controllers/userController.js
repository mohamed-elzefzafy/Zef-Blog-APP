const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/userModel");


/**---------------------------------------
 * @desc    get All Users profile
 * @route   /api/v1/users/profile
 * @method  GET
 * @access  Private (admin only)
 ----------------------------------------*/
 exports.getAllUsers = asyncHandler(async (req, res) => {
  console.log(req.headers.authorization);
  const hhhh = (req.headers.authorization).split(" ");
  console.log(hhhh);
  const users = await UserModel.find();
  res.status(200).json({data : users});
 });