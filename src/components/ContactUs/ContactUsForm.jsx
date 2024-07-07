import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import {contactusEndpoint} from '../../services/apis';
import CountryCode from '../../data/countrycode.json'

export const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data",data)
        try {
            setLoading(true);
            // const response = await apiConnector('POST',contactusEndpoint.CONTACT_US_API,data);
            const response = {status:"ok"};
            console.log("Logging response",response);
            setLoading(false);
        } catch (error) {
            console.log("Error:",error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7'>

            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col w-[50%]'>
                    <label htmlFor='firstname' className="text-[14px] text-richblack-5">First Name</label>
                    <input
                        type="text"
                        name='firstname'
                        id='firstname'
                        placeholder='Enter First Name'
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        {...register("firstname", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>
                {/* lastname */}
                <div className='flex flex-col w-[50%]'>
                    <label htmlFor='lastname' className="text-[14px] text-richblack-5">Last Name</label>
                    <input
                        type="text"
                        name='lastname'
                        id='lastname'
                        placeholder='Enter Last Name'
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        {...register("lastname")}
                    />
                </div>
            </div>
            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email' className="text-[14px] text-richblack-5">Email</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span>
                            Please Enter Your Email Address
                        </span>
                    )
                }
            </div>
            {/* phoneNo */}
            <div className='flex flex-col gap-2'>

                <label htmlFor="phonenumber" className="text-[14px] text-richblack-5">Phone Number</label>

                <div className='flex gap-5 w-[100%]'>
                    {/* dropdown */}
                    <div className='flex w-[15%] gap-5 text-black'>
                        <select 
                            name="dropdown" 
                            id="dropdown"
                            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element,index) => {
                                    return (
                                        <option key={index} value={element.code} selected={element.code === '+91'}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {/* phoneNo */}
                    <div className='w-[80%]'>
                        <input 
                           type="number" 
                           name='phonenumber'
                           id='phonenumber'
                           placeholder='12345 67890'
                           className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                           {...register("phoneNo",
                            {
                                required:  {value:true,message:"Please Enter Phone Number"},
                                maxLength: {value:10,message:"Invalid Phone Number"},
                                minLength: {value:8,message:"Invalid Phone Number"}
                            })}
                        />
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>
            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor="message" className="text-[14px] text-richblack-5">Message</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder='Enter Your Message Here'
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span>
                            Please Enter Your Message
                        </span>
                    )
                }
            </div>
            {/* button */}
            <div className='mt-6'>
                <button
                type='submit' 
                className='rounded-md bg-yellow-50 text-center px-6 py-2 text-[16px] font-bold text-black w-full'
                >
                    Send Message
                </button>
            </div>


        </form>
    )
}
