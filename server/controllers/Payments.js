const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/template/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {paymentSuccessEmail} = require('../mail/template/paymentSuccessfulEmail');

exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;

    console.log("inside capture payment");

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({ success: false, message: "Could not find the course" });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: 'Student is already Enrolled' });
            }

            totalAmount += course.price;

        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: error.message });
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }

}

// verify the Payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    console.log('razorpay_order_id',razorpay_order_id);
    console.log('razorpay_payment_id',razorpay_payment_id);
    console.log('razorpay_signature',razorpay_signature);
    console.log('courses',courses);
    console.log('userId',userId);



    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let expectedSignature = '12345'

    if (expectedSignature === razorpay_signature) {
        // enroll student 
        await enrollStudents(courses, userId, res);
        // return res
        return res.status(200).json({ success: true, message: 'Payment Verified' });
    }
    return res.status(200).json({ success: false, message: 'Payment Failed' });
}

const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: 'Please Provide data for Courses or UserId' });
    }

    for (const courseId of courses) {
        try {
            // find the course and enroll the student
            const enrolledCourses = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourses) {
                return res.status(500).json({ success: false, message: 'Course not Found' });
            }

            // find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId
                    }
                },
                { new: true })

            // send Mail to user
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfull Enrolled Into ${enrolledCourses.courseName}`,
                courseEnrollmentEmail(enrolledCourses.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
            // console.log('Email Sent Successfull', emailResponse.response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
}

exports.sendPaymentSuccessEmail = async(req,res)=>{
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;
    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({success:false,message:"Please provide all the fields"});
    }

    try {
        // find student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,orderId,paymentId)
        )
    } catch (error) {
        console.log('error in sending mail',error);
        return res.status(500).json({success:false,message:'Could not send Mail'});
    }
}

// capture the payment and initiaite the RazorPay order
// exports.capturePayment = async (req, res) => {
//     try {
//         // get courseId and userId
//         const { course_id } = req.body;
//         const userId = req.user.id;
//         // validation
//         // valid courseId
//         if (!course_id) {
//             return res.json({
//                 success: false,
//                 message: "Please provide valid course Id"
//             });
//         }
//         // valid courseDetails
//         let course;
//         try {
//             course = await Course.findById(course_id);
//             if (!course) {
//                 return res.json({
//                     success: false,
//                     message: "Course not find the course"
//                 });
//             }
//             // user already pay for the same course
//             const uid = mongoose.Types.ObjectId(userId);
//             if (course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success: false,
//                     message: "Student is already enrolled"
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             });
//         }
//         // order create
//         const options = {
//             amount: course.price * 100,
//             currency: "INR",
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 course_id,
//                 userId
//             }
//         };

//         try {
//             // initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
//             // return res
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount
//             })
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 success: false,
//                 message: "Could not initiate order"
//             })
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: "Could not capture payment"
//         })
//     }
// }


// verify Signature of Razorpay and Server

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorised");
        const { course_id, userId } = req.body.payload.payment.entity.notes;

        try {
            // fulfil the action
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: course_id },
                { $push: { enrolledStudents: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                });
            }

            console.log(enrolledCourse);

            // find the student and add the course to its list enrolled courses me
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: course_id } },
                { new: true }
            )
            console.log(enrolledStudent);

            // confirmation mail sned 
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Enrollment Successfull",
                "You have been successfully enrolled into the course " + enrolledCourse.name
            );

            console.log(emailResponse);
            // return res
            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added"
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    else {
        return res.status(400).json({
            success: false,
            message: "Invalid Signature"
        })
    }


}