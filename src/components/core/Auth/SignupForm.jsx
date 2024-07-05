import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import countrycode from '../../../data/countrycode.json'

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constant"
import { useDispatch } from 'react-redux';

export const SignupForm = () => {

    const dispatch = useDispatch();
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            contactNumber:""
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    return (
        <div>
            {/* Students-Instructor tab */}
            <div className='flex rounded-full bg-richblack-800 gap-x-1 p-1 my-6 max-w-max'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
            >
                <button className={`text-white ${accountType === ACCOUNT_TYPE.STUDENT ? 'bg-richblack-900 text-richblack-5' : 'bg-transparent text-richblack-200'} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => {
                        setAccountType(ACCOUNT_TYPE.STUDENT)
                    }}
                >
                    Student</button>
                <button className={`text-white ${accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'bg-richblack-900 text-richblue-5' : 'bg-transparent text-richblack-200'} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => {
                        setAccountType(ACCOUNT_TYPE.INSTRUCTOR)
                    }}
                >Instructor</button>
            </div>

            <form onSubmit={handleOnSubmit}>
                {/* firstname and lastname */}
                <div className='flex gap-4'>
                    <label className='w-full'>
                        <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup className='text-pink-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name='firstName'
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.firstName}
                            className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup className='text-pink-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name='lastName'
                            onChange={changeHandler}
                            placeholder='Enter Last Name'
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                        />
                    </label>
                </div>
                {/* email add */}
                <div className='mt-3'>
                    <label className='w-full'>
                        <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-500'>*</sup></p>
                        <input
                            required
                            type="email"
                            name='email'
                            onChange={changeHandler}
                            placeholder='Enter Email Address'
                            value={formData.email}
                            className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                        />
                    </label>
                </div>

                {/* Phone number
                <div className='mt-3'>
                    <label className='w-full flex flex-col gap-3'>
                        <p className='text-richblack-5 leading-[1.375rem] text-[.875rem]'>
                            Phone Number <sup className='text-pink-500'>*</sup>
                        </p>
                        <div className='flex gap-5 items-center'>

                            <div className='w-[20%]'>
                                <input
                                    list="country-codes"
                                    placeholder="+91"
                                    className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2 leading-[1.375rem] tex-[.875rem]'
                                />
                                <datalist id="country-codes" className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2 leading-[1.375rem] tex-[.875rem]'>
                                    {
                                        countrycode.map((countrycode,index) => <option value={countrycode.code}key={index}>{countrycode.code}</option>)
                                    }
                                </datalist>
                                {/* <select className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2 leading-[1.375rem] tex-[.875rem]'>
                                    {
                                        countrycode.map((countrycode) => <option value={countrycode.code}>{countrycode.code}</option>)
                                    }
                                </select> */}
                            {/* </div>

                            <div className='w-full justify-stretch'>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className='leading-[1.375rem] text-[.875rem] bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                                />
                            </div>

                        </div>
                    </label>
                </div> */}

                {/* createPassword and confirmPassword */}
                <div className='flex gap-4 mt-4'>
                    <div className='w-full'>
                        <label className='w-full relative'>
                            <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-500'>*</sup></p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                onChange={changeHandler}
                                placeholder='Enter Password'
                                value={formData.password}
                                className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2 select-none'
                            />
                            <span onClick={() => {
                                setShowPassword(!showPassword)
                            }} className='absolute right-3 top-[34px] cursor-pointer text-white'>
                                {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                        </label>
                    </div>

                    <div className='w-full'>
                        <label className='w-full relative'>
                            <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem] select-none'>Confirm Password<sup className='text-pink-500'>*</sup></p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                onChange={changeHandler}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2 select-none'
                            />
                            <span onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                            }} className='absolute right-3 top-[34px] cursor-pointer text-white'>
                                {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                        </label>

                    </div>


                </div>
                <button className='w-full bg-yellow-100 rounded-md p-2 select-none mt-4 '>
                    Create Account
                </button>
            </form>
        </div>
    )

}
