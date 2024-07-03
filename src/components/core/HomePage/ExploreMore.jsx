import React, { useEffect, useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { HighlightText } from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

export const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = async (value) => {
        setCurrentTab(value);
        const results = await HomePageExplore.filter((course) => course.tag === value);
        setCourses(results[0].courses);
        setCurrentCard(results[0].courses[0].heading);
    }
    useEffect(()=>{
        setMyCards(currentTab);
    },[currentTab])

    return (
        <div className='relative max-w-maxContent mx-auto w-[85%]'>

            <div className='text-4xl font-semibold text-center'>
                Unlock the
                <HighlightText text={"Power of Code"} />
            </div>

            <p className='text-center text-richblack-300 text-lg font-semibold mt-1'>
                Learn to build anything you can imagine
            </p>

            {/* tabs section */}
            <div className="hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={`text-[16px] flex items-center gap-2
                        ${currentTab === element ? ("bg-richblack-900 text-richblack-5 font-medium")
                                    :
                                    ("text-richblack-200")} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 select-none`}
                                key={index}
                                onClick={() => setMyCards(element)}
                            >
                                {element}
                            </div>
                        );
                    })
                }
            </div>
            {/* card group */}
            <div className=' flex  flex-col lg:flex-row items-center lg:gap-10 gap-7 justify-between lg:translate-y-[20%] translate-y-[10%]'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        );
                    })
                    
                }
            </div>

        </div>
    )
}
