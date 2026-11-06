// import './App.css'
// import Footer from './components/Footer'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {Route,Routes} from 'react-router-dom'
// import Home from './user/pages/Home'
// import { useEffect, useState } from 'react'
// import Preloader from './components/Preloader'
// import Auth from './pages/Auth'
// import AllBooks from './user/pages/AllBooks'
// import Contact from './user/pages/Contact'
// import Settings from './admin/pages/Settings'
// import Dashboard from './admin/pages/Dashboard'
// import Pnf from './pages/Pnf'
// import Profile from './user/pages/Profile'
// import ViewBook from './user/pages/ViewBook'
// import Resource from './admin/pages/Resource'
// function App() {
//   const [loading,setLoading]=useState(true)
//   useEffect(()=>{
//     setTimeout(()=>{
//       setLoading(false)
//     },5000)

//   },[])


//   return (
//     <>

//     <Routes>
//       <Route path='/' element={loading?<Preloader/>:<Home/>}/>
//       <Route path='/login' element={<Auth/>}/>
//       <Route path='/signup' element={<Auth/>}/>
//       <Route path='/all-books' element={<AllBooks/>}/>
//       <Route path='/contact' element={<Contact/>}/>
//       <Route path='/profile' element={<Profile/>}/>
//       <Route path='/view/:id/book' element={<ViewBook/>}/>
//       <Route path='/admin-dashboard' element={<Dashboard/>}/>
//       <Route path='/admin-resources' element={<Resource/>}/>
//       <Route path='/admin-settings' element={<Settings/>}/>
//       <Route path='/*' element={<Pnf/>}/>
//     </Routes>
//     <Footer/>
//     </>
//   )
// }

// export default App

import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './user/pages/Home'
import { useContext, useEffect, useState } from 'react'
import Preloader from './components/Preloader'
import AllBooks from './user/pages/AllBooks'
import Contact from './user/pages/Contact'
import ViewBook from './user/pages/ViewBook'
import Dashboard from './admin/pages/Dashboard'
import Resource from './admin/pages/Resource'
import Settings from './admin/pages/Settings'
import Pnf from './pages/Pnf'
import Auth from './pages/Auth'
import Profile from './user/pages/Profile'
import PaymentSuccess from './user/pages/PaymentSuccess'
import PaymentFail from './user/pages/PaymentFail'
import { routerContext } from './context/RouterGuardContext'

function App() {
  const { role } = useContext(routerContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])// loading value will be true for 5 sec then home view
  return (
    <>

      <Routes>
        <Route path='/' element={loading ? <Preloader /> : <Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/signup' element={<Auth register />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/contact' element={<Contact />} />

        {
          role == 'user' &&
          <>
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/view/:id/book' element={<ViewBook />} />
            <Route path='/success' element={<PaymentSuccess />} />
            <Route path='/cancel' element={<PaymentFail />} />
          </>
        }


        {
          role == 'admin' &&
          <>
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/admin-resources' element={<Resource />} />
            <Route path='/admin-settings' element={<Settings />} />
          </>
        }
        <Route path='/*' element={<Pnf />} />


      </Routes>
      <Footer />
    </>
  )
}

export default App