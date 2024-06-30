import React from 'react'
import InstructorImage from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import { Button } from './Button'
import { FaArrowRight } from 'react-icons/fa'

export const InstructorSection = () => {
  return (
    <div className='mt-16 w-8/12'>
      <div className='flex flex-col-reverse sm:flex-row gap-20 items-center'>

        <div className='sm:w-[50%]'>
          <img src={InstructorImage} alt=""
            className='shadow-[-20px_-20px_rgba(255,255,255)] mt-10'
          />
        </div>

        <div className='sm:w-[50%] flex flex-col gap-10'>

          <div className='text-4xl font-semibold w-[50%]'>
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          <p className='font-medium text-[16px] w-[90%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className='w-fit'>
            <Button active={true} linkto={"/signup"}>
              <div className='flex gap-2 items-center'>
                Start Learning Today
                <FaArrowRight />
              </div>

            </Button>
          </div>


        </div>

      </div>

    </div>
  )
}
