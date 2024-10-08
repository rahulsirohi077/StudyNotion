import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            console.log("EnrolledCourses response=", response);
            setEnrolledCourses(response);
        } catch (error) {
            console.log(error);
            console.log("Unable to Fetch Enrolled Courses");
        }
    }
    useEffect(() => {
        getEnrolledCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='text-white'>

            <div className='flex gap-x-2'>
                <div>Home /</div>
                <div>Dashboard / </div>
                <span className='text-yellow-50'>Enrolled Courses</span>
            </div>

            <div className='mt-3 font-inter font-medium text-3xl mb-3'>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div className='spinner'></div>)
                    : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
                        : (
                            <div className="my-8 text-richblack-5">
                                <div className="flex rounded-t-lg bg-richblack-700 ">
                                    <p className="w-[45%] px-5 py-3">Course Name</p>
                                    <p className="w-1/4 px-2 py-3">Duration</p>
                                    <p className="flex-1 px-2 py-3">Progress</p>
                                </div>
                                {/* card start */}
                                {
                                    enrolledCourses.map((course, index, arr) => (
                                        <div key={index} className={`flex items-center border border-richblack-700 ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                            }`}>
                                            <div
                                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                }}
                                            >
                                                <img src={course.thumbnail}
                                                    className="h-14 w-14 rounded-lg object-cover"
                                                />
                                                <div className="flex max-w-xs flex-col gap-2">
                                                    <p className="font-semibold">{course.courseName}</p>
                                                    <p className="text-xs text-richblack-300">{course.courseDescription.split(" ").slice(0, 15).join(" ") + "..."}</p>
                                                </div>
                                            </div>

                                            <div className="w-1/4 px-2 py-3">
                                                {course?.totalDuration}
                                            </div>

                                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                                <p>Progress: {course.progressPercentage || 0} %</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                    bgColor={course.progressPercentage === 100 ? "green" : "#47a5c5"} // Conditional color
                                                    borderRadius="10px" // Set this to your desired border radius for rounding
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
            }

        </div>
    )
}

export default EnrolledCourses