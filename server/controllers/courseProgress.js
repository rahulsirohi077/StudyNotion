const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req,res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try {
        //check if the subSection is valid
        const subSection = await SubSection.findById(subSectionId);
        
        if(!subSection){
            return res.status(400).json({error:"Invalid SubSection"});
        }

        // check for old entry
        let coursePorgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId
        });

        if(!coursePorgress){
            return res.status(404).json({
                success:false,
                message:'Course Progress does not exist'
            })
        }

        // check for recompleting video/subSection
        if(coursePorgress.completedVideos.includes(subSectionId)){
            return res.status(400).json({
                error:'SubSection already completed'
            })
        }
        // push into completed video to mark it complete
        coursePorgress.completedVideos.push(subSectionId);

        await coursePorgress.save();

        return res.status(200).json({
            success:true,
            message:'Course Progress Updated Successfull',
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:'Internal Server Error'});
    }

}
