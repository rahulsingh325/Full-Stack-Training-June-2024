
import {Button, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap'
import { BsArrowLeftCircleFill, BsArrowLeftSquareFill, BsList, BsThreeDots } from 'react-icons/bs'
import { FaAngleDoubleLeft } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom'
import leaf from '../../assets/image/icon/leaf.svg'
import avatar from '../../assets/image/women/avtarprofile.jpg'
import { useState } from 'react'

const Sidebar = () => {
    const [navigationShow, setNavigationShow] = useState(false)
    const navigate = useNavigate()

        const navList = [
        {
            name:'Analytics',
            path:'/profile',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 5C5.29822 5 2.5 7.79822 2.5 11.25C2.5 14.7018 5.29822 17.5 8.75 17.5C12.2018 17.5 15 14.7018 15 11.25H8.75V5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.25 8.75H17.5C17.5 5.29822 14.7018 2.5 11.25 2.5V8.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        },
        {
            name:'Account Setting',
            path:'/profile/account-setting',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.61944 3.28338C8.69478 2.83132 9.0859 2.5 9.54418 2.5H10.4558C10.9141 2.5 11.3052 2.83132 11.3806 3.28338L11.5047 4.02822C11.5636 4.38178 11.8244 4.66532 12.1554 4.80276C12.4866 4.94027 12.8669 4.9219 13.1587 4.71348L13.7734 4.27445C14.1463 4.00807 14.6571 4.05035 14.9812 4.37441L15.6258 5.01903C15.9499 5.34309 15.9921 5.85393 15.7258 6.22686L15.2866 6.84172C15.0782 7.13343 15.0598 7.51361 15.1973 7.84469C15.3347 8.17565 15.6182 8.43636 15.9716 8.49527L16.7166 8.61944C17.1687 8.69478 17.5 9.0859 17.5 9.54418V10.4558C17.5 10.9141 17.1687 11.3052 16.7166 11.3806L15.9718 11.5047C15.6182 11.5636 15.3347 11.8244 15.1972 12.1554C15.0597 12.4866 15.0781 12.8669 15.2865 13.1587L15.7255 13.7732C15.9919 14.1461 15.9496 14.657 15.6255 14.981L14.9809 15.6256C14.6568 15.9497 14.146 15.992 13.7731 15.7256L13.1584 15.2866C12.8667 15.0782 12.4865 15.0598 12.1553 15.1973C11.8244 15.3347 11.5636 15.6182 11.5047 15.9717L11.3806 16.7166C11.3052 17.1687 10.9141 17.5 10.4558 17.5H9.54418C9.0859 17.5 8.69478 17.1687 8.61944 16.7166L8.4953 15.9718C8.43637 15.6182 8.1756 15.3347 7.84457 15.1972C7.5134 15.0597 7.13312 15.0781 6.84133 15.2865L6.22665 15.7256C5.85373 15.992 5.34288 15.9497 5.01883 15.6256L4.3742 14.981C4.05014 14.6569 4.00787 14.1461 4.27424 13.7732L4.71343 13.1583C4.9218 12.8666 4.94017 12.4864 4.80271 12.1553C4.66531 11.8244 4.38183 11.5636 4.02835 11.5047L3.28338 11.3806C2.83132 11.3052 2.5 10.9141 2.5 10.4558V9.54418C2.5 9.0859 2.83132 8.69478 3.28338 8.61944L4.02821 8.4953C4.38178 8.43637 4.66532 8.1756 4.80277 7.84456C4.94027 7.51337 4.92191 7.13308 4.71348 6.84128L4.27457 6.2268C4.00819 5.85388 4.05047 5.34304 4.37453 5.01898L5.01915 4.37435C5.34321 4.0503 5.85405 4.00802 6.22698 4.27439L6.84164 4.71344C7.13337 4.92181 7.51357 4.94018 7.84467 4.80272C8.17564 4.66531 8.43636 4.38182 8.49528 4.02833L8.61944 3.28338Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5006 10C12.5006 11.3807 11.3813 12.5 10.0006 12.5C8.61987 12.5 7.50058 11.3807 7.50058 10C7.50058 8.61931 8.61987 7.50002 10.0006 7.50002C11.3813 7.50002 12.5006 8.61931 12.5006 10Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        },
        {
            name:'Report',
            path:'reports',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 10H10.625M7.5 12.5H10.625M7.5 15H10.625M13.125 15.625H15C16.0355 15.625 16.875 14.7855 16.875 13.75V5.09018C16.875 4.14436 16.1708 3.34179 15.2283 3.26356C14.9172 3.23774 14.6051 3.21548 14.2921 3.19683M9.45794 3.19683C9.40402 3.37168 9.375 3.55745 9.375 3.75C9.375 4.09518 9.65482 4.375 10 4.375H13.75C14.0952 4.375 14.375 4.09518 14.375 3.75C14.375 3.55745 14.346 3.37168 14.2921 3.19683M9.45794 3.19683C9.69396 2.43131 10.407 1.875 11.25 1.875H12.5C13.343 1.875 14.056 2.43131 14.2921 3.19683M9.45794 3.19683C9.14489 3.21548 8.83281 3.23774 8.52174 3.26356C7.57916 3.34179 6.875 4.14437 6.875 5.09018V6.875M6.875 6.875H4.0625C3.54473 6.875 3.125 7.29473 3.125 7.8125V17.1875C3.125 17.7053 3.54473 18.125 4.0625 18.125H12.1875C12.7053 18.125 13.125 17.7053 13.125 17.1875V7.8125C13.125 7.29473 12.7053 6.875 12.1875 6.875H6.875ZM5.625 10H5.63125V10.0063H5.625V10ZM5.625 12.5H5.63125V12.5063H5.625V12.5ZM5.625 15H5.63125V15.0063H5.625V15Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        },
        {
            name:'Transaction',
            path:'transactions',
            icon:
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.875 15.625C6.431 15.625 10.8447 16.2344 15.039 17.376C15.6448 17.5409 16.25 17.0905 16.25 16.4626V15.625M3.125 3.75V4.375C3.125 4.72018 2.84518 5 2.5 5H1.875M1.875 5V4.6875C1.875 4.16973 2.29473 3.75 2.8125 3.75H16.875M1.875 5V12.5M16.875 3.75V4.375C16.875 4.72018 17.1548 5 17.5 5H18.125M16.875 3.75H17.1875C17.7053 3.75 18.125 4.16973 18.125 4.6875V12.8125C18.125 13.3303 17.7053 13.75 17.1875 13.75H16.875M18.125 12.5H17.5C17.1548 12.5 16.875 12.7798 16.875 13.125V13.75M16.875 13.75H3.125M3.125 13.75H2.8125C2.29473 13.75 1.875 13.3303 1.875 12.8125V12.5M3.125 13.75V13.125C3.125 12.7798 2.84518 12.5 2.5 12.5H1.875M12.5 8.75C12.5 10.1307 11.3807 11.25 10 11.25C8.61929 11.25 7.5 10.1307 7.5 8.75C7.5 7.36929 8.61929 6.25 10 6.25C11.3807 6.25 12.5 7.36929 12.5 8.75ZM15 8.75H15.0062V8.75625H15V8.75ZM5 8.75H5.00625V8.75625H5V8.75Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        },
    ]



  return (
    <>
    <Navbar.Toggle bsPrefix=' ' className='order-1 border-0 bg-transparent d-lg-none position-absolute' onClick={()=>setNavigationShow(true)}>
        {/* <BsList size={30} className='text-neutral-300' /> */}
        <FaAngleDoubleLeft size={24} className='text-neutral-300' />
    </Navbar.Toggle>
    <Navbar expand={'lg'} className='p-lg-5 h-100 overflow-y-auto justify-content-start align-items-start border-lg-start border-0 border-lg-1'>
        <Navbar.Offcanvas placement="end" className='px-4' show={navigationShow} onHide={()=> setNavigationShow(false)} >
            <Offcanvas.Header closeButton />
            
            <div>
                <div className='d-flex justify-content-between align-items-center mb-5'>
                    <span className='fs-title fw-semibold text-neutral-700'>Profile</span>
                    <span className='fs-title fw-semibold text-neutral-700'><BsThreeDots /> </span>
                </div>

                    <div  className='bg-gradient square w-80 mx-auto d-flex align-items-center justify-content-center rounded-pill mb-2 p-1'>
                        <div className='w-100 h-100 bg-white d-flex align-items-center justify-content-center rounded-pill'>

                            <div className='w-60 square rounded-pill overflow-hidden'>
                                <Image className='w-100 h-100' src={avatar} alt='profile picture' />
                            </div>
                        </div>
                    </div>
                    
                    <div className='fs-title text-neutral-700 fw-semibold d-flex gap-2 justify-content-center align-items-center mb-1'>
                        <span>Ulad Luch</span> <Image src={leaf} alt="leaf image" /> 
                    </div>
                    <div className='fs-body text-neutral-400 fw-medium text-center mb-4'>Designer</div>

                <hr className='text-danger mb-7' />
            </div>
            <Offcanvas.Body>
                <Nav className="flex-column gap-2 mb-8">
                    {
                        navList.map((item)=>(
                            <NavLink key={item.path} end  to={item.path} className={({isActive})=> `${isActive?'text-white bg-primary':'text-neutral-400'} fs-title fw-medium text-decoration-none d-flex align-items-center gap-2 p-3 rounded-2`}>
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))
                    }
                </Nav>
            </Offcanvas.Body>


            {/* Logout Button  */}
            <Button onClick={()=> navigate('/login')} className='border-0 bg-transparent text-neutral-400 fs-title fw-medium d-flex gap-2 align-items-center mt-auto'>
                <svg className='rotate-180' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.875 12.5V15.625C6.875 16.6605 7.71447 17.5 8.75 17.5L13.75 17.5C14.7855 17.5 15.625 16.6605 15.625 15.625L15.625 4.375C15.625 3.33947 14.7855 2.5 13.75 2.5H8.75C7.71447 2.5 6.875 3.33947 6.875 4.375V7.5M4.375 7.5L1.875 10M1.875 10L4.375 12.5M1.875 10L12.5 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Log out</span>
            </Button>
        </Navbar.Offcanvas>
    </Navbar>
    </>
  )
}

export default Sidebar