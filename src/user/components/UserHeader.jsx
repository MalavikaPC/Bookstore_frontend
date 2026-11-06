import React, { useContext, useEffect, useState } from 'react'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'
import { routerContext } from '../../context/RouterGuardContext'


function UserHeader() {
  const [listStatus, setListStatus] = useState(false)
  const [token,setToken]=useState("")
  const [userDp,setUserDp]=useState("")
  const [dropDwn,setDrpDwn]=useState(false)
  const [userId,setUserID]=useState("")
  const {setAuthorizedUser}=useContext(routerContext)
const navigate=useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("user")&&sessionStorage.getItem("token")){
      const userToken=sessionStorage.getItem("token")
      const user=JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      // setUserDp(user.picture)
      if (user.picture && user.picture.startsWith('http')) {
  setUserDp(user.picture)
} else if (user.picture) {
  setUserDp(`${axiosInstance.defaults.baseURL}uploads/${user.picture}`)
} else {
  setUserDp('')
}
      setUserID(user._id)
    }
  },[token])
  const logout=()=>{
    sessionStorage.clear()
    setAuthorizedUser(false)
    setToken("")
    setUserDp("")
    setUserID("")
    navigate('/login')
  }


  return (
    <>
      <div className='grid grid-cols-3 p-3'>
        <div>
          <div className='flex items-center'>
            <img src="https://png.pngtree.com/png-clipart/20240619/original/pngtree-open-book-logo-png-image_15366757.png" alt="" width={'70px'} />
            <h1 className='text-2xl font-bold ms-3 md:hidden'>BOOKSTORE</h1>
          </div>

        </div>
        <div className='md:flex items-center justify-center hidden'>
          <h1 className='text-3xl font-bold'>BOOKSTORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='text-2xl' />
          <FontAwesomeIcon icon={faTwitter} className='text-2xl' />
          <FontAwesomeIcon icon={faFacebook} className='text-2xl' />
          {
            !token ? <Link to={'/login'} className='ms-5 border border-black rounded py-2 px-3'>
            <FontAwesomeIcon className='text-lg' icon={faUser} />LOGIN
          </Link>
          :<div>
            {/* {profile} */}
            <button onClick={()=>setDrpDwn(!dropDwn)} className='shadow-sm ms-4 rounded p-1'>
              <img width={'48px'} height={'40px'} style={{borderRadius:'50%'}} src={userDp==""?'https://static.vecteezy.com/system/resources/previews/033/541/875/original/user-thick-line-filled-dark-colors-free-vector.jpg':userDp} alt=''/>

            </button>
            {/* {dropdown} */}
            { dropDwn&&
             <div className='absolute right-0 top-20 ring-black/40 shadow w-40 rounded p-2 bg-white ring'>
            <Link to={`/profile/${userId}`} className='ms-1'>Profile</Link>
            <button className='p-2 block'>Logout</button>
            </div>}
            </div>

}

        </div>
      </div>
      <nav className=' bg-black text-white p-3'>
        {/* Menu icons */}
        <div className='flex items-center justify-between w-full md:hidden'>
          <button onClick={() => setListStatus(!listStatus)}>
            <FontAwesomeIcon className='text-2xl' icon={faBars} />
          </button>

          {/* <Link to={'/login'} className='ms-5 border border-white rounded py-2 px-3'>
            <FontAwesomeIcon className='text-lg' icon={faUser} />
            Login
          </Link> */}
                    {
            !token ? <Link to={'/login'} className='ms-5 border border-black rounded py-2 px-3'>
            <FontAwesomeIcon className='text-lg' icon={faUser} />LOGIN
          </Link>
          :<div>
            {/* {profile} */}
            <button onClick={()=>setDrpDwn(!dropDwn)} className='shadow-sm ms-4 rounded p-1'>
              {/* <img width={'48px'} height={'40px'} style={{borderRadius:'50%'}} src={userDp==""?'https://static.vecteezy.com/system/resources/previews/033/541/875/original/user-thick-line-filled-dark-colors-free-vector.jpg':userDp?.startsWith('https://lh3.googleusercontent.com/')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt=''/> */}
              <img
  width={'48px'}
  height={'40px'}
  style={{ borderRadius: '50%', objectFit: 'cover' }}
  src={userDp || 'https://static.vecteezy.com/system/resources/previews/033/541/875/original/user-thick-line-filled-dark-colors-free-vector.jpg'}
  alt="Profile"
/>

            </button>
            {/* {dropdown} */}
            { dropDwn&&
             <div className='absolute right-0 top-20 ring-black/40 shadow w-40 rounded p-2 bg-white ring'>
            <Link to={`/profile/${userId}`} className='ms-1 text-black'>Profile</Link>
            <button onClick={logout} className='p-2 block text-black'>Logout</button>
            </div>}
            </div>

}
        </div>

        <div className={listStatus ? 'flex flex-col items-center' : 'md:flex justify-center items-center w-full hidden'}>
          <Link to={'/'} className='md:mx-4 mt-3 md:mt-0 font-bold'>Home</Link>
          <Link to={'/all-books'} className='md:mx-4 mt-3 md:mt-0 font-bold'>Books</Link>
          <Link to={'/contact'} className='md:mx-4 mt-3 md:mt-0  font-bold'>Contact</Link>
        </div>
      </nav >
    </>
  )
}

export default UserHeader