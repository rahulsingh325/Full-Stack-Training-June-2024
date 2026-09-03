import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from '../components/layouts/Sidebar'

const ProfileLayout = () => {
  return (
    <div className='h-100 border-top d-flex flex-column flex-lg-row profile-layout position-relative'>
        <div style={{flexGrow:1}} className='order-1 order-lg-0'>
            <Outlet />
        </div>
        <div className='d-flex justify-content-end border-start' style={{minWidth:'250px'}} >
            <Sidebar />
        </div>
    </div>
  )
}

export default ProfileLayout