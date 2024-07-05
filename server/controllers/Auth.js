const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
require("dotenv").config();

//send OTP
exports.sendotp = async (req, res) => {
    try {
        // fetch email from request ki body
        const { email } = req.body;

        // check if user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP Generated: ", otp);

        // check unique otp or not 
        let result = await OTP.findOne({ otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await otp.findOne({ otp });
        }

        const otpPayload = { email, otp };

        // create an entry in db for otp
        const otpBody = OTP.create(otpPayload);
        console.log(otpBody);
        
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// SignUp
exports.signup = async (req, res) => {

    try {
        // data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;
        // validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        // password and confirm password should be same
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "password and confirm password does not match, please try again"
            });
        }
        // check user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        //// Find most recent OTP stored for the user
        const recentOtps = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        const recentOtp = recentOtps[0]; // Access the first element of the array

        console.log("recentOtps = ", recentOtps);

        // Validate OTP
        if (!recentOtp) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        } else if (otp !== recentOtp.otp) {
            console.log("recentOtp.otp= ", recentOtp.otp);
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // entry in db
        // first create profile for the user
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again"
        })
    }
}

// Login

exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;
        // validate data
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            });
        }
        // check user exist or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first"
            })
        }
        // generate JWT after password Matching
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        // Generate JWT token
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
        // create cookie and send response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login failure, Please try again"
        })
    }
}

// changePassword
exports.changePassword = async (req, res) => {
    try {
        // get data from req body
        const { oldPassword, newPassword, confirmPassword } = req.body;
        // validation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirm password do not match"
            })
        }

        // update password
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Failed to update password"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            })
        }
        user.password = await bcrypt.hash(newPassword,10);
        // send mail - Password updated
        await mailSender(user.email, "Reset Password", "Password Updated Successfully");
        // send response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error While Updating Password'
        })
    }
}