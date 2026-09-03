import React, { useState } from 'react'
import { Dropdown, Image, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/image/icon/logo.svg'
import avatarImage from '../../assets/image/women/avtarprofile.jpg'
import bellIcon from '../../assets/image/icon/bell.svg'
import { BsList, BsX } from "react-icons/bs";


//Custome toggle for bell Icon
const CustomToggle =  React.forwardRef(({children, onClick}, ref)=> (

    <div onClick={onClick} ref={ref} role='button'>{children}</div>
))

const Header = () => {

    const [expended, setExpended] = useState(false)

    //NavList items
    const navList = [
        {
            name:'Dashboard',
            path:'/',
            icon:
            <svg width="21" height="20" viewBox="0 0 21 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6084 2.1665H16.9746C17.5981 2.1665 17.9093 2.28215 18.0693 2.42432C18.2142 2.5531 18.333 2.79381 18.333 3.31689V7.1001C18.333 7.62344 18.2134 7.86229 18.0693 7.98975C17.9104 8.13034 17.6014 8.24557 16.9785 8.2417H13.6084C12.9832 8.2417 12.6731 8.12695 12.5137 7.98584C12.37 7.85864 12.25 7.61966 12.25 7.09131V3.31689L12.2559 3.1333C12.2807 2.73514 12.3878 2.53699 12.5146 2.42432C12.6547 2.30006 12.9099 2.19553 13.3887 2.17139L13.6084 2.1665Z" stroke="currentColor"/>
                <path d="M13.6084 11.75H16.9746C17.587 11.75 17.8882 11.8765 18.0479 12.0361C18.2073 12.1959 18.333 12.4964 18.333 13.1084V16.4746C18.333 17.087 18.2075 17.3882 18.0479 17.5479C17.8882 17.7075 17.587 17.833 16.9746 17.833H13.6084C12.9964 17.833 12.6959 17.7073 12.5361 17.5479C12.3765 17.3882 12.25 17.087 12.25 16.4746V13.1084L12.2559 12.8926C12.2822 12.4229 12.3965 12.1758 12.5361 12.0361C12.6758 11.8965 12.9229 11.7822 13.3926 11.7559L13.6084 11.75Z" stroke="currentColor"/>
                <path d="M4.02441 2.1665H7.39062C8.01409 2.1665 8.32534 2.28215 8.48535 2.42432C8.63026 2.5531 8.74902 2.79381 8.74902 3.31689V7.1001C8.74898 7.62344 8.62937 7.86229 8.48535 7.98975C8.32644 8.13034 8.01739 8.24557 7.39453 8.2417H4.02441C3.39918 8.2417 3.08914 8.12695 2.92969 7.98584C2.78597 7.85864 2.66602 7.61966 2.66602 7.09131V3.31689L2.67188 3.1333C2.69672 2.73514 2.80385 2.53699 2.93066 2.42432C3.09077 2.28227 3.40135 2.1665 4.02441 2.1665Z" stroke="currentColor"/>
                <path d="M4.02441 11.75H7.39062C8.00305 11.75 8.30423 11.8765 8.46387 12.0361C8.62335 12.1959 8.74902 12.4964 8.74902 13.1084V16.4746C8.74902 17.087 8.6235 17.3882 8.46387 17.5479C8.30423 17.7075 8.00305 17.833 7.39062 17.833H4.02441C3.41241 17.833 3.11187 17.7073 2.95215 17.5479C2.79251 17.3882 2.66602 17.087 2.66602 16.4746V13.1084L2.67188 12.8926C2.69826 12.4229 2.8125 12.1758 2.95215 12.0361C3.11179 11.8765 3.41199 11.75 4.02441 11.75Z" stroke="currentColor"/>
            </svg>
        },
        {
            name:'Order List',
            path:'/orders',
            icon:
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.7743 5.63318L15.966 16.9082C15.766 17.7499 15.016 18.3332 14.1493 18.3332H3.19929C1.94096 18.3332 1.04097 17.0998 1.41597 15.8915L4.9243 4.62488C5.16597 3.84154 5.89098 3.2998 6.70765 3.2998H16.9576C17.7493 3.2998 18.4076 3.78314 18.6826 4.44981C18.841 4.80814 18.8743 5.21651 18.7743 5.63318Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                <path d="M13.834 18.3333H17.8173C18.8923 18.3333 19.734 17.425 19.659 16.35L18.834 5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokelinejoint="round"/>
                <path d="M8.56641 5.31675L9.43308 1.7168" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokelinejoint="round"/>
                <path d="M14.1504 5.32513L14.9337 1.7085" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokelinejoint="round"/>
                <path d="M6.91602 10H13.5827" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokelinejoint="round"/>
                <path d="M6.08398 13.3335H12.7507" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokelinejoint="round"/>
            </svg>
        },
        {
            name:'History',
            path:'/history',
            icon:
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.8327 9.99984C18.8327 14.5998 15.0993 18.3332 10.4993 18.3332C5.89935 18.3332 2.16602 14.5998 2.16602 9.99984C2.16602 5.39984 5.89935 1.6665 10.4993 1.6665C15.0993 1.6665 18.8327 5.39984 18.8327 9.99984Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokelinejoint="round"/>
                <path d="M13.5914 12.65L11.0081 11.1083C10.5581 10.8416 10.1914 10.2 10.1914 9.67497V6.2583" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokelinejoint="round"/>
            </svg>
        },
        {
            name:'Bills',
            path:'/bills',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3333 5.00002V7.01669C18.3333 8.33335 17.4999 9.16669 16.1832 9.16669H13.3333V3.34169C13.3333 2.41669 14.0916 1.66669 15.0166 1.66669C15.9249 1.67502 16.7583 2.04169 17.3583 2.64169C17.9583 3.25002 18.3333 4.08335 18.3333 5.00002Z" fill="white" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.66675 5.83335V17.5C1.66675 18.1917 2.45006 18.5834 3.00006 18.1667L4.42508 17.1C4.75841 16.85 5.22509 16.8834 5.52509 17.1834L6.9084 18.575C7.2334 18.9 7.76677 18.9 8.09177 18.575L9.49176 17.175C9.78343 16.8834 10.2501 16.85 10.5751 17.1L12.0001 18.1667C12.5501 18.575 13.3334 18.1834 13.3334 17.5V3.33335C13.3334 2.41669 14.0834 1.66669 15.0001 1.66669H5.83341H5.00008C2.50008 1.66669 1.66675 3.15835 1.66675 5.00002V5.83335Z" fill="white" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 7.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.625 10.8333H9.375" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        },
        {
            name:'Product Management',
            path:'products',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.875 10.625V10C1.875 8.96447 2.71447 8.125 3.75 8.125H16.25C17.2855 8.125 18.125 8.96447 18.125 10V10.625M10.8839 5.25888L9.11612 3.49112C8.8817 3.2567 8.56375 3.125 8.23223 3.125H3.75C2.71447 3.125 1.875 3.96447 1.875 5V15C1.875 16.0355 2.71447 16.875 3.75 16.875H16.25C17.2855 16.875 18.125 16.0355 18.125 15V7.5C18.125 6.46447 17.2855 5.625 16.25 5.625H11.7678C11.4362 5.625 11.1183 5.4933 10.8839 5.25888Z" stroke="#6B7283" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        },
    ]

  return (
    <header className='h-100 position-relative'>
        <Navbar fixed="top" expand="lg"className='py-4 px-lg-8 px-4 bg-white'>
                <Navbar.Brand as={Link} to={'/'}> <Image className='w-40' fluid src={logo} alt='site logo' />  </Navbar.Brand>

                <Navbar.Toggle bsPrefix=' '  onClick={()=> setExpended(expended ? false : 'show')} aria-label="Toggle navigation"  aria-controls="navbarScroll" className='order-1 border-0 bg-transparent d-lg-none'>
                    {expended ? <BsX size={30} className='text-neutral-300'/> : <BsList size={30} className='text-neutral-300' />}
                </Navbar.Toggle>

                <Navbar.Collapse className='order-2 order-lg-0'>
                    <Nav className='gap-4 mx-auto pt-4 pt-lg-0'>
                    {
                        navList.map(item => (
                            <NavLink key={item.path}  to={item.path} className={({isActive})=> `${isActive?'text-primary':'text-neutral-400'} fs-title fw-medium text-decoration-none d-flex align-items-center gap-2 p-1`}>
                            
                            {item.icon}
                            {item.name}
                    
                            </NavLink>
                        ))
                    }
                </Nav>
                </Navbar.Collapse>

                <div className='d-flex gap-2 align-items-center ms-auto me-4'>
                    <Dropdown align="end">
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" >
                            <div className='d-inline-flex align-items-center justify-content-center position-relative p-2 border rounded-pill'>
                                <span className='d-inline-block p-1 bg-error-200 position-absolute ms-3 mb-3 rounded-pill'></span>
                                <Image src={bellIcon} alt='' />
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='p-2 rounded-1'>
                            Notifications
                        </Dropdown.Menu>
                    </Dropdown>
                    <NavLink to={'/profile'}>
                        <Image roundedCircle src={avatarImage} className='border' alt='profile picture' />
                    </NavLink>
                </div>
        </Navbar>
    </header>
  )
}

export default Header