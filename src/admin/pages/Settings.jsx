import React from 'react'
import Sidebar from '../components/Sidebar'
import AdminHeader from '../components/AdminHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

function Settings() {
  return (
    <>
      <AdminHeader />

      <div className='md:grid grid-cols-5'>

        {/* Sidebar */}
        <div className='col-span-1'>
          <Sidebar />
        </div>


        {/* Settings Content */}
        <div className='col-span-4 p-8'>

          {/* Heading */}
          <h2 className='text-center font-bold text-xl mb-6'>
            Settings
          </h2>


          {/* Left Content + Right Profile */}
          <div className='grid grid-cols-2 gap-10 items-center'>


            {/* LEFT SIDE */}
            <div className='text-xs'>

              <p className='mb-10'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis id maxime quia asperiores in cupiditate
                voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum
                incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Sed neque,
                facilis?
              </p>


              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis id maxime quia asperiores in cupiditate
                voluptatum quisquam nemo vitae odio, facilis aperiam. Ipsum
                incidunt labore asperiores! Blanditiis soluta fuga aut? Lorem
                ipsum, facilis, consequatur eveniet inventore ipsam beatae iure
                fugiat eligendi quae laborum incidunt eum quis, est blanditiis
                exercitationem velit excepturi?
              </p>

            </div>


            {/* RIGHT SIDE - PROFILE */}
            <div className='bg-blue-100 rounded p-5'>


              {/* Profile Image */}
              <div className='flex justify-center mb-5 relative'>

                <img
                  src='https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
                  alt=''
                  className='w-20 h-20 rounded-full'
                />

                {/* Pen Icon */}
                <span className='absolute bottom-0 bg-yellow-400 w-5 h-5 flex items-center justify-center'>
                  <FontAwesomeIcon
                    icon={faPen}
                    className='text-black text-[10px]'
                  />
                </span>

              </div>


              {/* Username */}
              <input
                type='text'
                placeholder='Username'
                className='w-full bg-white p-2 mb-2 rounded text-xs'
              />


              {/* Password */}
              <input
                type='password'
                placeholder='Password'
                className='w-full bg-white p-2 mb-2 rounded text-xs'
              />


              {/* Confirm Password */}
              <input
                type='password'
                placeholder='Confirm password'
                className='w-full bg-white p-2 mb-4 rounded text-xs'
              />


              {/* Buttons */}
              <div className='flex gap-2'>

                <button
                  className='bg-yellow-400 text-white w-1/2 py-2 rounded text-xs'
                >
                  Reset
                </button>

                <button
                  className='bg-green-700 text-white w-1/2 py-2 rounded text-xs'
                >
                  Update
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      
    </>
  )
}

export default Settings