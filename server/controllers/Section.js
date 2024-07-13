const Section = require("../models/Section");
const Course = require("../models/Course");

// Create Section
exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body;
        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            });
        }
        // create section
        const newSection = await Section.create({
            sectionName,
        });
        // update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: { courseContent: newSection._id },
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
        // return res
        res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "unable to create section, please try again"
        });
    }
}
// Update Section
exports.updateSection = async (req, res) => {
    try {
        // data fetch
        const { sectionId, sectionName } = req.body;
        // data validation
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Missing Properties"
            });
        }
        // update data
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            sectionName
        }, { new: true });
        // return res
        res.status(200).json({
            success: true,
            message:"Section Updated Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to Update section, please try again"
        });
    }
}

// delete Section
exports.deleteSection = async (req,res) => {
    try {
        // fetch section id - assuming that we are sending ID in params
        const sectionId = req.params.id;
        // use find by id and delete
        await Section.findByIdAndDelete(sectionId);
        // return res
        res.status(200).json({
            success: true,
            message:"Section Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to Delete section, please try again"
        });
    }
}