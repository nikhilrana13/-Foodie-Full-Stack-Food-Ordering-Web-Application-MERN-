import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCartIcon, UserIcon ,SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SetAuthUser } from '@/redux/UserSlice';
import UserPlacedOrders from './UserPlacedOrders';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    // console.log("user",user);

    
    const HandleLogout = async()=>{

      try {
          const res = await axios.get('http://localhost:4000/api/user/signout',{withCredentials:true})
          if(res.data){
                toast.success("Logout successfully" || res.data.message);
                dispatch(SetAuthUser(null))

                setTimeout(()=>{
                  navigate('/')
                },100)
              
                
          }
   } catch (error) {
     console.log("failed to logout",error);
     toast.error(error.response?.data?.message || "something went wrong");
     
   }

  }


    const handleToggle = () => {
        setToggle(!toggle);
    };

  return (
    <header className="flex bg-white border-b items-center py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50">
    <div className="flex max-w-screen-xl p-3 mx-auto w-full">
      <div className="flex flex-wrap items-center justify-between lg:gap-y-2 gap-2 w-full">
        {/* Logo */}
        <NavLink to="/" className="">
           <span className="text-[1rem] sm:text-2xl  text-gray-700 font-bold" >Foodie🍔 </span>
        </NavLink>

        {/* Mobile Menu */}
        <div
          className={`lg:ml-6 lg:!block max-lg:fixed gap-5 max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 transition-transform duration-300 ${
            toggle ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
          }`}
        >
         
         
          {/* Close Button */}
          <button onClick={handleToggle} className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
            </svg>
          </button>

          {/* Menu Items */}
          <ul className="lg:flex items-center cursor-pointer lg:gap-x-3 max-lg:space-y-3">
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink to="/" className="text-gray-700 text-sm block font-[600]">
                <p>HOME</p>
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink to="/menu" className="text-gray-700 text-sm block font-[600]">
                <p>MENU</p>
              </NavLink>
            </li>
            <li className="max-lg:border-b max-lg:py-3 px-3">
              <NavLink to="#" className="text-gray-700 text-sm block font-[600]">
                <p>CONTACT</p>
              </NavLink>
            </li>
             
             {
               user ? (
               ""
               ):(
                <li className="max-lg:border-b max-lg:py-3 px-3">
                <NavLink to="/admin" className=" lg:px-3 py-2 lg:border rounded-full text-sm font-semibold text-[#2A2A2A]">Admin panel</NavLink>
                </li>
            
               )
             }
          </ul>
        </div>

        {/* Cart & Menu Toggle */}
        <div className="flex items-center gap-x-5 gap-y-3 ">
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <div>
              <NavLink to="/menu">
              <SearchIcon className="w-7 h-7 cursor-pointer"  />
              </NavLink>
             
            </div>
                {
                  user ? (

                    <div className="group relative">
                    < UserIcon className="w-7 h-7 cursor-pointer" />
                    <div className="group-hover:block hidden absolute  right-0 pt-4">
                      <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                          <NavLink to="/placedorders" className="cursor-pointer hover:text-black">
                          Orders
                          </NavLink>
                          <p  onClick={HandleLogout} className="cursor-pointer hover:text-black">Logout</p>
                      </div>
                    </div>
                    </div> 
                  ):(
                    <div>         
                    <NavLink to="/login">
                    < UserIcon className="w-7 h-7 cursor-pointer" />
                            </NavLink>
                  </div>
                  )
                }
            <div className="relative">
              <NavLink to="/Cart">
              <ShoppingCartIcon className="w-7 h-7 cursor-pointer"  />
              </NavLink>
          
            </div>

            {/* Mobile Menu Button */}
            <button onClick={handleToggle} className="lg:hidden">
              <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar
