import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './Layouts/HomeLayout.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Verify_OTP from './pages/auth/Verify_OTP.jsx'
import ForgotPassword from './pages/forgotpassword/ForgotPassword.jsx'
import ResetPassword from './pages/forgotpassword/ResetPassword.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import UserDashboard from './pages/user/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/verify-otp",
        element: <Verify_OTP />
      },
      {
        path: '/admin',
        element: <AdminDashboard />
      },
      {
        path:"/user",
        element:<UserDashboard/>
      },
      {
        path:"/forgot-password",
        element:<ForgotPassword/>
      },
      {
        path:'/reset-password/:token',
        element:<ResetPassword/>
      }
    ]
  },

])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
)
