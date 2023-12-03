const cloudinary = require("cloudinary");

// cloudinary.config({
//   cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret : process.env.CLOUDINARY_API_SECRET
// });


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// cloudinary.config({ 
//   cloud_name: "dw1bs1boz", 
//   api_key: "438123357844419", 
//   api_secret: "8wfsySpXnkTkrI2AKxr-IAc-TRY",
//   // secure: true
// });


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
// cloudinary Remove multiple image
const cloudinaryRemoveMultipleImage = async(publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds)
    return result;
    
  } catch (error) {
    return error
  }
}


module.exports = { cloudinaryUploadImage , cloudinaryRemoveImage , cloudinaryRemoveMultipleImage}