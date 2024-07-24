import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconBtn } from '../../common/IconBtn';

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState('');
    const [videobarActive, setVideoBarActive] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length) return ;
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=>data._id === sectionId
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
    },[courseSectionData,courseEntireData,location.pathname]);

  return (
    <>
        <div className='text-white'>
            {/* for buttons and headings */}
            <div>
                {/* for buttons */}
                <div>   
                    <div
                        onClick={()=>navigate('/dashboard/enrolled-courses')}
                    >
                        Back
                    </div>

                    <div>
                        <IconBtn
                            text={"Add Review"}
                            onClick={()=>{
                                setReviewModal(true);
                            }}
                        />
                    </div>
                </div>
                {/* for heading or title */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for section and subSections */}
            <div>
                {
                    courseSectionData.map((course,index)=>(
                        <div
                            onClick={()=>setActiveStatus(course?._id)}
                            key={index}
                        >

                            {/* section */}
                            <div>
                                <div>
                                    {course?.sectionName}
                                </div>

                            </div>
                            {/* subSections */}
                            <div>
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic,index)=>(
                                                    <div 
                                                        key={index}
                                                        className={`flex gap-5 p-5 ${
                                                            videobarActive === topic._id ?
                                                            'bg-yellow-200 text-richblack-900' 
                                                            : 'bg-richblack-800 text-white'
                                                        }`}
                                                        onClick={()=>{
                                                            navigate(
                                                                `/view-course/${courseEntireData?.id}/section/${course?._id}/sub-section/${topic?._id}`
                                                            );
                                                            setVideoBarActive(topic._id);
                                                        }}
                                                    >
                                                        <input 
                                                            type="checkbox"
                                                            checked={completedLectures.includes(topic?._id)}
                                                            onChange={()=>{}} 
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSideBar