/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import Details from './Pages/Details.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SignUp",
    element: <Signup/>,
  },
  {
    path: "/Signin",
    element: <Signin/>,
  },
  {
    path:'/Details',
    element:<Details/>
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
