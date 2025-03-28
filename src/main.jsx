/* eslint-disable no-unused-vars */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import Details from './Pages/Details.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

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
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" autoClose={1000} />
  </StrictMode>
);
