import React from 'react'
import AdminNavbar from './AdminNavbar'
import { NavLink, Outlet } from 'react-router-dom'
import { ListCheckIcon, PlusIcon, ListOrdered } from 'lucide-react'

const AdminDashboard = () => {
  return (
    <div className='min-h-screen'>
      <AdminNavbar />
      <div className='alldata w-full flex'>
            <div className='w-[18%] min-h-screen border-r-2'>
                <div className=' gap-5 flex flex-col py-10 font-[500] text-gray-600'>
                <NavLink to="/admin/add" className="border rounded-md py-3 px-3">
                  <div className='flex items-center gap-4 '>
                    <PlusIcon />
                    <span className='hidden md:inline'>Add Items</span>
                 </div>
                </NavLink>
                <NavLink to="/admin/listitems" className="border rounded-md py-3 px-3">
                  <div className='flex items-center gap-4'>
                    <ListCheckIcon />
                    <span className='hidden md:inline'>List Items</span>
                 </div>
                </NavLink>
                <NavLink to="/admin/orders" className="border rounded-md py-3 px-3">
                  <div className='flex items-center gap-4'>
                    <ListOrdered />
                    <span className='hidden md:inline'>Orders</span>
                 </div>
                </NavLink>
                </div>
               
            </div>
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Outlet />
            </div>

        </div>
    </div>
  )
}

export default AdminDashboard
