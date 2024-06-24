const Category = require("../models/Category");

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
        // get category Id
        const categoryId = req.body;
        // get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();
        // validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data Not Found"
            })
        }
        // get courses for different categories
        const differentCategories = await Category.find({
                                        _id: { $ne: categoryId }
                                        })
                                        .populate("courses")
                                        .exec();
        // TODO:- get top 10 selling courses
        // return response
        return res.status(200).json({
            success: true,
            data:{
                selectedCategory,
                differentCategories
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}