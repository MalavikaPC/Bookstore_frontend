import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons'
import Header from '../components/UserHeader'
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';



function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    const {name,email,title}=form.current
    if(name.value && email.value && title.value){
emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey:import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success("Thankyou for contacting with us...Our team will get back to you")

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    }
    else{
      toast.warning("Please fill the form completely")
    }

    
  };
  return (
    <>
      {/* Header */}
<Header/>

      {/* Contact Page */}

      <div className='px-4 md:px-20 py-6'>

        {/* Heading */}
        <h2 className='text-center text-xl mb-2'>
          Contacts
        </h2>

        {/* Description */}
        <p className='text-center text-xs max-w-4xl mx-auto mb-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione,
          officia delectus consequuntur, dicta libero magni omnis architecto
          voluptas culpa praesentium ipsum assumenda quae dolor, nihil rerum
          fugit expedita corrupti. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Optio maiores fuga, modi vel accusantium magnam
          ex, ratione aliquam eius odit consequuntur earum, itaque aspernatur
          voluptates quis aut atque!
        </p>


        {/* Contact Details */}
        <div className='grid md:grid-cols-3 gap-5 mb-6'>

          {/* Address */}
          <div className='flex items-center justify-center gap-3'>
            <div className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center'>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='text-black'
              />
            </div>

            <div className='text-xs'>
              <p className='m-0'>
                123 Main Street, Apt 4B,
              </p>
              <p className='m-0'>
                Anytown, CA 91234
              </p>
            </div>
          </div>


          {/* Phone */}
          <div className='flex items-center justify-center gap-3'>
            <div className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center'>
              <FontAwesomeIcon
                icon={faPhone}
                className='text-black'
              />
            </div>

            <p className='text-xs m-0'>
              +91 9874561230
            </p>
          </div>


          {/* Email */}
          <div className='flex items-center justify-center gap-3'>
            <div className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className='text-black'
              />
            </div>

            <p className='text-xs m-0'>
              Bookstore@gmail.com
            </p>
          </div>

        </div>


        {/* Form + Map */}
        <div className='grid md:grid-cols-2 gap-10 max-w-3xl mx-auto'>

          {/* Contact Form */}
          <div className='bg-gray-300 rounded p-4'>
<form ref={form} onSubmit={sendEmail} className='p-4 shadow bg-gray-200'>
            <h3 className='text-center text-xs font-bold mb-4'>
              Send me Message
            </h3>

            <input
            name='name'
              type='text'
              placeholder='Name'
              className='w-full bg-white rounded p-2 mb-2 text-xs'
            />

            <input
            name='email'
              type='email'
              placeholder='Email ID'
              className='w-full bg-white rounded p-2 mb-2 text-xs'
            />

            <textarea
            name='title'
              placeholder='Message'
              className='w-full bg-white rounded p-2 mb-2 text-xs'
              rows='5'
            ></textarea>

            <button type='submit' className='w-full bg-gray-800 text-white rounded p-2 text-xs'>
              Send
              <FontAwesomeIcon
                icon={faPaperPlane}
                className='ml-1'
              />
            </button>
</form>
          </div>


          {/* Google Map */}
          <div>

            <iframe
              src='https://www.google.com/maps?q=Kochi,Kerala&output=embed'
              width='100%'
              height='205'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              title='Google Map'
            ></iframe>

          </div>

        </div>

      </div>
<ToastContainer position='top-center' theme='colored' autoClose={3000} />

      {/* Footer */}

    </>
  )
}

export default Contact