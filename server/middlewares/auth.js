const jwt = require("jsonwebtoken");
require("dotenv").config()
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "").trim();
        // if token missing return res
        if (!token) return res.status(401).json({
            success: false,
            message: "Token is missing"
        })
        // verify token
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token inside auth middleware"
        })
    }
}

// isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}

// isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}
// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified, please try again"
        })
    }
}