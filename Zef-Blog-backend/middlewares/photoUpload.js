const path = require("path");
const multer = require("multer");



const photoStorage = multer.diskStorage({
  filename : function (req , file , cb) {
  if (file)
  {
    cb(null , new Date().toISOString().replace(/:/g , "-") + file.originalname);
  } else {
    cb(null , false);
  }
  }
});

const photoUpload = multer({
  storage : photoStorage ,
  fileFilter : function(req , file , cb) {
    if(file.mimetype.startsWith("image"))
    {
      cb(null , true);
    } else {
      cb({message : "unsupported file format" } , false)
    }
  },
  limits : {fileSize : 512 * 512}
});




module.exports = {photoUpload};

