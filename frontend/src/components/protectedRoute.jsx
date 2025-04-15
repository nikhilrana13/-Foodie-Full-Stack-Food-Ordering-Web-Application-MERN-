import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const Admin = useSelector((state)=>state.user.admin)
    console.log("admin",Admin)

    if(!Admin){
        return <Navigate to="/admin/login" replace />
    }
  return  children
}

export default ProtectedRoute
