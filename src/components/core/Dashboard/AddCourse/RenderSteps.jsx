import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from '../CourseBuilder/CourseBuilderForm';

const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ];

    return (
        <div>

            <div className='flex'>

                {steps.map((item) => (
                    <div className='flex w-[25%]' key={item.id}>
                        <div>
                            <div className={` grid place-items-center aspect-square${step === item.id ? "bg-yellow-900 border border-yellow-50 text-yellow-50"
                                : "border border-richblack-700 bg-richblack-800 text-richblack-300"}
                                ${step > item.id && "bg-yellow-50 text-yellow-50"}}`}>

                                {
                                    step > item.id ? (<FaCheck className='font-bold text-richblack-900' />) : (item.id)
                                }

                            </div>
                        </div>
                        {/* Add Dashes*/}
                        {
                            item.id !== steps.length && (
                                <div className={`border border-dashed w-[100%] ml-2 mr-2 h-0 mt-3 
                                    ${item.id < step ? "border-yellow-50" : "border-richblack-600"}`}></div>
                            )
                        }

                    </div>
                ))}

            </div>

            <div className='flex gap-20'>
                {
                    steps.map((item) => (
                        <div key={item.id}>
                            <div  className={`${item.id === 3 ? "lg:ml-24" : ""}`}>
                                <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"
                                    }`}>{item.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm/>}
            {/* {step === 3 && <PublishCourse/>}  */}
        </div>
    )
}

export default RenderSteps