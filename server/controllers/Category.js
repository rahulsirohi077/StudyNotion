const Category = require("../models/Category");
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// create Tag ka handler function

exports.createCategory = async (req, res) => {
    try {
        // data fetch
        const { name, description } = req.body;
        // validate
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }
        // create entry in db
        const categoryDetails = await Category.create({
            name,
            description
        });
        console.log(categoryDetails);
        // return res
        res.status(200).json({
            success: true,
            message: "Category created successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all Tags handler function
exports.showAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All Category returned successfully",
            categories
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body;
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
            path: "ratingAndReviews"
        },
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
            path: "ratingAndReviews"
        },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
            path: "ratingAndReviews"
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }