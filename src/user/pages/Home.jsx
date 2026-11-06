import React, { useEffect, useState } from 'react'
import Header from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { getHomeBookAPI } from '../../services/allApi'
import { useContext } from 'react'
import { searchContext } from '../../context/SearchContext'
import { ToastContainer, toast } from 'react-toastify';

function Home() {
const [homeBooks,setHomeBooks]=useState([])
// console.log(homeBooks);
const {searchKey,setSearchKey}=useContext(searchContext)
const navigate=useNavigate()

useEffect(()=>{
  getBooks()
},[])

const getBooks=async()=>{
  const res=await getHomeBookAPI()
  if(res.status==200){
    setHomeBooks(res.data)
  }
}
const handleSearch=()=>{
  if(!searchKey){
toast.warning("Please input a book title here!")
  }
  else if(!sessionStorage.getItem("token")){
    toast.warning("Please Login!!")
    setTimeout(()=>{
navigate('/login')
    },2000)
  }
  else if(searchKey && sessionStorage.getItem("token")){
    navigate('/all-books')
  }
  else{
    toast.error("Something went wrong")
  }
}
  return (
    <>
      <Header />
     <div
  style={{ height: '500px' }}
  className=" bg-[url(bg.jpg)] bg-cover bg-center flex items-center justify-center"
>
  <div
    className="text-white w-full flex items-center justify-center flex-col"
    style={{
      height: '500px'
    }}
  >
    <h1
      className="text-6xl font-bold"
      style={{ fontFamily: 'Dancing Script' }}
    >
      Wonderful Gifts
    </h1>

    <p className="text-xl">
      Give your family and friends a book
    </p>

    <div className="mt-9 text-black">
      <input 
        type="text"
        placeholder="Search Book"
        className="bg-white p-2 rounded-3xl placeholder-gray-600 w-100"
        onChange={(e)=>setSearchKey(e.target.value)}
      />

      <FontAwesomeIcon
      onClick={handleSearch}
        icon={faMagnifyingGlass}
        className="text-gray-600"
        style={{ marginLeft: '-40px' }}
      />
    </div>
  </div>
</div>
<section className='flex items-center justify-center flex-col my-10'>
    <h1 className='text-3xl font-bold'>NEW ARRIVALS</h1>
    <h1 className='text-xl mt-4'>Explore Our Latest Collections</h1>

    <div className='md:grid grid-cols-5 mt-5'>
        {/* col */}

       { 
        homeBooks?.length>0?
        homeBooks?.map(book=>(<div className='p-3'>
            {/* card */}

            <div className='shadow p-3 rounded text-center'>
                <img style={{height:'300px',width:'100%'}}
                    src={book?.imageUrl} className='w-full h-70'
                    alt=""
                />

                <h4 className='text-blue-800 mt-3'>{book?.author}</h4>
                <h3 className='font-bold'>{book?.title}</h3>
                <h4>{book?.price}</h4>
            </div>
        </div>))
        :
        <p className='font-bold text-center my-3'>Loading....</p>}
    </div>
    <div className='text-center my-10'>
      <Link to={'/all-Books'} className='bg-blue-900 p-3 text-white'>Explore More</Link>
    </div>
</section>
<section className='md:px-30 flex items-center justify-center flex-col my-10'>
    <h1 className='text-3xl font-bold'>TESTIMONIALS</h1>
    <h1 className='text-xl mt-4'>See What Others Are Saying</h1>

    <div className='flex items-center justify-center flex-col mt-5'>
        <img
            src="https://www.shutterstock.com/image-photo/happy-confident-20s-indian-girl-260nw-2449701257.jpg"
            style={{height:'100px', width:'100px', borderRadius:'50%'}}
            alt=""
        />

        <h3 className='font-bold text-xl mt-3'>Anna Steef</h3>

        <p className='text-justify mt-5 text-lg font-bold'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde fugiat illum, delectus quod iste laboriosam earum iure nobis, molestias eos, dolorem assumenda aliquam? Cum id eligendi maxime, vel repudiandae velit? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, vitae! Blanditiis, ullam magni! Vero veniam quae, quod ratione commodi consectetur quam possimus? Odio nihil amet maiores recusandae iste omnis earum?
        </p>
    </div>
    <ToastContainer position='top-center' theme='colored' autoClose={3000} />
</section>
    </>
  )
}

export default Home

// import React from 'react'
// import Header from '../components/UserHeader'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// function Home() {
//   const books = [
//     { id: 1, image: '/book1.jpg', title: 'The Da Vinci Code', author: 'Dan Brown', price: '$18' },
//     { id: 2, image: '/book1.jpg', title: 'The Da Vinci Code', author: 'Dan Brown', price: '$18' },
//     { id: 3, image: '/book1.jpg', title: 'The Da Vinci Code', author: 'Dan Brown', price: '$18' },
//     { id: 4, image: '/book1.jpg', title: 'The Da Vinci Code', author: 'Dan Brown', price: '$18' }
//   ]

//   return (
//     <>
//       <Header />

//       {/* Hero Section */}
//       <section className="h-[350px] sm:h-[400px] md:h-[450px] bg-[url(bg.jpg)] bg-cover bg-center flex items-center justify-center relative">
//         <div className="absolute inset-0 bg-black/35"></div>
//         <div className="relative z-10 w-full px-5 text-center">
//           <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">Wonderful Gifts</h1>
//           <p className="text-white mt-2 text-sm sm:text-base">Find the perfect book for yourself or someone special</p>
//           <div className="bg-white rounded-full flex items-center mx-auto mt-7 w-full max-w-[500px] px-5 py-2 shadow-lg">
//             <input type="text" placeholder="Search Books" className="outline-none border-none flex-1 text-sm sm:text-base bg-transparent" />
//             <button className="text-gray-600 hover:text-blue-600">
//               <FontAwesomeIcon icon={faSearch} />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* New Arrivals */}
//       <section className="py-12 sm:py-16 px-5">
//         <div className="text-center">
//           <h2 className="text-xl sm:text-2xl font-bold uppercase">New Arrivals</h2>
//           <p className="text-gray-500 text-sm mt-1">Explore Our Latest Collection</p>
//         </div>
//         <div className="max-w-6xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
//           {books.map((book) => (
//             <div key={book.id} className="flex flex-col items-center text-center group">
//               <div className="w-[130px] h-[190px] sm:w-[150px] sm:h-[220px] overflow-hidden shadow-md group-hover:shadow-xl transition">
//                 <img src="https://m.media-amazon.com/images/I/31ALGsUpfPL._AC_UF1000,1000_QL80_.jpg" alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
//               </div>
//               <h3 className="text-sm sm:text-base font-semibold text-blue-600 mt-3">{book.author}</h3>
//               <p className="text-xs sm:text-sm text-gray-600">{book.title}</p>
//               <p className="font-semibold text-sm mt-1">{book.price}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-center mt-10">
//           <button className="bg-[#164a7c] hover:bg-[#103b64] text-white px-7 py-2 text-sm transition">Explore More</button>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="max-w-6xl mx-auto px-5 py-12 sm:py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
//           <div>
//             <h3 className="text-xl sm:text-2xl font-bold uppercase text-center md:text-left">FEATURED AUTHORS</h3>
//             <h4 className="text-black-600 text-sm sm:text-base leading-7 mt-5 text-justify">Capitatives with every word</h4>
//             <p className="text-gray-600 text-sm sm:text-base leading-7 mt-4 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ullam doloribus corporis aliquam, animi quos consectetur impedit facilis nesciunt voluptatum quis! Blanditiis esse deserunt iure quod, deleniti distinctio ullam harum?
//             Unde fuga explicabo ipsam consequuntur sit ut tempore ipsum alias omnis, dolorem error recusandae aut illo excepturi sint placeat maxime eius architecto sunt quasi suscipit. Laborum animi aliquid possimus maiores.</p>
//           </div>
//           <div className="flex justify-center md:justify-end">
//             <img src="https://www.headshotphoto.io/_vercel/image?url=%2Fimages%2Fblogs%2Fclassic-suit.png&w=1024&q=82" alt="About bookstore" className="w-full max-w-[450px] h-[280px] sm:h-[350px] object-cover" />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="px-5 py-12 sm:py-16 text-center">
//         <h2 className="text-xl sm:text-2xl font-bold uppercase">Testimonials</h2>
//         <p className="text-gray-500 text-sm mt-1">See What Others Are Saying</p>
//         <div className="max-w-4xl mx-auto mt-7">
//           <img src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LWtsaGN3ZWNtLmpwZw.jpg" className="w-20 h-20 rounded-full object-cover mx-auto" />
//           <h3 className="font-semibold text-lg mt-3">Anna Steef</h3>
//           <p className="text-gray-600 text-sm sm:text-base leading-7 mt-5 text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium, officiis asperiores ipsa placeat ipsum labore deleniti nemo temporibus magni itaque consequuntur quaerat non architecto blanditiis distinctio cumque libero nesciunt maxime. Eum, recusandae ullam totam consectetur autem aut non praesentium molestias ipsam distinctio consequuntur debitis magni.</p>
//         </div>
//       </section>
//     </>
//   )
// }

// export default Home