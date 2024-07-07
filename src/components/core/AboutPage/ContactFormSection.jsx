import React from 'react'
import { ContactUsForm } from '../../ContactUs/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto lg:mt-[90px]'>

      <h1 className='text-center mb-4 font-semibold text-4xl'>Get in Touch</h1>
      <p className='text-center font-medium text-base text-richblack-300'>We’d love to here for you, Please fill out this form.</p>

      <div className='w-[85%] mx-auto mt-8'>
        <ContactUsForm/>
      </div>
        
    </div>
  )
}

export default ContactFormSection