import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import { getBooksAPI } from '../../services/allApi'
import { searchContext } from '../../context/SearchContext'

function AllBooks() {
  const[listStatus,setListStatus]=useState(false)
  const[token,setToken]=useState("")
  const [allBooks,setAllBooks]=useState([])
  const [dummyallBooks,setDummyAllBooks]=useState([])
  const [catagoryList,setCatagoryList]=useState([])
  console.log(dummyallBooks);
  const {searchKey,setSearchKey} = useContext(searchContext)
  
  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
    getBooks()
  },[searchKey])
  const getBooks=async()=>{
    const res=await getBooksAPI(searchKey)
    // console.log(res);
    if(res.status==200){

setAllBooks(res.data)
setDummyAllBooks(res.data)
const tempCatagaryList=res.data.map(bk=>bk.catagory)
setCatagoryList([...new Set(tempCatagaryList)])
    }
    
  }

const filterBooks=(catagory)=>{
console.log(catagory);
if(catagory!='all'){
setAllBooks(dummyallBooks?.filter(book=>book.catagory==catagory))

}else{
  getBooks()
}

}

  return (
    <>
    <UserHeader/>
   { token?
   <>
     <div className='md:grid md:grid-cols-5 md:px-10 p-5'>
        <div className='md:col-span-1 md:pe-8'>
          <div className='flex justify-between items-center'>
            <h1 className='mb-5 text-2xl font-semibold'>Filters</h1>
            <button onClick={()=>setListStatus(!listStatus)} className='text-3xl md:hidden'><FontAwesomeIcon icon={faEllipsis} /></button>
          </div>

          <div className={listStatus? 'block':'hidden md:block'}>
            {
              catagoryList?.map(cat=>(
<div className='my-2'>
  <label><input  onClick={()=>filterBooks(cat)} type='radio' name='filter' className='me-2' />{cat}</label></div>
              ))
            }
            
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Philosophy</label></div>
            <div className='my-2'><label><input onClick={()=>filterBooks('all')} type='radio' name='filter' className='me-2' />No Filter</label></div>
           
          </div>
        </div>

        <div className='md:col-span-4'>
          <h1 className='text-2xl font-semibold text-center mb-5'>Collections</h1>

          <div className='flex justify-center mb-6'>
            <div className='flex w-full max-w-[350px]'>
              <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type='text' placeholder='Search by Title' className='border border-gray-200 px-3 py-1.5 text-xs outline-none flex-1 text-black' />
              <button className='bg-[#4054d8] text-white px-5 text-xs'>Search</button>
            </div>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            { allBooks?.length>0?
            allBooks?.map(book=>(
            <div hidden={book?.status=='Pending' || book?.status=='Sold'} className='shadow text-center p-3 m-2 rounded  sm:p-3 rounded' style={{height:'320px'}}>
              <Link to={`/view/${book?._id}/book`}>
                <img src={book?.imageUrl} alt='' className='h-50 w-50 sm:h-[180px] md:h-[190px] w-full object-contain' />
              </Link>
              <div className='p-3 flex items-center justify-center flex-col'>
                <p className='font-bold text-xl sm:text-sm'>{book?.author}</p>
                <p className='text-blue-800 text-xl sm:text-sm'>{book?.title}</p>
                <p >{book?.price}</p>
              </div>
            </div>))
            :
            <p className='font-bold text-center my-3'>Loading...</p>}

            
          </div>
        </div>
      </div>
      </>
      :
      <div className='min-h-screen flex justify-center items-center flex-col'>
        <img className='w-50' src='https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif'/>
        <h4 className='mt-10 text-xl font-bbold'>Please <Link className='text-blue-600 underline' to={'/login'}>Login</Link>to Explore more...</h4>
      </div>
      }
    </>
  )
}

export default AllBooks






{/* <div className='shadow text-center p-2 sm:p-3 rounded'>
              <Link to='/view/2/book'>
                <img src='https://m.media-amazon.com/images/I/31ALGsUpfPL._AC_UF1000,1000_QL80_.jpg' alt='The Da Vinci Code' className='h-[150px] sm:h-[180px] md:h-[190px] w-full object-contain' />
              </Link>
              <div className='p-2 flex items-center justify-center flex-col'>
                <p className='font-semibold text-xs sm:text-sm'>Dan Brown</p>
                <p className='text-blue-800 text-xs sm:text-sm'>The Da Vinci Code</p>
                <button className='bg-[#4054d8] text-white text-[10px] sm:text-xs px-5 py-1 mt-2'>Buy-$13</button>
              </div>
            </div>

            <div className='shadow text-center p-2 sm:p-3 rounded'>
              <Link to='/view/3/book'>
                <img src='https://m.media-amazon.com/images/I/31ALGsUpfPL._AC_UF1000,1000_QL80_.jpg' alt='The Da Vinci Code' className='h-[150px] sm:h-[180px] md:h-[190px] w-full object-contain' />
              </Link>
              <div className='p-2 flex items-center justify-center flex-col'>
                <p className='font-semibold text-xs sm:text-sm'>Dan Brown</p>
                <p className='text-blue-800 text-xs sm:text-sm'>The Da Vinci Code</p>
                <button className='bg-[#4054d8] text-white text-[10px] sm:text-xs px-5 py-1 mt-2'>Buy-$13</button>
              </div>
            </div>

            <div className='shadow text-center p-2 sm:p-3 rounded'>
              <Link to='/view/4/book'>
                <img src='https://m.media-amazon.com/images/I/31ALGsUpfPL._AC_UF1000,1000_QL80_.jpg' alt='The Da Vinci Code' className='h-[150px] sm:h-[180px] md:h-[190px] w-full object-contain' />
              </Link>
              <div className='p-2 flex items-center justify-center flex-col'>
                <p className='font-semibold text-xs sm:text-sm'>Dan Brown</p>
                <p className='text-blue-800 text-xs sm:text-sm'>The Da Vinci Code</p>
                <button className='bg-[#4054d8] text-white text-[10px] sm:text-xs px-5 py-1 mt-2'>Buy-$13</button>
              </div>
            </div> */}



             {/* <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Romance</label></div>
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Mystery/Thriller</label></div>
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Horror</label></div>
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Auto/Biography</label></div>
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Self-Help</label></div>
            <div className='my-2'><label><input type='radio' name='filter' className='me-2' />Politics</label></div> */}