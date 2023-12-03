const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/userModel");
const { validateCreateCategory, CategoryModel } = require("../models/categoryModel");

/**---------------------------------------
 * @desc    create category
 * @route   /api/v1/categories
 * @method  POST
 * @access  private (only admin)
 ----------------------------------------*/
 exports.createCategory = asyncHandler(async (req, res) => {
const {error} = validateCreateCategory(req.body);
if (error) {
  return res.status(404).json({message : error.details[0].message});
}

const category = await CategoryModel.create({
  title: req.body.title,
  user : req.user.id
});
res.status(201).json({data : category});
 })


/**---------------------------------------
 * @desc    get all category
 * @route   /api/v1/categories
 * @method  GET
 * @access  public
 ----------------------------------------*/
 exports.getAllCategories = asyncHandler(async (req, res) => {
const categories = await CategoryModel.find();
res.status(200).json({ result : categories.length ,data : categories});
 })

/**---------------------------------------
 * @desc    delete category
 * @route   /api/v1/categories/:id
 * @method  DELETE
 * @access  private (only admin)
 ----------------------------------------*/
 exports.deleteCategory = asyncHandler(async (req, res) => {
const category = await CategoryModel.findById(req.params.id);
if (!category) {
  return res.status(404).json({message : `therse no category with id ${req.params.id}`});
}
await CategoryModel.findByIdAndDelete(req.params.id);
res.status(200).json({ message : "category deleted successfully" , category_id : category._id});
 })