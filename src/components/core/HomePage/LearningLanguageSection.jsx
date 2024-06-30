import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import { Button } from './Button'



export const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5'>

        <div className='text-4xl font-semibold text-center'>
          Your Swiss Knife for
          <HighlightText text={"learning any language"} />
        </div>


        <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        {/* 3 images */}
        <div className='flex flex-col lg:flex-row items-center justify-center mt-5 mx-auto'>

          <img src={know_your_progress} alt="Know_your_progress_image" 
          className='object-contain lg:-mr-32'
          />
          <img src={compare_with_others} alt="compare_with_others_image"
          className='object-contain -mt-12 lg:mt-0'
          />
          <img src={plan_your_lesson} alt="plan_your_lesson_image" 
          className='object-contain lg:-ml-36 -mt-20 lg:mt-0'
          />

        </div>

        <div className='flex items-center justify-center'>
        <Button active={true} linkto={"./signup"}>
          <div>
            Learn More
          </div>
        </Button>
        </div>
        
      </div>
    </div>
  )
}
