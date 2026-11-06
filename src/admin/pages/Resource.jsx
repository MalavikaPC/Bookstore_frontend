import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import AdminHeader from '../components/AdminHeader'
import { Link } from 'react-router-dom'
import { BooksAPI, editBookStatusAPI, getUserAPI } from '../../services/allApi'
import { useEffect } from 'react'

import axiosInstance from '../../api/axiosinstance'


function Resource() {

  const [bookstatus, setBookstatus] = useState(true)
  const [userstatus, setUserstatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [users, setUsers] = useState([])
  // console.log(users);

  useEffect(() => {
    if (bookstatus) {
      getBooks()
    }
    else {
      getUsers()
    }

  }, [bookstatus, userstatus])

  const getBooks = async () => {
    const res = await BooksAPI()
    console.log(res);
    setAllBooks(res.data)

  }

  const updateBookStatus = async (id) => {
    const res = await editBookStatusAPI(id)
    console.log(res);
    if (res.status == 200) {
      getBooks()
    }


  }

  const getUsers = async () => {
    const res = await getUserAPI()
    // console.log(res);

    setUsers(res.data)
  }
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-5 gap-10'>
        <div className='col-span-1'>
          <Sidebar />

        </div>
        <div className='col-span-4'>
          {/* {tabs} */}
          <div className='flex items-center justify-center my-10'>
            <p onClick={() => { setBookstatus(true); setUserstatus(false); }} className={bookstatus ? 'text-blue-800 p-3 border-grey-300 border-t border-l border-r rounded cursor-pointer' : 'mx-2'}>
              Book List
            </p>
            <p onClick={() => { setBookstatus(false); setUserstatus(true); }} className={userstatus ? 'text-blue-800 p-4 border-grey-400 border-t border-l border-r rounded cursor-pointer' : 'mx-2'}>
              User List
            </p>

          </div>
          {/* {contents} */}
          {
            bookstatus &&
            <div className='md:grid grid-cols-4'>
              {/* {card} */}
              {
                allBooks?.length > 0 ?
                  allBooks?.map(bk => (
                    <div className='shadow text-center p-3 m-2 rounded flex flex-col' style={{ height: '400px' }}>
                      <Link to={`/view/${bk._id}/book`}>
                        <img src={`${axiosInstance.defaults.baseURL.replace(/\/$/, '')}/uploads/${bk.uploadImages[0]}`} alt="" className='h-50 w-50' />
                      </Link>
                      <div className='p-3 flex items-center justify-center flex-col'>
                        <p className='font-bold text-xl'>{bk.author}</p>
                        <p className='text-blue-800 text-xl'>{bk.title}</p>
                        <p>Price: ₹{bk.price}</p>
                        {
                          bk?.status != 'Approved' ?
                            <button className='bg-blue-900 p-2 text-white rounded mt-2' onClick={() => updateBookStatus(bk?._id)}>Approve</button>
                            :
                            <img src="https://static.vecteezy.com/system/resources/previews/002/743/514/large_2x/green-check-mark-icon-in-a-circle-free-vector.jpg" width={'50px'} alt="" />
                        }
                      </div>

                    </div>
                  ))
                  :
                  <p>Loading</p>
              }
            </div>
          }
          {
            userstatus &&
            // <div className='md:grid grid-cols-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3'>
              {
                users?.length > 0 ?
                  users?.map(user => (<div className='rounded bg-gray-300'>
                    <h4 className='text-red-800 font-bold'>ID:{user?._id}</h4>
                    <div className='flex'>
                      {/* <img src='https://i.pinimg.com/736x/e0/c1/62/e0c16260a50d8105f39fff05a36784ea.jpg' height={'100px'} width={'100px'} style={{borderRadius:'50%'}}alt=''/> */}
                      {/* <img src={user?.picture==""?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10":user?.picture?.startsWith('https://lh3.googleusercontent.com/')?user.picture:`${axiosInstance.defaults.baseURL}/uploads/${user?.picture}`} width={'100px'} style={{borderRadius: '50%'}} height={'100px'} alt="" /> */}
                      <img
                        src={
                          user?.picture == ""
                            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10'
                            : user?.picture?.startsWith('https://lh3.googleusercontent.com/')
                              ? user.picture
                              : `${axiosInstance.defaults.baseURL.replace(/\/$/, '')}/uploads/${user?.picture}`
                        }
                        width={'48px'}
                        height={'48px'}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                        alt=""
                      />
                      <div>
                        <h2 className='font-bold'>{user?.username}</h2>
                        <h3 className='font-bold'>{user?.email}</h3>
                      </div>
                    </div>
                  </div>
                  ))
                  :
                  <p className='text-red-700'>No User Found</p>

              }
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Resource