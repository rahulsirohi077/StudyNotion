import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
// Import Swiper core and required modules
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length > 0 ? 
            (
                <>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={100}
                        loop={true}
                        pagination={true}
                        modules={[Pagination,Autoplay,Navigation]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        navigation={true}
                        className="max-h-[30rem]"
                        breakpoints={{
                            1024:{slidesPerView:3}
                        }}
                    >
                        {
                           Courses?.map((course,index)=>(
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={'h-[250px]'}/>
                            </SwiperSlide>
                           )) 
                        }
                    </Swiper>
                </>
            ) 
            : (
                <p className="text-xl text-richblack-5">No Courses Found</p>
            )
        }
    </>
  )
}

export default CourseSlider