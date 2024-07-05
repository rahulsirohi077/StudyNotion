import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';

export const VerifyEmail = () => {

    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }
    },[])

    const handleOnSubmit = (e) => {

        e.preventDefault();
        
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className='text-white flex items-center justify-center mt-[150px]'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1>Verify Email</h1>
                        <p>A verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={handleOnSubmit}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} placeholder='-' 
                                className='bg-richblack-800'
                                />}
                            />
                            <button type='submit'>
                                Verify Email
                            </button>
                        </form>

                        <div>

                            <div>
                                <Link to={'/login'}>
                                    <p>Back To Login</p>
                                </Link>
                            </div>

                            <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                                Resend It
                            </button>

                        </div>

                    </div>
                )
            }
        </div>
    )
}
