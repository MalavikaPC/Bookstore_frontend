// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//  <BrowserRouter>
//     <App />
//   </BrowserRouter>
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import SearchContext from './context/SearchContext.jsx'
import RouterGuardContext from './context/RouterGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <GoogleOAuthProvider clientId='777873591351-ls3eci0r9paeekq3i8kircbh9g0cpl1m.apps.googleusercontent.com'> 
  <SearchContext>
    <RouterGuardContext>
    <App/>
</RouterGuardContext>
   </SearchContext>
   </GoogleOAuthProvider>
   </BrowserRouter>
  </StrictMode>,
)