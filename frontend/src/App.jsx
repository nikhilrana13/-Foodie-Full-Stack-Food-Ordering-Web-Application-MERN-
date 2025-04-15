import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Admin from './pages/Admin'
import AdminLogin from './components/AdminLogin'
import AdminSignup from './components/AdminSignup'
import ProtectedRoute from './components/protectedRoute'
import UserLogin from './components/UserLogin'
import UserSignUp from './components/UserSignUp'
import AddProductForm from './components/AddProductForm'
import Listitems from './components/Listitems'
import AdminOrders from './components/AdminOrders'
import Cart from './components/Cart'
import Orders from './components/Orders'
import UserPlacedOrders from './components/UserPlacedOrders'
import Menu from './components/Menu'

function App() {

  return (
 
    <div className="App px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path='/signup' element={<UserSignUp />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/placedorders' element={<UserPlacedOrders />} />

  

        {/* admin routes */}
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}>
          <Route path='add' element={<AddProductForm />} />
          <Route path='listitems' element={<Listitems />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      <ToastContainer />
    </div>
   
   
  )
}

export default App
