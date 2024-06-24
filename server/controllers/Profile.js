const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        // get data
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
        // get User id
        const userId = req.user.id;
        // validation
        if (!contactNumber || !gender || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields Are Required"
            });
        }
        // find profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();
        // return res
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// deleteAccount
exports.deleteAccount = async (req, res) => {
    try {
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        // delete user
        await User.findByIdAndDelete({_id:id});
        // return res 
        return res.status(200).json({
            success: true,
            message:"User Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User cannot be deleted Successfully",
            error: error.message,
        });
    }
}


// to get all user details
exports.getAllUserDetails = async (req,res) => {

    try {
        // get id
        const id = req.user.id;
        // validtion and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return res
        return res.status(200).json(
            {
                success: true,
                message: "User Details Fetched Successfully",
                data: userDetails
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"User Details cannot be fetched Successfully",
            error: error.message,
        });
    }

}