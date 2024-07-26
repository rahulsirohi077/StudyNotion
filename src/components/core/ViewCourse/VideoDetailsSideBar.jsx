import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';
import { IoArrowBackSharp } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';

const VideoDetailsSideBar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            // set current section here 
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current Sub section here
            setVideoBarActive(activeSubSectionId);
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSectionData, courseEntireData, location.pathname]);

    return (
        <>
            <div className='text-white h-full w-[30%] bg-richblack-800 border border-richblack-700 py-9'>
                {/* for buttons and headings */}
                <div>
                    {/* for buttons */}
                    <div className='flex justify-between'>
                        <div
                            onClick={() => navigate('/dashboard/enrolled-courses')}
                            className='flex gap-1 items-center cursor-pointer'
                        >
                            <IoArrowBackSharp size={30} /> Back
                        </div>

                        <div>
                            <IconBtn
                                text={"Add Review"}
                                onClick={() => {
                                    setReviewModal(true);
                                }}
                            />
                        </div>
                    </div>
                    {/* for heading or title */}
                    <div className='ml-2'>
                        <p>{courseEntireData?.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>
                </div>

                {/* for section and subSections */}
                <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {
                        courseSectionData.map((course, index) => (
                            <div
                                className="mt-2 cursor-pointer text-sm text-richblack-5"
                                onClick={() => setActiveStatus(course?._id)}
                                key={index}
                            >

                                {/* section */}
                                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4"
                                onClick={()=>setActiveStatus(course?.id)}>
                                    <div className="w-[70%] font-semibold">
                                        {course?.sectionName}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`${activeStatus === course?._id
                                                ? "rotate-180"
                                                : "rotate-0"
                                                } transition-all duration-500`}
                                        >
                                            <BsChevronDown />
                                        </span>
                                    </div>
                                </div>
                                {/* subSections */}
                                {activeStatus === course?._id && (
                                    <div className="transition-[height] duration-500 ease-in-out">
                                        {course.subSection.map((topic, i) => (
                                            <div
                                                className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                                                        ? "bg-yellow-200 font-semibold text-richblack-800"
                                                        : "hover:bg-richblack-900"
                                                    } `}
                                                key={i}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                    )
                                                    setVideoBarActive(topic._id)
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => { }}
                                                />
                                                {topic.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </>
    )
}

export default VideoDetailsSideBar