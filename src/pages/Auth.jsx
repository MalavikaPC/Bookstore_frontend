import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleloginAPI, loginAPI, registerAPI } from '../services/allApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { routerContext } from '../context/RouterGuardContext'



function Auth({ register }) {
  const {setRole, setAuthorizedUser} = useContext(routerContext)

  // const {setAuthorizedUser}=useContext(routerContext)
  const [togglePasswordtype, setTogglePasswordtype] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: 'demo',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must be at least 3 characters").required("Required"),
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: async (values, { resetForm }) => {
      if (register) {
        console.log("register api");
        handleRegister(values);
        resetForm();
      } else {
        console.log("login api");
        handleLogin(values)
      }
    }
  })

  const handleRegister = async (userData) => {
    const result = await registerAPI(userData)
    // console.log(result)
    if (result.status == 200) {
      toast.success("Registration successfull..Please Login")
    }
    else if (result.status == 409) {
      toast.error(result.response)
    }
    navigate('/login')


  }

  const handleLogin = async (userData) => {
    const result = await loginAPI(userData)
    console.log(result);
    if (result.status == 200) {
      toast.success("Login Successfull")
      sessionStorage.setItem("user", JSON.stringify(result.data.user))
      sessionStorage.setItem("token", result.data.token)
      setAuthorizedUser(true)
      setTimeout(()=>{
         if (result.data.user.role == 'admin') {
          setRole('admin')
        navigate('/admin-dashboard')
        
      }
      else {
        setRole('user')
        navigate('/')
      }
    },1000)
  }
    else {
      toast.error(result.response)
    }


  }
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Inside google login");

    console.log(credentialResponse);

    const { name, email, picture } = jwtDecode(credentialResponse.credential)
    console.log(name, email, picture);
    const res = await googleloginAPI({ username: name, email, password: "googlepassword", picture })
    console.log(res);
    if (res.status == 200) {
      toast.success("Login Successfull")
      sessionStorage.setItem("user", JSON.stringify(res.data.user))
      sessionStorage.setItem("token", res.data.token)
      setAuthorizedUser(true)
      setTimeout(() => {
        setRole('user')
        navigate('/')
      }, 2500)
    }




  }
  return (
    <div className='w-full min-h-screen flex items-center justify-cente flex-col bg-[url(logreg.jpg)] bg-cover bg-center '>
      <div className='w-full flex items-center justify-cente flex-col p-10'>
        <h1 className='text-4xl font-bold text-black'>BOOK STORE</h1>

        <div className='bg-black text-white p-5 flex flex-col w-2/4 items-center justify-center mt-5'>

          <div
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            className='border-2 mb-5 flex justify-center items-center'
          >
            <FontAwesomeIcon icon={faUser} className='text-5xl' />
          </div>

          {register ? <h3 className='text-xl font-bold'>Register</h3>
            :
            <h3 className='text-xl font-bold'>Login</h3>
          }

          <form className='w-full' onSubmit={formik.handleSubmit}>
            {
              register &&
              <div className='mt-5 w-full'>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  name='username'
                  type="text"
                  className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full'
                  placeholder='User Name'
                />
                <div className='text-yellow-400 mt-3'>{formik.errors.username}</div>
              </div>
            }

            <div className='mt-5 w-full'>
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                name='email'
                type="text"
                className='bg-white text-black placeholder-gray-700 px-2 py-2 rounded-xl w-full'
                placeholder='Email Id'
              />
              <div className='text-yellow-400 mt-3'>{formik.errors.email}</div>

            </div>

            <div className='mt-5 w-full relative'>
              <input
                onChange={formik.handleChange}
                value={formik.values.password}
                name='password'
                type={togglePasswordtype ? 'text' : 'password'}
                className='bg-white text-black absolute placeholder-gray-700 px-2 py-2 rounded-xl w-full'
                placeholder='Password' />
              {
                togglePasswordtype ?
                  <FontAwesomeIcon onClick={() => setTogglePasswordtype(false)} icon={faEyeSlash} className='text-gray-700 absolute' style={{ right: '30px', marginTop: '10px' }} />
                  :
                  <FontAwesomeIcon onClick={() => setTogglePasswordtype(true)} icon={faEye} className='text-gray-700 absolute' style={{ right: '30px', marginTop: '10px' }} />
              }
              <div className='text-yellow-400 mt-3'>{formik.errors.password}</div>

            </div>
            <p className='text-yellow-500 mt-2'>*Never share password with others</p>
            {
              register ?
                <button type="submit" className='bg-green-900 text-white p-2 w-full mt-10 rounded'>SIGNUP</button>
                :
                <button type="submit" className='bg-green-900 text-white p-2 w-full mt-10 rounded'>LOGIN</button>
            }
          </form>
          {
            !register &&
            <div className='my-5 text-center w-full'>
              <p>-----------------------------------------or----------------------------------------</p>
              {/* {sign in with google} */}
              <div className='d-flex justify-center items-center w-full'>
                <GoogleLogin className='w-full text-center'
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />;
              </div>
            </div>}
          {
            register ?
              <p className='text-center mt-3'>Already have an account?<Link className='text-blue-700 underline' to={'/login'}>Login</Link></p>
              :
              <p className='text-center mt-3'>Don't have an account yet?<Link className='text-blue-700 underline ' to={'/signup'}>Register</Link></p>}


        </div>
      </div>
      {/* toast */}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>
  )
}

export default Auth
// import React, { useState } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser, faEye } from '@fortawesome/free-solid-svg-icons'
// import { faGoogle } from '@fortawesome/free-brands-svg-icons'

// function Auth() {
//   const [loginStatus, setLoginStatus] = useState(true)

//   return (
//     <>
//       <div className="min-h-screen bg-[url(logreg.jpg)] bg-cover bg-center flex flex-col items-center">
//         <h1 className='text-white md:text-black text-3xl font-bold mt-10'>BOOK STORE</h1>

//         <div className='bg-gray-800 text-white w-10/12 md:w-1/3 p-5 md:p-7 mt-20 md:mt-7'>
//           {
//             loginStatus ?
//             <>
//               <div className='flex flex-col items-center'>
//                 <div className='border rounded-full p-3'>
//                   <FontAwesomeIcon icon={faUser} className='text-xl' />
//                 </div>
//                 <h3 className='font-semibold mt-3'>Login</h3>
//               </div>

//               <div className='mt-5'>
//                 <input type="text" placeholder='Email Id' className='w-full p-2 text-sm text-black outline-none bg-white' />

//                 <div className='relative mt-3'>
//                   <input type="password" placeholder='Password' className='w-full p-2 text-sm text-black outline-none bg-white' />
//                   <FontAwesomeIcon icon={faEye} className='absolute right-2 top-3 text-gray-400 text-xs' />
//                 </div>

//                 <div className='flex justify-between mt-2'>
//                   <p className='text-[8px] text-yellow-400'>*Never share the password with others</p>
//                   <p className='text-[8px]'>Forgot Password</p>
//                 </div>

//                 <button className='w-full bg-green-700 text-white p-2 mt-3 text-sm'>
//                   Login
//                 </button>

//                 <div className='flex items-center justify-center my-3'>
//                   <hr className='w-20' />
//                   <span className='mx-2 text-xs'>or</span>
//                   <hr className='w-20' />
//                 </div>

//                 <button className='w-full bg-white text-black p-2 text-xs flex items-center'>
//                   <img src="https://1000logos.net/wp-content/uploads/2016/11/New-Google-Logo.jpg" alt="Google" className='w-4 h-4 ms-2' />
//                   <span className='flex-grow text-center'>Sign In With Google</span>
//                 </button>

//                 <p className='text-xs text-center mt-4'>
//                   Are you a New User?
//                   <button onClick={() => setLoginStatus(false)} className='text-blue-400 underline ms-1'>
//                     Register
//                   </button>
//                 </p>
//               </div>
//             </>
//             :
//             <>
//               <div className='flex flex-col items-center'>
//                 <div className='border rounded-full p-3'>
//                   <FontAwesomeIcon icon={faUser} className='text-xl' />
//                 </div>
//                 <h3 className='font-semibold mt-3'>Register</h3>
//               </div>

//               <div className='mt-5'>
//                 <input type="text" placeholder='Username' className='w-full p-2 text-sm text-black outline-none bg-white' />

//                 <input type="text" placeholder='Email Id' className='w-full p-2 text-sm text-black outline-none mt-3 bg-white' />

//                 <div className='relative mt-3'>
//                   <input type="password" placeholder='Password' className='w-full p-2 text-sm text-black outline-none bg-white' />
//                   <FontAwesomeIcon icon={faEye} className='absolute right-2 top-3 text-gray-400 text-xs' />
//                 </div>

//                 <p className='text-[8px] text-yellow-400 mt-2'>*Never share the password with others</p>

//                 <button className='w-full bg-green-700 text-white p-2 mt-3 text-sm'>
//                   Register
//                 </button>

//                 <p className='text-xs text-center mt-6'>
//                   Are you a Already User?
//                   <button onClick={() => setLoginStatus(true)} className='text-blue-400 underline ms-1'>
//                     Login
//                   </button>
//                 </p>
//               </div>
//             </>
//           }
//         </div>
//       </div>
//     </>
//   )
// }

// export default Auth