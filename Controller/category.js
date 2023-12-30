const category = require("../Model/category") 

exports.addCategory = async (req, res, next) => {
  try {
    const { description, Libelle } = req.body;

    const newCategory = new category({
        description,
      Libelle,
    });

    const savedCategory = await newCategory.save();

    res.status(200).json({
      success: true,
      category: savedCategory,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id; 
    const updatedData = req.body;

   
    const updatedCategory = await category.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      category: updatedCategory,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id; 

    await category.findByIdAndDelete(categoryId);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
    try {
      const categories = await category.find();
  
      res.status(200).json({
        success: true,
        categories: categories,
      });
    } catch (err) {
      next(err);
    }
};


exports.getCategoryById = async (req, res, next) => {
    try {
      const categoryId = req.params.id; 
  
      const category = await category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({
          success: false,
          error_message: "Category not found",
        });
      }
  
      res.status(200).json({
        success: true,
        category: category,
      });
    } catch (err) {
      next(err);
    }
  };