const cloudinary = require("cloudinary");

// cloudinary.config({
//   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret : process.env.CLOUDINARY_API_SECRET
// });


// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   // secure: true
// });
cloudinary.config({ 
  cloud_name: "dqhmsxdr0", 
  api_key: "542723238829845", 
  api_secret: "g4_EJLbUwDlvHWhQFGIG1XLZCMw",
  // secure: true
});


// cloudinary upload image
const cloudinaryUploadImage = async(fileUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileUpload , {
      resource_type : "auto"
    })
    return data;
    
  } catch (error) {
    return error
  }
}

// cloudinary Remove image
const cloudinaryRemoveImage = async(ImagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(ImagePublicId)
    return result;
    
  } catch (error) {
    return error
  }
}


module.exports = { cloudinaryUploadImage , cloudinaryRemoveImage}