import React, { useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../api/axiosinstance'
import Edit from '../components/Edit'
import { ToastContainer, toast } from 'react-toastify';
import { addBookAPI, getAbstractAPI, getBoughtBooksAPI, getUserBooksAPI, removeBookAPI } from '../../services/allApi'
import useDebounce from '../../hooks/useDebounce'

function Profile() {

  const [sellBookstatus, setsellBookstatus] = useState(true)
  const [bookstatus, setBookstatus] = useState(false)
  const [purchasestatus, setPurchasestatus] = useState(false)
  const [userName, setUserName] = useState("")
  const [dp, setDp] = useState("")
  const [bio, setBio] = useState("")
  const [bookDetails, setBookDetails] = useState({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", catagory: "", uploadImages: [] })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])
  const [uploadedBooks, setUploadedBooks] = useState([])
  const [purchasedBooks, setpurchasedBooks] = useState([])
  const debouncedTitleSearch = useDebounce(bookDetails.title, 500)

  // console.log(userName, dp, bio)
  // console.log(bookDetails);
  // console.log(preview);
  // console.log(previewList);



  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      let user = JSON.parse(sessionStorage.getItem("user"))
      console.log("User data:", user)
      console.log("Picture URL:", user.picture)
      setUserName(user.username)
      if (user.picture && user.picture.startsWith('http')) {
        setDp(user.picture)
      }
      else if (user.picture) {
        setDp(`${axiosInstance.defaults.baseURL}uploads/${user.picture}`)
      }
      else {
        setDp('')
      }
      //       console.log(
      //     "Full image URL:",
      //     `${axiosInstance.defaults.baseURL}/uploads/${user.picture}`
      // )



      setBio(user.bio)
    }
    getUserBooks()
  }, [])
  useEffect(() => {
    if (bookstatus) {
      getUserBooks()
    }
    else if (purchasestatus) {
      userBoughtBook()
    }
  }, [bookstatus, purchasestatus])
  useEffect(() => {
    if (debouncedTitleSearch) {

      console.log("gemini api call");
      generateBookAbstract()

    }
  }, [debouncedTitleSearch])

  const generateBookAbstract = async () => {
    const res = await getAbstractAPI(debouncedTitleSearch)
    console.log(res);
    if (res.status == 200) {
      setBookDetails({ ...bookDetails, abstract: res.data.content })
    }

  }
  const handleFileUpload = (e) => {
    const imgFile = e.target.files[0]
    setBookDetails({ ...bookDetails, uploadImages: [...bookDetails?.uploadImages, imgFile] })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList, url])
  }
  const getUserBooks = async () => {
    const res = await getUserBooksAPI()
    console.log(res);
    if (res.status == 200) {
      setUploadedBooks(res.data)
    }
  }

  const resetForm = () => {
    setBookDetails({ title: "", author: "", pages: "", imageUrl: "", price: "", discountPrice: "", abstract: "", publisher: "", isbn: "", language: "", catagory: "", uploadImages: [] })
    setPreview("")
    setPreviewList([])
  }
  const handleAddBook = async () => {
    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, catagory, uploadImages } = bookDetails
    if (!title && !author && !pages && !imageUrl && !price && !discountPrice && !abstract && !publisher && !isbn && !language && !catagory && uploadImages.length == 0) {
      toast.warning("fill the form completely")
    }
    else {
      const reqBody = new FormData
      for (let key in bookDetails) {
        if (key !== "uploadImages") {
          reqBody.append(key, bookDetails[key])
        }
        else {
          bookDetails.uploadImages.forEach(file => {
            reqBody.append("uploadImages", file)
          })
        }
      }
      const result = await addBookAPI(reqBody)
      console.log(result);
      if (result.status == 200) {
        toast.success("Book added successfully")
      }
      else {
        toast.error(result.response)
      }
      resetForm()

    }
  }
  const removeBook = async (id) => {
    const res = await removeBookAPI(id)

    if (res.status == 200) {
      getUserBooks()
    }

  }
  const userBoughtBook = async () => {
    const res = await getBoughtBooksAPI()
    console.log(res);
    if (res.status == 200) {
      setpurchasedBooks(res.data)
    }

  }
  return (
    <>
      <Header />
      <div className='bg-blue-950 ' style={{ height: '200px' }}>
      </div>

      <div style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }}>
        {/* <img style={{ height: '200px', width: '200px', borderRadius: '50%' }} src={dp==""?'https://static.vecteezy.com/system/resources/previews/033/541/875/original/user-thick-line-filled-dark-colors-free-vector.jpg':dp?.startsWith('https://lh3.googleusercontent.com/')?dp:`${axiosInstance.defaults.baseURL}uploads/${dp}`} alt=''/> */}
        <img
          style={{ height: '200px', width: '200px', borderRadius: '50%' }}
          src={dp || 'https://static.vecteezy.com/system/resources/previews/033/541/875/original/user-thick-line-filled-dark-colors-free-vector.jpg'}
          alt="Profile"
        />
      </div>
      <div className='mx-10 my-5'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-2xl'>{userName}</h1>
          <div>
            <Edit />
          </div>
        </div>
        <p className='my-3 md:px-20 px-5 text-justify'>{bio}</p>

      </div>
      {/* Tabs */}
      <div className='flex items-center justify-center my-10'>
        <p onClick={() => { setsellBookstatus(true); setBookstatus(false); setPurchasestatus(false) }} className={sellBookstatus ? 'text-blue-800 p-3 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'mx-2'}>Sell Book</p>
        <p onClick={() => { setsellBookstatus(false); setBookstatus(true); setPurchasestatus(false) }} className={bookstatus ? 'text-blue-800 p-3 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'mx-2'}>Book Status</p>
        <p onClick={() => { setsellBookstatus(false); setBookstatus(false); setPurchasestatus(true) }} className={purchasestatus ? 'text-blue-800 p-3 border-gray-200 border-t border-l border-r rounded cursor-pointer' : 'mx-2'}>Purchase History</p>

      </div>

      {/* content */}
      {sellBookstatus &&
        <div className='flex justify-center mt-5 my-5'>
          <div className='bg-gray-300 w-[700px] rounded-lg p-8'>
            <h2 className='text-center mb-8 font-bold'>Book Details</h2>

            <form>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type='text' placeholder='Title' className='w-full p-2 mb-2 rounded bg-white ' />
                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type='text' placeholder='Author' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.pages} onChange={(e) => setBookDetails({ ...bookDetails, pages: e.target.value })} type='text' placeholder='No Of Pages' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type='text' placeholder='Image URL' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type='text' placeholder='Price' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.discountPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} type='text' placeholder='Discount Price' className='w-full p-2 mb-2 rounded bg-white' />
                </div>

                <div>
                  <input value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} type='text' placeholder='abstract' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type='text' placeholder='Publisher' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type='text' placeholder='Language' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type='text' placeholder='ISBN' className='w-full p-2 mb-2 rounded bg-white' />
                  <input value={bookDetails.catagory} onChange={(e) => setBookDetails({ ...bookDetails, catagory: e.target.value })} type='text' placeholder='Category' className='w-full p-2 mb-2 rounded bg-white' />
                </div>
                {/* upload book image */}
                <div className="mb-3 flex items-center justify-center pt-5">
                  <label htmlFor="booking">
                    <input onChange={(e) => handleFileUpload(e)} type="file" id='booking' className='hidden' />

                    <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} width={'150px'} height={'150px'} alt="" />

                  </label>
                </div>

                {/* display uploaded images */}
                {preview &&
                  <div className="mb-3 flex items-center justify-center pt-5">
                    {
                      previewList?.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          className='mx-2'
                          width={'70px'}
                          height={'70px'}
                          alt="Uploaded book"
                        />
                      ))
                    }

                    {
                      previewList?.length < 3
                      &&
                      <label htmlFor="booking">
                        <input onChange={(e) => handleFileUpload(e)} type="file" id='booking' className='hidden' />
                        <FontAwesomeIcon icon={faPlus} className='ms-5 text-3xl' />
                      </label>}

                  </div>}


                {/* Buttons */}
                <div className='flex flex-col md:flex-row justify-center gap-5 mt-10'>
                  <button onClick={resetForm} type='reset' className='bg-gray-600 text-white py-3 px-10 rounded'>
                    RESET
                  </button>
                  <button onClick={handleAddBook} type='button' className='bg-blue-800 text-white py-3 px-10 rounded'>
                    ADD
                  </button>
                </div>





              </div>
            </form>
          </div >
        </div >
      }

      {
        bookstatus &&
        <div className='p-10 my-20 shadow rounded'>
          {
            uploadedBooks?.length > 0 ?
              uploadedBooks?.map(bk => (
                <div className='p-5 mt-4 bg-gray-200 rounded'>
                  <div className='md:grid grid-cols-[3fr_1fr] items-center'>
                    <div className='px-4'>
                      <h1 className='text-2xl'>{bk?.tiltle}</h1>
                      <h3 className='text-xl'>{bk.author}</h3>
                      <h3 className='text-lg text-blue-950 font-bold'>{bk?.price}</h3>
                      <p className='text-justify'>{bk?.abstract}</p>
                      <div className='flex mt-3'>
                        {
                          bk?.status == 'Pending' ?
                            <img src='https://tse2.mm.bing.net/th/id/OIP.vpkH2Sm-00_d-HfDONXY6wHaG0?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' alt='' className='w-25' />
                            :
                            bk?.status == 'Approved' ?
                              <img src='https://th.bing.com/th/id/OIP.WuS5KWAGCwQ3YftyK9lywQHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' alt='' className='w-25' />

                              :
                              <img src='https://tse4.mm.bing.net/th/id/OIP.e1DjBVictsyjcYv8LJrKngHaDt?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' alt='' className='w-25' />
                        }
                      </div>
                    </div>
                    <div>
                      <img src={bk?.imageUrl} alt="" className='w-50' />
                      <div className='mt-3 flex justify-end'>
                        <button onClick={() => removeBook(bk?._id)} className='bg-red-800 text-white p-2 rounded hover:bg-white hover:text-red-800 hover:border hover:border-red-800'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              :
              <p className='text-center my-5 text-red-600 font-bold'>No Books Uploaded Yet!</p>
          }
        </div>
      }

      {
        purchasestatus &&
        <div>
          {
            purchasedBooks?.length > 0 ?
              purchasedBooks?.map(bk => (
                <div className='p-10 my-20 shadow rounded'>
                  <div className='p-5 mt-4 bg-gray-200 rounded'>
                    <div className='md:grid grid-cols-[3fr_1fr] items-center'>
                      <div className='px-4'>
                        <h1 className='text-2xl'>{bk?.title}</h1>
                        <h3 className='text-xl'>{bk?.author}</h3>
                        <h3 className='text-lg text-blue-950 font-bold'>{bk?.price}</h3>
                        <p className='text-justify'>{bk?.abstract}</p>

                        <div className='flex mt-3'>
                          <img width={'80px'} src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="pending Icon" />
                        </div>
                      </div>
                      <di className='px-4 mt-4 md:mt-0'>
                        <img src={bk?.imageUrl} alt="" className='w-full' />

                      </di>
                    </div>
                  </div>
                </div>
              ))
              :
              <p>No Books Purchased Yet!</p>
          }
        </div>
      }

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Profile


