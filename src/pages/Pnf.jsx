import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../context/RouterGuardContext'

function Pnf() {
  const {role, authorizedUser} = useContext(routerContext)
const navigate=useNavigate()
  const backtoHome=()=>{
  if(role=='user'){
navigate('/')
  }
  else{
navigate('/admin-dashboard')
  }
}
  return (
    <div style={{ height: '60vh', marginTop: '50px' }} className='flex items-center justify-center flex-col'>
      <img src="https://cdn.dribbble.com/userupload/24450589/file/original-7a69eb5b87401ce59325c3291535aebc.gif" alt="" width={300} />

      <h5>Sorry, we couldn't find the page</h5>
      {
        authorizedUser?
        <button onClick={backtoHome} className='bg-black p-2 rounded text-white mt-4'>Back to Home</button>
        :
        <Link to={'/'} className='bg-black p-2 rounded text-white mt-4'>Back to Home</Link>
      }
    </div>
  )
}

export default Pnf