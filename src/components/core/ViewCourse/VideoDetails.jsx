import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { BigPlayButton, Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from 'react-icons/ai';
import { IconBtn } from '../../common/IconBtn';

const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
    const [videoPlaying,setVideoPlaying] = useState(false);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length)
                return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate('/dashboard/enrolled-courses');
            }
            else {
                // let's assume k all 3 fields are present 
                const filteredData = courseSectionData.filter((sec) => sec._id === sectionId)[0];

                const filteredVideoData = filteredData.subSection.filter((subSec) => subSec._id === subSectionId)[0];

                setVideoData(filteredVideoData);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSectionData, courseEntireData, location.pathname]);

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        return false;
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
        return false;
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSubSectionIndex !== noOfSubSections - 1) {
            // same section ki next video m jana h 
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            // go to this video
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        }
        else {
            // 1st first video of different subSection
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            // navigate
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );

        if (currentSubSectionIndex !== 0) {
            // same section ki prev video m jana h 
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
            // go to this video
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        }
        else {
            // last video of prev subSection
            const noOfPrevSubSections = courseSectionData[currentSectionIndex - 1].subSection.length;
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[noOfPrevSubSections - 1]._id;
            // navigate
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    }

    const handleLectureCompletion = async () => {
        setLoading(true);
        try {
            const res = await markLectureAsComplete({ courseId, subSectionId }, token);

            if (res) {
                dispatch(updateCompletedLectures(subSectionId));
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    return (
        <div className='text-white w-full'>
            {
                !videoData ? (
                    <div>
                        No Data Found
                    </div>
                ) :
                    (
                        <div className='w-11/12 max-w-maxContent relative'>
                            <Player
                                ref={playerRef}
                                aspectRatio='16:9'
                                playsInline
                                onEnded={() => {
                                    setVideoEnded(true)
                                    setVideoPlaying((p)=>!p)
                                }}
                                onClick={()=>setVideoPlaying((prev)=>!prev)}
                                src={videoData?.videoUrl}
                            >
                                <BigPlayButton position="center" />
                                

                                {
                                    videoEnded && (
                                        <div className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                                            {
                                                !completedLectures.includes(subSectionId) && (
                                                    <IconBtn
                                                        disabled={loading}
                                                        text={!loading ? 'Mark As Completed' : 'Loading...'}
                                                        onClick={() => handleLectureCompletion()}
                                                        customClasses="text-xl max-w-max px-4 mx-auto"
                                                    />
                                                )
                                            }

                                            <IconBtn
                                                disabled={loading}
                                                onClick={() => {
                                                    if (playerRef?.current) {
                                                        playerRef.current?.seek(0);
                                                        setVideoEnded(false);
                                                    }
                                                }}
                                                text={'ReWatch'}
                                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                                            />

                                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                                {!isFirstVideo() && (
                                                    <button
                                                        disabled={loading}
                                                        onClick={goToPrevVideo}
                                                        className='blackButton'
                                                    >
                                                        Prev
                                                    </button>
                                                )}
                                                {
                                                    !isLastVideo() && (
                                                        <button
                                                            disabled={loading}
                                                            onClick={goToNextVideo}
                                                            className='blackButton'
                                                        >
                                                            Next
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </Player>
                        </div>
                    )
            }
            <div className='flex flex-col gap-2 mt-2'>
                <h1>{videoData?.title}</h1>
                <p>
                    {videoData?.description}
                </p>
            </div>
        </div>
    )
}

export default VideoDetails