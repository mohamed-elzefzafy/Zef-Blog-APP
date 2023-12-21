const mongoose  = require("mongoose");


const VerificationTokenScema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true,
  },
  token : {
    type : String,
    required : true,
  },
},{timestamps : true})




const VerificationTokenModel = mongoose.model("VerificationToken" , VerificationTokenScema);



module.exports = VerificationTokenModel