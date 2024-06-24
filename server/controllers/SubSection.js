const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create SubSection
exports.createSubSection = async (req, res) => {
    try {
        // data fetch
        const { sectionId, title, timeDuration, description } = req.body;
        // extract file/video
        const video = req.files.videoFile;
        // validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        // create SubSection
        const subSectionDetails = await SubSection.create({
            title,
            description,
            timeDuration,
            videoUrl: uploadDetails.secure_url
        })
        // update section with this subsection object id
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: { subSection: subSectionDetails._id }
        }, { new: true }).populate('subSections');
        // return res
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Create SubSection, please try again",
            error: error.message
        })
    }
}

// update subSection
exports.updateSubSection = async (req, res) => {
    try {
        // data fetch
        const { subSectionId, title, timeDuration, description } = req.body;
        // validation
        if (!subSectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields Are Required'
            })
        }
        // update subSection
        await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            timeDuration,
            description
        });
        // return res
        return res.status(200).json({
            success: true,
            message: "SubSection Updated Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, please try again"
        })
    }
}
// delete subSection
exports.deleteSubSection = async (req, res) => {
    try {
        // data fetch
        const { sectionId, subSectionId } = req.body;
        // validation
        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: 'SubSection Id is Required'
            })
        }
        // delete subsection
        await SubSection.findByIdAndDelete(subSectionId);
        // remove subsection id from section model
        await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId
            }
        }
        );
        // return res
        return res.status(200).json({
            success: true,
            message:"SubSection deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Delete SubSection, please try again"
        })
    }
}