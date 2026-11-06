// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useEffect, useState } from 'react'

// function Edit() {
//     const [modalStatus, setModalStatus] = useState(false)
//  const [profileModalStatus, setProfileModalStatus] = useState(false)
//  const [userDetails,setUserDetails]=useState({username:"",password:"",cPassword:"",picture:"",bio:""})
//  const [existingPicture,setExistingPicture]=useState("")
//  useEffect(()=>{
//     if(sessionStorage.getItem("user")){
//         let user=JSON.parse(sessionStorage.getItem("user"))
//         setUserDetails({...userDetails,username:user.username,bio:user.bio})
//         setExistingPicture(user.picture)
//     }
//  },[])
//  console.log(userDetails);
//  console.log(existingPicture);
//  const handleFileUpload(e)=>{
//     console.log(e.target.files[0]);
//     setUserDetails({...userDetails,picture:e.target.files[0]})
//     setPreview(URL.createObjectURL(e.target.files[0]))

//  }


//   return (
//     <>
//     <button  onClick={() => setProfileModalStatus(true)} className='bg-blue-900 text-white p-2 rounded  w-20'>Edit</button>
//         {
//     profileModalStatus &&
//      <div className='relative z-10'>
//               <div className='bg-gray-500/75 inset-0 fixed '>
//                 <div className='flex items-center justify-center min-h-screen'>
//                   <div className='bg-white w-full md:m-25 m-5 ' style={{ height: '420px' }}>
//                     {/* Modal Header */}
//                     <div className='flex text-white bg-black items-center justify-between'>
//                       <h3>Update Profile</h3>
//                       <button onClick={() =>setProfileModalStatus(false)}><FontAwesomeIcon icon={faXmark} /></button>
//                     </div>
//                     {/* Modal Body */}
//                     <div className='bg-blue-100 p-6 '>
//                     <div className='flex justify-center mb-5 relative'>
//                 <img
//                     src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
//                     alt=''
//                     className='w-20 h-20 rounded-full' 
//                 />
//                <span className='absolute bottom-0 right-[calc(50%-40px)] bg-yellow-500 w-5 h-5 flex items-center justify-center'>
//         <FontAwesomeIcon
//             icon={faPen}
//             className='text-white text-[10px]'
//         />
//     </span>
//             </div>

//             <div className='grid gap-3'>
//                 <input
//                     type='text'
//                     placeholder='Name'
//                     className='bg-white p-2'
//                 />

//                 <input
//                     type='password'
//                     placeholder='Password'
//                     className='bg-white p-2'
//                 />

//                 <input
//                     type='password'
//                     placeholder='Confirm Password'
//                     className='bg-white p-2'
//                 />

//                 <textarea
//                     placeholder='Bio'
//                     className='bg-white p-2'
//                      style={{ height: '70px' }}
//                 ></textarea>
//             </div>

// </div>
//             <div className='bg-gray-100 px-6 py-3 flex justify-end gap-3 '>

//                 <button
//                     onClick={() => setProfileModalStatus(false)}
//                     className='bg-gray-600 text-white px-4 py-2 rounded'
//                 >
//                     Reset
//                 </button>

//                 <button
//                     className='bg-blue-500 text-white px-4 py-2 rounded'
//                 >
//                     Update
//                 </button>
// </div>


//         </div>

//                   </div>
//                 </div>

//               </div>

//             // </div>

// }
//     </>
//   )
// }

// export default Edit

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../api/axiosinstance'
import { ToastContainer, toast } from 'react-toastify';
import { userUpdateAPI } from '../../services/allApi';
import { useNavigate } from 'react-router-dom';

function Edit() {
    const [modalStatus, setModalStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({_id:"", username: "", password: "", cpassword: "", picture: "", bio: "" })
    const [existingPicture, setExistingPicture] = useState("")
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const navigate=useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            let user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({ ...userDetails,_id:user._id, username: user.username, bio: user.bio })
            setExistingPicture(user.picture)
        }
    }, [])



    const handleFileUpload = (e) => {
        const imageFile = e.target.files[0]
        if (imageFile.type.startsWith("image/")) {
            setUserDetails({ ...userDetails, picture: e.target.files[0] })
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageFile(true)
        } else {
            setImageFile(false)
        }
    }

    const checkPasswordMatch = (data) => {
        setUserDetails({ ...userDetails, cpassword: data })
        userDetails.password === data ? setPasswordMatch(true) : setPasswordMatch(false)
    }

    const resetProfileForm = () => {
        let user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({ ...userDetails,_id:user._id, username: user.username, password: "", cpassword: "", picture: "", bio: user.bio })
        setExistingPicture(user.picture)
        setPreview("")
        setImageFile(false)
        setPasswordMatch(true)
    }

    const updateProfile=async()=>{
        const {username,password,cPassword,bio}=userDetails
        if(!username,!bio){
            toast.warning("fill the fields completely")
        }
        else if(passwordMatch&&cPassword){
            if(passwordMatch){
                const reqbody=new FormData()
            for(let key in userDetails){
                if(key!="picture"){
                    reqbody.append(key,userDetails[key])
                }
                else{
preview?reqbody.append(key,userDetails[key]):reqbody.append(key,existingPicture)
                }
            }

            
            
            const result=await userUpdateAPI(userDetails._id,reqbody)
            console.log(result);
            if(result.status==200){
                toast.success("profile updated successfully")
                setModalStatus(false)
                navigate('/login')
                sessionStorage.clear()
            }
        }

        }
        else{
        const reqbody=new FormData()
            for(let key in userDetails){
                if(key!="picture"){
                    reqbody.append(key,userDetails[key])
                }
                else{
preview?reqbody.append(key,userDetails[key]):reqbody.append(key,existingPicture)
                }
            }

            
            
            const result=await userUpdateAPI(userDetails._id,reqbody)
            console.log(result);
            if(result.status==200){
                toast.success("profile updated successfully")
                setModalStatus(false)
                navigate('/login')
                sessionStorage.clear()
            }
    }
    }
    

    return (
        <>
            <button onClick={() => setModalStatus(true)} className='text-2xl text-blue-900'>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>

            {modalStatus && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
                    <div className='w-full max-w-lg overflow-hidden rounded-xl shadow-2xl bg-white'>

                        {/* Modal Header */}
                        <div className='flex items-center justify-between bg-black px-5 py-3 text-white'>
                            <h2 className='text-lg font-semibold'>User Details</h2>
                            <button onClick={() => setModalStatus(false)} className='text-white hover:text-red-400'>
                                <FontAwesomeIcon icon={faXmark} size='lg' />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className='max-h-[80vh] overflow-y-auto bg-blue-200 p-5 sm:p-7'>
                            <div className='relative flex flex-col items-center gap-4'>

                                <input onChange={(e) => handleFileUpload(e)} type='file' className='hidden' id='userPic' />

                                <div className='relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-100'>
                                    {
                                        existingPicture === "" ?
                                            <img src={preview ? preview : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} alt='Profile' className='h-full w-full rounded-full object-cover' />
                                            :
                                            existingPicture.startsWith('https://lh3.googleusercontent.com/') ?
                                                <img src={preview?preview : existingPicture} alt='' className='h-full w-full rounded-full object-cover' />
                                                :
                                                <img src={preview ? preview :`${axiosInstance.defaults.baseURL}uploads/${existingPicture}`} alt='' className='h-full w-full rounded-full object-cover' />
                                    }

                                    <label htmlFor='userPic' className='absolute -bottom-1 -right-1 cursor-pointer rounded bg-yellow-500 px-2.5 py-1 text-sm text-white shadow hover:bg-yellow-600' title='Edit picture'>
                                        <FontAwesomeIcon icon={faPen} />
                                    </label>
                                </div>



                                {
                                    !imageFile &&
                                    <div className='mt-5 text-red-400 text-sm'>
                                        *Only uploads image file
                                    </div>
                                }
                                <input
                                    type='text'
                                    placeholder='User Name'
                                    value={userDetails.username}
                                    onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                                    className='w-full rounded bg-white px-3 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500'
                                />

                                <input
                                    value={userDetails.password}
                                    type='password'
                                    placeholder='New Password'
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                    className='w-full rounded bg-white px-3 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500'
                                />

                                <input
                                    value={userDetails.cpassword}
                                    type='password'
                                    placeholder='Confirm Password'
                                    onChange={(e) => checkPasswordMatch(e.target.value)}
                                    className='w-full rounded bg-white px-3 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500'
                                />

                                {
                                    !passwordMatch &&
                                    <div className='text-sm text-red-400 w-full'>
                                        *Password and confirm password must be same
                                    </div>
                                }

                                <textarea
                                    placeholder='Bio'
                                    value={userDetails.bio}
                                    onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })}
                                    rows={3}
                                    className='w-full resize-y rounded bg-white px-3 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500'
                                />

                                <div className='flex w-full justify-end gap-3'>
                                    <button type='button' onClick={resetProfileForm} className='rounded border border-gray-500 px-4 py-2 text-gray-800 hover:bg-white'>Reset</button>
                                    <button type='button' onClick={updateProfile}  className='rounded bg-blue-950 px-5 py-2 text-white hover:bg-blue-800'>Update</button>
                                </div>

                            </div>
                        </div>

                    </div>
                    <ToastContainer position='top-center' theme='colored' autoClose={3000} />
                </div>
            )}
        </>
    )
}

export default Edit