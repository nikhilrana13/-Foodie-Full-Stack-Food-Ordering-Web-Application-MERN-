import React from 'react'
import { Button } from './ui/button'
import { NavLink, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { SetAuthAdmin } from '@/redux/UserSlice'
import axios from 'axios'
import { useState } from 'react'


const AdminNavbar = () => {
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogout = async()=>{
        setLoading(true)
         try {
               const res =  await axios.get('http://localhost:4000/api/admin/signout',{withCredentials:true})
            //    console.log('logout',res.data)
               if(res.data){
                setTimeout(() => {
                    navigate('/')
                    dispatch(SetAuthAdmin(null))
                }, 1000);
               }
                
            
         } catch (error) {
            console.log('error',error)
            setLoading(false)
         } 
    } 


  return (
    <div className='border-b flex items-center py-4 justify-between'>
    <div>
    <NavLink to="" className="flex flex-col">
         <span className="text-[1rem] sm:text-2xl  text-gray-700 font-bold" >FOODIE🍔 </span>
         <span className='text-pink-500 text-sm'>ADMIN PANEL</span>
      </NavLink>
    </div>

    {
        loading ? (
            <Button onClick={handleAdminLogout} className="px-7 py-2 rounded-full ">
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            </Button>
                
        ):(
            <Button onClick={handleAdminLogout} className="px-7 py-2 rounded-full ">
            Logout
        </Button>

        )
    }

   
</div>
  )
}

export default AdminNavbar
