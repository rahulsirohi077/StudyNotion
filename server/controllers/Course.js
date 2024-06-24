const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// createCourse Handler function

exports.createCourse = async (req, res) => {
    try {
        // data fetch
        const { courseName, courseDescription, whatYouWillLearn, price, category } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: "All fields Are Required"
            });
        }

        // check for instructor
        const instructorDetails = await User.findById(req.user.id);
        console.log("Instructor Details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found"
            });
        }

        // check given Category is valid or not
        const CategoryDetails = await Category.findById(category);
        if (!CategoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found"
            });
        }

        // upload Image to cloudinary
        const thumbnailUrl = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an entry for new course
        const course = new Course({
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            thumbnail: thumbnailUrl.secure_url,
            instructor: instructorDetails._id,
            Category: CategoryDetails._id
        });

        // add the new course to the user schema of Instructor
        instructorDetails.courses.push(course._id);
        await instructorDetails.save();


        // update the Category schema
        CategoryDetails.courses.push(course._id);
        await CategoryDetails.save();
        // return res
        res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: course
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            messge: "Failed to create course",
            error: error.message
        });
    }
};


// getAllCourses Handler function
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find();
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: allCourses
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching all courses",
            error: error.message
        })
    }
}

// getcourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
        // get id
        const { courseId } = req.body;
        // find course details
        const courseDetails = await Course.find(
            { _id: courseId }
        ).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
            .populate("category")
            .populate("ratingAndReview")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    }
                }
            ).exec();
        // validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        // return res
        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:error.message
        })
    }
}