import React from 'react'
import { Button } from './Button'
import { HighlightText } from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

export const CodeBlocks = ({
    position, heading, subheading, btn1, btn2, codeblock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-20 items-center`}>
            {/* section 1 */}
            <div className='flex flex-col w-11/12 lg:w-[50%] gap-8 max-w-[500px]'>
                {heading}

                <div className='text-[16px] font-medium leading-6 text-richblack-300'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <Button active={btn1.active} linkto={btn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {btn1.btnText}
                            <FaArrowRight />
                        </div>
                    </Button>

                    <Button active={btn2.active} linkto={btn2.linkto}>
                        {btn2.btnText}
                    </Button>
                </div>

            </div>

            {/* section 2 */}
            <div className='flex h-fit w-11/12 lg:w-[500px] relative'>
                {backgroundGradient}
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block"
                            }
                        }
                    />
                </div>

            </div>

        </div>
    )
}
