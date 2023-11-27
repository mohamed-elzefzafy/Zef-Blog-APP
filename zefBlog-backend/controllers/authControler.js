const UserModel = require("../models/user")


exports.dddddd = async(req , res ) => {
const user = await UserModel.create(req.body);

res.json({statu : "success" , data : user});
}