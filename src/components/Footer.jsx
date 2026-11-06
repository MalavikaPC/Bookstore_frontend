import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 md:gap-20 bg-gray-900 text-white p-10'>
        <div>
          <h4 className='font-bold'>ABOUT US</h4>
          <p className='mt-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit numquam ad rerum quos sunt quasi doloremque quisquam, provident animi obcaecati eligendi tempora eveniet asperiores laborum, accusamus aspernatur ab perferendis ipsa.</p>
        </div>
        <div className='mt-5 md:mt-0'>
          <h4 className='font-bold'>NEWS LETTER</h4>
          <p className='mt-4'>stay updated with our latest trends</p>
          <div className='mt-4 flex'>
            <input className='p-2 bg-white placeholder-gray-500' type="text" placeholder='email id' />
            <button className='bg-yellow-400 p-2'><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>
        <div className='mt-5'>
          <h4>FOLLOW US</h4>
          <p>Let us be social</p>
          <div className='mt-5'>
            <FontAwesomeIcon icon={faInstagram} className='text-3xl' />
            <FontAwesomeIcon icon={faTwitter} className='text-3xl' />
            <FontAwesomeIcon icon={faFacebook} className='text-3xl' />
            <FontAwesomeIcon icon={faLinkedin} className='text-3xl' />

          </div>
        </div>
      </div>
      <div className='bg-black text-white text-center p-5'>
        <p>Copyright &copy;2026 All rights reserved | This website is made with &#10084; by Anna Steef</p>
      </div>
    </>
  )
}

export default Footer
