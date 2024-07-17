import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth); 

    useEffect(()=>{
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        }
        populateCourseDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    if(loading){
        return (
            <div className='spinner'></div>
        )
    }

  return (
    <div>
        <h1>Edit Course</h1>
        <div className='w-11/12 max-w-[60%] mx-auto'>
            {
                course ? (<RenderSteps />) : (<p>Course Not Found</p>)
            }
        </div>
    </div>
  )
}

export default EditCourse