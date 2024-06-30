import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export const SignupForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType,setAccountType] = useState("student");

    function changeHandler(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function submitHandler(event) {
        event.preventDefault();
        if (formData.password != formData.confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        setIsLoggedIn(true);
        toast.success("Account Created");
        
        const accountData = {
            ...formData
        }

        const finalData = {
            ...accountData,
            accountType
        }

        console.log("printing Final accountData")
        console.log(finalData)

        navigate("/dashboard");
    }

    return (
        <div>
            {/* Students-Instructor tab */}
            <div className='flex rounded-full bg-gray-500 gap-x-1 p-1 my-6 max-w-max'>
                <button className={`text-white ${accountType === 'student' ? 'bg-black' : 'bg-transparent'} py-2 px-5 rounded-full transition-all duration-200`}
                onClick={()=>{
                    setAccountType("student")
                }}
                >
                    Student</button>
                <button className={`text-white ${accountType === 'instructor' ? 'bg-black' : 'bg-transparent'} py-2 px-5 rounded-full transition-all duration-200`}
                onClick={()=>{
                    setAccountType("instructor")
                }}
                >Instructor</button>
            </div>

            <form onSubmit={submitHandler}>
                {/* firstname and lastname */}
                <div className='flex gap-4'>
                    <label className='w-full'>
                        <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name <sup className='text-pink-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name='firstname'
                            onChange={changeHandler}
                            placeholder='Enter First Name'
                            value={formData.firstname}
                            className='bg-richblack-800 rounded-[.5rem] text-gray-300 w-full p-2'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name <sup className='text-pink-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name='lastname'
                            onChange={changeHandler}
                            placeholder='Enter Last Name'
                            value={formData.lastname}
                            className='bg-richblack-800 rounded-[.5rem] text-gray-300 w-full p-2'
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
                            className='bg-richblack-800 rounded-[.5rem] text-gray-300 w-full p-2'
                        />
                    </label>
                </div>


                {/* createPassword and confirmPassword */}
                <div className='flex gap-4 mt-3'>
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
                                className='bg-richblack-800 rounded-[.5rem] text-gray-300 w-full p-2 select-none'
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
                                className='bg-richblack-800 rounded-[.5rem] text-gray-300 w-full p-2 select-none'
                            />
                            <span onClick={() => {
                                setShowConfirmPassword(!showConfirmPassword)
                            }} className='absolute right-3 top-[34px] cursor-pointer text-white'>
                                {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                        </label>

                    </div>


                </div>
                <button className='w-full bg-yellow-400 rounded-md p-2 select-none mt-4 '>
                    Create Account
                </button>
            </form>
        </div>
    )

}
