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

            <div>Enrolled Courses</div>
            {
                !enrolledCourses ? (<div className='spinner'></div>)
                    : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
                        : (
                            <div>
                                <div>
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>
                                {/* card start */}
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div key={index}>
                                            <div
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                }}
                                            >
                                                <img src={course.thumbnail} />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {course?.totalDuration}
                                            </div>

                                            <div>
                                                <p>Progress: {course.progressPercentage || 0} %</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage}
                                                    height='8px'
                                                    isLabelVisible={false}

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