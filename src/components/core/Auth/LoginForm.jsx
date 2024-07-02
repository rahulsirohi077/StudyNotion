import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword,setShowPassword] = useState(false);

    function changeHandler(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function submitHandler(event){
        event.preventDefault();
        setIsLoggedIn(true);
        toast.success("Logged In");
        navigate("/dashboard");
    }

    return (
        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4 mt-6'>
            <label className='w-full'>
                <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address <sup className='text-pink-500'>*</sup>
                </p>

                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder='Enter Email Address'
                    name='email'
                    className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                />
            </label>

            <label className='w-full relative'>
                <p className='text-[.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password <sup className='text-pink-500'>*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    className='bg-richblack-800 rounded-[.5rem] text-richblack-5 w-full p-2'
                />

                <span onClick={() => {
                    setShowPassword(!showPassword)
                }} className='absolute right-3 top-[34px] cursor-pointer text-white'>
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) 
                    : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>) }
                </span>
                    
                <Link to={"#"}>
                    <p className='text-sm text-blue-100 max-w-max mt-1 ml-auto select-none'>
                        Forgot Password
                    </p>
                </Link>
            
            </label>
            
            <button className='bg-yellow-100 rounded-md p-2 select-none'>
                Sign In
            </button>
        </form>
    )
}
