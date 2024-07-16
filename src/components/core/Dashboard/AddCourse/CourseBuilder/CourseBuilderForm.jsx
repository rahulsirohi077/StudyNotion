import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconBtn } from '../../../../common/IconBtn';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from 'react-icons/bi';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);
  const [loading,setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      // we are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id
        },token
      )
    }
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      },token);
    }

    // update values
    if(result){
      dispatch(setCourse(result));
      setEditCourse(null);
      setValue('sectionName',"");
    }
    console.log("result = ",result);
    console.log("course = ",course);
    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionName', "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one Section");
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue('sectionName', sectionName);
  }

  return (
    <div className='text-white bg-richblack-800 flex flex-col gap-6 p-6 rounded-md border border-richblack-700'>
      <p>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className='flex flex-col gap-2'>
          <label htmlFor="sectionName" className='label-style'>Section Name <sup className='text-pink-200'>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add Section Name'
            {...register('sectionName', { required: true })}
            className='w-full form-style'
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
        </div>

        <div className='flex gap-2 mt-5'>
          <IconBtn
            type={"submit"}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-yellow-50"}
          >
            <MdAddCircleOutline className='text-yellow-50' size={20} />
          </IconBtn>
          {
            editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline'
              >
                Cancel Edit
              </button>
            )
          }
        </div>

      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div className='flex justify-end gap-x-10 mt-3'>

        <button onClick={goBack}
        className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>
        
        <IconBtn text={"Next"} onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm