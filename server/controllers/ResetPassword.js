const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")

// resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body
        const { email } = req.body;
        // check user for this email, email validation
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Your Email is not registered with us"
            })
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const UpdatedDetails = await User.findOneAndUpdate({ email }, {
            token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true });
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
        // send email with url
        await mailSender(email, "Reset Password Link", `Password Reset Link:${url}`);
        // return response
        res.status(200).json({
            success: true,
            message: "Password Reset Link Sent to your Email"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while sending Reset Password Link mail"
        })
    }
}

// resetPassword

exports.resetPassword = async (req, res) => {
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password should be same"
            })
        }
        // get userdetails from db using token
        const userDetails = await User.findOne({token});
        // if no entry - invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message:"Token is Invalid"
            })
        }
        // token time check
        if(userDetails.resetPasswordExpires<Date.now()) {
            return res.json({
                success: false,
                message:"Token Expired, Please Regenerate Your Token"
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password,10);
        // update password
        await User.findOneAndUpdate({token},{password:hashedPassword},{new:true});
        // return response
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while updating reset password in DB"
        })
    }
}