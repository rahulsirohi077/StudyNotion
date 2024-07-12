import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import RequirementField from './RequirementField';
import { IconBtn } from '../../../../common/IconBtn';
import { setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constant';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if (editCourse) {
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseDescription);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefit', course.whatYouWillLearn);
            setValue('courseCategory', course.category);
            setValue('courseRequirements', course.instructions);
            setValue('courseImage', course.thumbnail);
        }
        getCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        console.log(currentValues);
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true;
        }
        return false;
    }

    // handle next button Click
    const onSubmit = async (data) => {

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                // add tags
                if (currentValues.courseBenefit !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefit);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }
                // handle image
                if (currentValues.courseRequirements?.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if (result) {
                    setStep(2);
                    dispatch(setCourse(result));

                }
            }
            else {
                toast.error("No changes made to the form");
            }
            return;
        }


        // create a new Course
        const formData = new FormData();
        formData.append('courseName', data.courseTitle);
        formData.append('courseDescription', data.courseShortDesc);
        formData.append('price', data.coursePrice);
        formData.append('whatYouWillLearn', data.courseBenefits);
        formData.append('category', data.courseCategory);
        formData.append('instructions', JSON.stringify(data.courseRequirements));
        formData.append('status', COURSE_STATUS.DRAFT);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if (result) {
            setStep(2);
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("Printing formData ", formData);
        console.log("Printing result ", result);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8'
        >
            <div>
                <label htmlFor="courseTitle">Course Title <sup>*</sup></label>
                <input
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register('courseTitle', { required: true })}
                    className='w-full'
                />
                {
                    errors.courseTitle && (
                        <span>Course Title is Required</span>
                    )
                }
            </div>

            <div>
                <label htmlFor="courseShortDesc">Course Short Description</label>
                <textarea
                    id="courseShortDesc"
                    placeholder='Enter Description'
                    {...register('courseShortDesc', { required: true })}
                    className='min-h-[140px] w-full'
                />
                {
                    errors.courseShortDesc && (
                        <span>Course Description is required</span>
                    )
                }

            </div>

            <div className='relative'>
                <label htmlFor="coursePrice">Course Price <sup>*</sup></label>
                <input
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register('coursePrice', {
                        required: true,
                        valueAsNumber: true
                    })}
                    className='w-full'
                />
                <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400' />
                {
                    errors.courseTitle && (
                        <span>Course Price is Required</span>
                    )
                }
            </div>

            <div>
                <label htmlFor="courseCategory">Course Category <sup>*</sup></label>
                <select
                    id="courseCategory"
                    defaultValue={''}
                    {...register('courseCategory', { required: true })}
                >
                    <option value="" disabled>Choose a Category</option>

                    {
                        !loading && courseCategories.map((category, index) => (
                            <option value={category} key={index}>
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span>Course Category is Required</span>
                    )
                }
            </div>

            {/* create custom component for handling tags input */}
            {/* <ChipInput
            label="Tags"
            name='courseTags'
            placeholder='Enter Tags and press enter'
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        /> */}

            {/* component for uploading and showing preview of media */}
            {/* <Upload
            name=
            label=
            register={}
            errors=
            setValue={}
        /> */}

            {/* Benefits of the course */}
            <div>
                <label htmlFor="">Benefits of the course</label>
                <textarea
                    id="courseBenefits"
                    placeholder='Enter Benefits of the Course'
                    {...register('courseBenefits', { required: true })}
                    className='min-h-[130px] w-full'
                />
                {
                    errors.courseBenefits && (
                        <span>
                            Benefits of the course are required**
                        </span>
                    )
                }
            </div>

            <RequirementField
                name="courseRequirement"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div>
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className='flex items-center gap-x-2 bg-richblack-300'
                        >
                            Continue without saving
                        </button>
                    )
                }

                <IconBtn
                    text={!editCourse ? "Next" : "Save Changes"}
                />
            </div>


        </form>
    )
}

export default CourseInformationForm