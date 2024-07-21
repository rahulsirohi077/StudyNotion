import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import toast from "react-hot-toast";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading('Loading...');
    try {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            toast.error('RazorPay SDK failed to load');
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector('POST', COURSE_PAYMENT_API,
            { courses }, {
            Authorization: `Bearer ${token}`
        });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        console.log("orderResponse", orderResponse);
        // options
        const options = {
            key: import.meta.env.VITE_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            orderId: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                // send successfull mail
                sendPaymentSuccessEmail(orderResponse.data.message.id, response, orderResponse.data.message.amount, token);
                // verifyPayment
                verifyPayment(orderResponse.data.message.id, { ...response, courses }, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })


    } catch (error) {
        console.log("PAYMENT API ERROR....", error);
        toast.error('Could not make Payment');
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(orderId, response, amount, token) {
    console.log("Send Payment success email res = ", response);
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}

// verify payment
async function verifyPayment(orderId, bodyData, token, navigate, dispatch) {
    const toastId = toast.loading('Verifying Payment....');
    dispatch(setPaymentLoading(true));
    console.log("bodyData",{ ...bodyData, razorpay_order_id: orderId,razorpay_signature:'12345'});
    try {
        const response = await apiConnector('POST', COURSE_VERIFY_API, { ...bodyData, razorpay_order_id: orderId,razorpay_signature:'12345'}, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success('Payment Successfull, you are added to the course');
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error('Could not verify Payment');
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}