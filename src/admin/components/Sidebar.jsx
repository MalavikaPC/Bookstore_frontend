import { faBook, faGear, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
FontAwesomeIcon

function Sidebar() {
  const [userName,setUserName]=useState("")
  const [dp,setDp]=useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      let user=JSON.parse(sessionStorage.getItem("user"))
      setUserName(user.username)
      setDp(user.picture)
    }
  },[])
  return (
    <div className='flex items-center justify-center p-5 flex-col bg-blue-300'>
      {/* <img src='https://i.pinimg.com/736x/e0/c1/62/e0c16260a50d8105f39fff05a36784ea.jpg' height={'100px'} width={'100px'} style={{borderRadius:'50%'}}alt=''/> */}
      <img src={dp == "" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8yCap-OFEzeJLnZAtzinq6qTDowXUNgKJpzN66oAneVnkpNz8hOoJcQ&s=10' : dp?.startsWith('https://lh3.googleusercontent.com/') ? dp : `${axiosInstance.defaults.baseURL}/uploads/${dp}`} alt="" className='ms-10' style={{ height: '100px', width: '100px', borderRadius: '50%' }} />
      <h1 className='text-xl mt-4 font-bold'>{userName}</h1>
      <div className='mt-7 flex items-center justify-center p-5 flex-col'>
        <Link to={'/admin-dashboard'} className='font bold text-xl my-2'><FontAwesomeIcon icon={faHome}/> Home</Link>
        <Link to={'/admin-resources'} className='font bold text-xl my-2'><FontAwesomeIcon icon={faBook}/>All Books</Link>
        <Link to={'/admin-settings'} className='font bold text-xl my-2'><FontAwesomeIcon icon={faGear}/>Settings</Link>

      </div>


    </div>
  )
}

export default Sidebar