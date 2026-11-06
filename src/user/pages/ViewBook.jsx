import React, { useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getSingleBookAPI, paymentAPI } from '../../services/allApi'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axiosInstance from '../../api/axiosinstance'

function ViewBook() {
  const [modalStatus, setmodalStatus] = useState(false)
  const [bookDetails,setBookDetails]=useState({})
const {id}=useParams()

useEffect(()=>{
  getBook()

},[])

const getBook=async()=>{
  const res=await getSingleBookAPI(id)
  console.log(res);
  if(res.status==200){
    setBookDetails(res.data)
  }
  
}
const makePayment=async()=>{
  const res=await paymentAPI(id)
console.log(res);
if(res.status==200){
  const {checkoutURL}=res.data
  window.location.href=checkoutURL
}

}
  return (
    <>
      <Header />
      <div className='md:m-10 m-5'>
        <div className='p-5 border shadow '>
          <div className='md:grid grid-cols-3 items-center'>
            <div className='col-span-1'>
              <img className="w-60 h-76 object-cover" src={bookDetails?.imageUrl} alt="" />
            </div>
            <div className='col-span-2'>
              <div className='flex items-center justify-between md:mt-0 mt-10'>
                <div>
                  <h3 className='font-bold'>{bookDetails?.title}</h3>
                  <p className='text-blue-800'>-{bookDetails?.author}</p>

                </div>
                <button onClick={() => setmodalStatus(true)}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </div>
              <div className='md:grid grid-cols-3 mt-5 gap-8'>
                <div>
                  <p className='font-bold'>Publisher:{bookDetails?.publisher}</p>
                  <p className='font-bold'>Category:{bookDetails?.catagory}</p>
                </div>
                <div>
                  <p className='font-bold'>Language:{bookDetails?.language}</p>
                  <p className='font-bold'>Real Price:₹{bookDetails?.price}</p>
                </div>
                <div>
                  <p className='font-bold'>No.of Pages:{bookDetails?.pages}</p>
                  <p className='font-bold'>ISBN:{bookDetails?.isbn}</p>
                </div>

              </div>
              <p className='mt-5 text-justify'>
                {bookDetails?.abstract}
              </p>
              <div className='mt-5 flex justify-end'>
                <Link to={'/all-books'} className='bg-blue-900 text-white p-2 rounded'><FontAwesomeIcon icon={faBackward} />Back</Link>
                <button className='bg-green-900 text-white p-2 rounded ms-5' onClick={makePayment}>Buy Now @₹ {bookDetails?.discountPrice}</button>

              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Modal */}
      {
        modalStatus &&
        <div className='relative z-10'>
          <div className='bg-gray-500/75 inset-0 fixed '>
            <div className='flex items-center justify-center min-h-screen'>
              <div className='bg-white w-full md:m-25 m-5 ' style={{ height: '500px' }}>
                {/* Modal Header */}
                <div className='flex text-white bg-black items-center justify-between'>
                  <h3>Book Images</h3>
                  <button onClick={() => setmodalStatus(false)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                {/* Modal Body */}
                <div className='bg-white p-5 max-h-screen overflow-y-auto'>
                  <p className='text-blue-700'><FontAwesomeIcon icon={faCamera} />Camera clicks of the books in the seller hands</p>
                  <div className='md:flex'>
                    {/* duplicate img */}
                    {
                      bookDetails?.uploadImages?.map(filename=>(
                        <img src={`${axiosInstance.defaults.baseURL}uploads/${filename}`} alt="" height={'200px'} width={'200px'} className='mx-5'/>
                      ))
                    }

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      }
    </>
  )
}

export default ViewBook
