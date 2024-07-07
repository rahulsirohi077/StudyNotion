import React from 'react'

const statsArr = [
    {count:'5K', label:"Active Students"},
    {count:'10+', label:"Mentors"},
    {count:'200+', label:"Courses"},
    {count:'50+', label:"Awards"},
]

const Stats = () => {
  return (
    <section>
        <div className='bg-richblack-700 lg:px-[120px] lg:py-[90px]'>
            <div className='flex justify-between w-11/12'>
                {
                    statsArr.map((data,index)=>{
                        return (
                            <div key={index} className='flex flex-col gap-3'>
                                <h1 className='text-center text-4xl text-richblack-5'>{data.count}</h1>
                                <h2 className='text-center font-semibold text-richblack-300'>{data.label}</h2>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Stats