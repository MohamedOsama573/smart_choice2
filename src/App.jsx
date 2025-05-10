import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import { Compare } from './Components/Compare/Compare'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import { Layout } from './Components/Layout/Layout'
import { Login } from './Components/Login/Login'
import { Notfound } from './Components/Notfound/Notfound'
import Otp from './Components/Otp/Otp'
import { Register } from './Components/Register/Register'
import Details from './pages/Details/Details'
import MobileDetails from './pages/Details/MobileDetails'
import TabletDetails from './pages/Details/TabletDetails'
import TelevisionDetails from './pages/Details/TelevisionDetails'
import { Home } from './pages/Home/Home'
import Wishlist from './pages/Wishlist/Wishlist'
import LandingPage from './pages/LandingPage/LandingPage'

const router = createBrowserRouter([
  {path: '' , element: <Layout/>, children: [

    {path:'/' , element:<LandingPage/>},
    {path:'/products' , element:<Home/>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'/otp',element:<Otp/>},
    {path:'compare' , element:<Compare/>},
    {path:'wishlist', element:<Wishlist/>},
    {path:'/Laptop/product/:id' , element:<Details/>},
    {path:'/Mobile/product/:id' , element:<MobileDetails/>},
    {path:'/Tablet/product/:id' , element:<TabletDetails/>},
    {path:'/Television/product/:id' , element:<TelevisionDetails/>},
    {path:'forgetPassword' , element:<ForgetPassword/>},
    {path:'*' , element:<Notfound/>},
  ]}
])

function App() {
  return (
    <>
     <ToastContainer />
    <RouterProvider router={router}/>
   
    </>
  )
}

export default App
