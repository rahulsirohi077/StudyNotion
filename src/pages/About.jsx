import React from 'react'
import { HighlightText } from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import { Quote } from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

export const About = () => {
    return (
        <div className='mx-auto'>
            <div className='text-white'>
                {/* section 1 */}
                <section className='bg-richblack-700'>
                    <div className=' flex flex-col w-11/12 mx-auto lg:px-[120px] lg:pt-[80px] gap-[52px]'>
                        <header className='flex flex-col gap-[16px] items-center'>
                            <div className='font-semibold text-4xl w-[70%] text-center font-inter'>
                                Driving Innovation in Online Education for a
                                <HighlightText text={"Brighter Future"} />
                            </div>
                            <div className='text-center w-[65%] font-medium font-inter text-[16px] leading-6 text-richblack-300'>
                                <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                            </div>

                        </header>
                        <div className='flex gap-x-6 mx-auto translate-y-6'>
                            <img src={BannerImage1} />
                            <img src={BannerImage2} />
                            <img src={BannerImage3} />
                        </div>
                    </div>
                </section>
                {/* section 2 */}
                <section className='lg:px-[120px] lg:py-[90px] mx-auto border-b border-richblack-700'>
                    <div className='font-semibold text-4xl text-center w-[95%]'>
                        <Quote />
                    </div>
                </section>

                {/* section 3 */}
                <section>
                    <div className='flex flex-col'>
                        {/* founding story */}
                        <div className='flex lg:px-[120px] lg:py-[90px] justify-between'>
                            {/* Founding story left box */}
                            <div className='flex flex-col gap-10 w-[50%]'>
                                <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                                    Our Founding Story</h1>
                                <p className='font-medium text-base text-richblack-300 lg:w-[95%]'>
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                </p>
                                <p className='font-medium text-base text-richblack-300 lg:w-[95%]'>
                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                </p>
                            </div>
                            {/* Founding story right box (image)*/}
                            <div className='flex items-center justify-center w-[45%]'>
                                <img src={FoundingStory}
                                    className='w-full shadow-[0_0_20px_0] shadow-[#FC6767]'
                                />
                            </div>
                        </div>
                        {/* vision and mission */}
                        <div className='flex lg:px-[120px] lg:py-[90px] gap-24'>
                            {/* left box */}
                            <div className='flex flex-col gap-6'>
                                <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]">
                                    Our Vision
                                </h1>
                                <p className='font-medium text-base text-richblack-300 lg:w-[95%]'>
                                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                                </p>
                            </div>
                            {/* right box */}
                            <div className='flex flex-col gap-6'>
                                <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                                    Our Mission
                                </h1>
                                <p className='font-medium text-base text-richblack-300 lg:w-[95%]'>
                                    our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* section 4 */}
                <StatsComponent />

                {/* section 5 */}
                <section className='mx-auto flex flex-col items-center justify-between lg:px-[120px] lg:py-[90px]'>
                    <LearningGrid />
                    <ContactFormSection />
                </section>

                <section>
                    <div className='text-center font-bold text-4xl'>
                        Reviews From Other Learners
                    </div>
                </section>
            </div>
            <Footer />
        </div>

    )
}