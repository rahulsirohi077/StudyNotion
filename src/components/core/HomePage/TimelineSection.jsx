import React from 'react';
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: logo1,
    heading: "Leadership",
    Description: "Fully commited to the success company",
  },
  {
    Logo: logo2,
    heading: "Responsibilty",
    Description: "Students will always be our top priority",
  },
  {
    Logo: logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  }
]

export const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-14 items-center'>
        {/* left section */}
        <div className='sm:w-[45%] flex flex-col gap-8 lg:h-[410px] justify-evenly'>
          {
            timeline.map((element, index) => {
              return (
                <div className='flex gap-6' key={index}>

                  <div className='w-[50px] h-[50px] bg-white flex items-center justify-center relative rounded-full'>
                    <img src={element.Logo} />
                    {/* vertical line */}
                    <div class={`hidden ${timeline.length - 1 === index ? "hidden" : "lg:block"}  
                        h-10 border-r-[2px] border-dotted border-richblack-100 bg-richblack-400/0 w-[26px]
                        absolute left-[0px] bottom-[-50px]`}>
                    </div>
                  </div>

                  <div>
                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                    <p className='text-base'>{element.Description}</p>
                  </div>

                </div>
              );
            })}
        </div>

        {/* right image section */}
        <div className='relative shadow-2xl drop-shadow shadow-blue-200'>

          <img src={timelineImage} alt='timelineImage'
            className=' shadow-[20px_20px_rgba(255,255,255)] object-cover h-fit'
          />

          <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 px-3
          left-[50%] translate-x-[-50%] translate-y-[-50%] w-11/12'>

            <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-5'>

              <p className='text-sm xs:text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>

            </div>

            <div className='flex gap-5 items-center px-7'>

              <p className='text-sm xs:text-3xl font-bold'>250</p>
              <p className='text-caribbeangreen-300 text-sm'>Type of courses</p>

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
