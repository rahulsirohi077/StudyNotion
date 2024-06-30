import React from 'react'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'
import frameImg from "../assets/frame.png"
import { FcGoogle } from 'react-icons/fc'

export const Template = ({ title, desc1, desc2, image, formtype, setIsLoggedIn }) => {
    return (
        <div className='flex w-11/12 max-w-[1160px] pt-12 mx-auto justify-between'>
            <div className='w-11/12 max-w-[450px]'>
                <h1 className='text-white font-semibold text-[1.875rem] leading-[2.375rem]'>
                    {title}
                </h1>

                <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                    <span className='text-richblack-300'>
                        {desc1}
                    </span>
                    <br />
                    <span className='text-blue-400 italic'>
                        {desc2}
                    </span>

                </p>

                {formtype === "signup" ?
                    (<SignupForm setIsLoggedIn={setIsLoggedIn} />)
                    : (<LoginForm setIsLoggedIn={setIsLoggedIn} />)}

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <p className='text-richblack-300 font-medium leading-[1.375rem]'>OR</p>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                </div>

                <button className='w-full flex justify-center items-center rounded-md font-medium text-richblack-300 outline-white outline-none'>
                    <FcGoogle/>
                    <p className='ml-2'>Sign in with google</p>
                </button>

            </div>

            <div className='relative w-11/12 max-w-[450px]'>
                <img src={image} alt="Students" width={558} height={490} loading='lazy' 
                className='absolute -top-4 right-4'
                />
                <img src={frameImg} alt='pattern' width={558} height={504} loading='lazy' />
            </div>

        </div>
    )
}
