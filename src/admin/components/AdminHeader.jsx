import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { routerContext } from '../../context/RouterGuardContext'


function AdminHeader() {
  const {setAuthorizedUser}=useContext(routerContext)
  const navigate=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    setAuthorizedUser(false)
    navigate('/login')
  }
  return (
    <>
<div className='grid grid-cols-2 p-3'>
        
          <div className='flex items-center'>
            <img src="https://png.pngtree.com/png-clipart/20240619/original/pngtree-open-book-logo-png-image_15366757.png" alt="" width={'70px'} />
            <h1 className='text-2xl font-bold ms-3 md:hidden'>BOOKSTORE</h1>
          </div>

       
        <div className='md:flex justify-end items-center hidden'>
          <button className='ms-5 border border-black rounded py-2 px-3' onClick={logout}>Logout</button>

        </div>
      </div>
      <nav className='flex w-full bg-black text-white p-3'>
        
        <div className='flex  w-full '>
         <marquee behaviour='' direction=''>Welcome ,Admin! you're all set to manage and monitor the system.Let's get to work</marquee>
        </div>
      </nav >
    </>
  )
}

export default AdminHeader