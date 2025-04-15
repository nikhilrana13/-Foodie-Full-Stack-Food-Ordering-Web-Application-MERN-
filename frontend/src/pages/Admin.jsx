import AdminDashboard from '@/components/AdminDashboard'
import AdminLogin from '@/components/AdminLogin'
import React from 'react'
import { useSelector } from 'react-redux'

const Admin = () => {
  const admin = useSelector((state)=>state.user.admin)

  return (
    <div>
        {
          admin ? <AdminDashboard /> : <AdminLogin />
        }
    </div>
  )
}

export default Admin
