import React from 'react'
import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
    <>
    <UserHeader/>
    <div className='container min-h-screen flex justify-center items-center'>
        <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10'>
            <div>
                <h1 className='text-4xl text-blue-700 font-bold'> Payment Failed!</h1>
                <p className='text-2xl my-10'> Sorry! Your payment could not be completed.
          Please try again</p>
                <Link className='bg-blue-700 flex-items-center w-40 p-2 text-white rounded' to={'/all-books'}>Explore More Books</Link>
            </div>
            <div className='flex justify-center items-center'>
                <img src="https://cdn.dribbble.com/users/107759/screenshots/4594246/15_payment-error.gif" alt=''/>
            </div>
        </div>
    </div>
    </>
  )
  
}

export default PaymentFail