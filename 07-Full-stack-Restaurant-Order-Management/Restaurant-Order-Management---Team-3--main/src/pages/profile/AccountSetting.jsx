import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Nav, Row, Tab } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup';

const AccountSetting = () => {
    const [showPassword, setShowPassword] = useState(false)

    // Reset Password Form
    const resetPasswordForm = useForm()
    const onUpdatePassword = (data)=>{
        console.log(data)
    }

    //Profile Setting Form
    const profileSettingFormSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().required('Email is required').matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "Invalid email format"),
        phone: yup.string().required('Phone number is required').matches(/^(?!.*(\d)\1{9})\d{10}$/, "Phone must be 10 digits and not all same"),
        address: yup.string().required('Address is required'),
    })
    const profileSettingForm = useForm({resolver:yupResolver(profileSettingFormSchema)})
    const onProfileUpdate = ()=>{
        
    }

  return (
    <div className="p-lg-8 p-4 h-100 overflow-auto hide-scrollbar">
        <Row className='d-flex flex-column flex-md-row align-items-lg-center mb-8'>
            <Col lg={4}>
                <h4 className='fs-h4 fw-semibold text-neutral-800  text-center text-lg-start'>Account Setting</h4>
                <p className='m-0 text-neutral-400 fs-body fw-medium text-center text-lg-start mb-4 mb-lg-0'>Control your profile setup and integration</p>
            </Col>
            <Col lg={8} className="d-flex flex-grow-1">

                <InputGroup className='px-3 ms-md-auto'>
                    <InputGroup.Text className='text-neutral-400 border-end-0 bg-white py-3'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.58268 17.4998C13.9549 17.4998 17.4993 13.9554 17.4993 9.58317C17.4993 5.21092 13.9549 1.6665 9.58268 1.6665C5.21043 1.6665 1.66602 5.21092 1.66602 9.58317C1.66602 13.9554 5.21043 17.4998 9.58268 17.4998Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.3327 18.3332L16.666 16.6665" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                    </InputGroup.Text>
                    <Form.Control placeholder='Search' className='border-start-0 bg-white py-3'/>
                </InputGroup>
                <div className='d-flex align-items-center gap-3'>
                    <Button variant='outline-primary' className=' border-neutral-200 text-neutral-800 position-relative hover-text-white rounded-pill d-flex align-items-center justify-content-center w-52 square p-1'>
                        <span className='d-inline-block p-1 bg-error-200 position-absolute ms-5 mb-3 rounded-pill'></span>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 27C22.6274 27 28 22.0751 28 16C28 9.92487 22.6274 5 16 5C9.37258 5 4 9.92487 4 16C4 18.9181 5.2396 21.5709 7.26245 23.5399C7.70761 23.9732 8.00605 24.565 7.88518 25.1744C7.68369 26.1902 7.22576 27.1137 6.58105 27.8746C6.78906 27.9119 7 27.941 7.21289 27.9618C7.47168 27.9871 7.73438 28 8 28C9.70934 28 11.2935 27.4638 12.5936 26.5505C13.6734 26.843 14.8167 27 16 27Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>   
                    <Button variant='outline-primary' className=' border-neutral-200 text-neutral-800  hover-text-white rounded-pill d-flex align-items-center justify-content-center w-52 square p-1'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.7923 5.2534C12.9129 4.53012 13.5387 4 14.2719 4H17.7306C18.4638 4 19.0896 4.53012 19.2101 5.2534L19.4948 6.96147C19.5779 7.46019 19.9112 7.87562 20.3536 8.12048C20.4525 8.17522 20.5503 8.23178 20.6468 8.2901C21.0802 8.55179 21.6073 8.63315 22.0814 8.45554L23.7039 7.8477C24.3906 7.59046 25.1625 7.86734 25.5292 8.50236L27.2585 11.4976C27.6251 12.1326 27.4789 12.9396 26.9128 13.4057L25.5737 14.5081C25.1837 14.8292 24.9903 15.325 24.9997 15.83C25.0007 15.8866 25.0012 15.9432 25.0012 16C25.0012 16.0568 25.0007 16.1134 24.9997 16.1699C24.9903 16.675 25.1837 17.1708 25.5737 17.4919L26.9128 18.5943C27.4789 19.0603 27.6251 19.8673 27.2585 20.5024L25.5292 23.4976C25.1625 24.1326 24.3906 24.4095 23.7039 24.1523L22.0814 23.5444C21.6073 23.3668 21.0802 23.4482 20.6469 23.7099C20.5503 23.7682 20.4525 23.8248 20.3536 23.8795C19.9112 24.1244 19.5779 24.5398 19.4948 25.0385L19.2101 26.7466C19.0896 27.4699 18.4638 28 17.7306 28H14.2719C13.5387 28 12.9129 27.4699 12.7923 26.7466L12.5077 25.0385C12.4245 24.5398 12.0913 24.1244 11.6489 23.8795C11.55 23.8248 11.4522 23.7682 11.3557 23.7099C10.9223 23.4482 10.3952 23.3668 9.92109 23.5445L8.2986 24.1523C7.61194 24.4095 6.83995 24.1327 6.47332 23.4976L4.74401 20.5024C4.37738 19.8674 4.52359 19.0604 5.0897 18.5943L6.42883 17.4919C6.81884 17.1708 7.01217 16.675 7.00282 16.17C7.00177 16.1134 7.00125 16.0568 7.00125 16C7.00125 15.9432 7.00177 15.8866 7.00282 15.8301C7.01217 15.325 6.81884 14.8292 6.42883 14.5081L5.0897 13.4057C4.52359 12.9397 4.37738 12.1327 4.74401 11.4976L6.47332 8.50238C6.83995 7.86736 7.61194 7.59048 8.2986 7.84772L9.92107 8.45556C10.3952 8.63316 10.9223 8.5518 11.3556 8.29011C11.4522 8.23178 11.55 8.17523 11.6489 8.12048C12.0913 7.87562 12.4245 7.46019 12.5077 6.96147L12.7923 5.2534Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20.0009 15.9999C20.0009 18.209 18.2101 19.9999 16.0009 19.9999C13.7918 19.9999 12.0009 18.209 12.0009 15.9999C12.0009 13.7908 13.7918 11.9999 16.0009 11.9999C18.2101 11.9999 20.0009 13.7908 20.0009 15.9999Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Button>   
                </div>
            </Col>
        </Row>
        <div>
            <Tab.Container defaultActiveKey="profile">

                {/* NavTabs */}
                <div className='mb-8'>
                    <Nav variant="pills" className="gap-3 p-1 bg-neutral-100 rounded-pill hide-scrollbar  flex-nowrap overflow-x-auto ">
                        <Nav.Item className='flex-grow-1 text-center'>
                            <Nav.Link className='rounded-pill text-neutral-400 fs-body fw-medium bg-active-white text-active-black py-3' eventKey="profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='flex-grow-1 text-center'>
                            <Nav.Link className='rounded-pill text-neutral-400 fs-body fw-medium bg-active-white text-active-black py-3' eventKey="account">Account</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='flex-grow-1 text-center'>
                            <Nav.Link className='rounded-pill text-neutral-400 fs-body fw-medium bg-active-white text-active-black py-3' eventKey="team">Team</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='flex-grow-1 text-center'>
                            <Nav.Link className='rounded-pill text-neutral-400 fs-body fw-medium bg-active-white text-active-black py-3' eventKey="integrations">Integrations</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='flex-grow-1 text-center'>
                            <Nav.Link className='rounded-pill text-neutral-400 fs-body fw-medium bg-active-white text-active-black py-3' eventKey="billings">Billings</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>

                {/* NavTabs Content */}
                <div>
                    <Tab.Content>
                        {/* Profile Tab Content */}
                        <Tab.Pane eventKey="profile" >
                            <div className='border border-neutral-200 rounded-3 p-5 bg-white mb-5'>
                                <h4 className='fs-h4 fw-semibold text-neutral-800 mb-1 text-center text-lg-start'>Profile Setting</h4>
                                <p className='text-neutral-400 fw-medium fs-body mb-5 text-center text-lg-start'>These are your personal details, they are visible to the public</p>
                                <Form onSubmit={profileSettingForm.handleSubmit(onProfileUpdate)}>
                                    <Row className='mb-3 justify-content-center justify-content-lg-between'>
                                        <Col lg={6} md={8}>
                                            <Form.Group>
                                                <Form.Label className='mb-2'>Name</Form.Label>
                                                <Form.Control {...profileSettingForm.register('name')} className='p-lg-3 p-2' />
                                            </Form.Group>
                                            <span className='text-danger'>{profileSettingForm.formState.errors?.name?.message}</span>
                                        </Col>
                                        <Col lg={6} md={8}>
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control {...profileSettingForm.register('email')} className='p-2 p-lg-3' />
                                            </Form.Group>
                                            <span className='text-danger'>{profileSettingForm.formState.errors?.email?.message}</span>
                                        </Col>
                                    </Row>
                                    <Row className='mb-6 justify-content-center justify-content-lg-between'>
                                        <Col lg={6} md={8}>
                                            <Form.Group>
                                                <Form.Label>Number phone</Form.Label>
                                                <Form.Control {...profileSettingForm.register('phone')} className='p-2 p-lg-3' />
                                            </Form.Group>
                                            <span className='text-danger'>{profileSettingForm.formState.errors?.phone?.message}</span>
                                        </Col>
                                        <Col lg={6} md={8}>
                                            <Form.Group>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control {...profileSettingForm.register('address')} className='p-2 p-lg-3' />
                                            </Form.Group>
                                            <span className='text-danger'>{profileSettingForm.formState.errors?.address?.message}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4} className='d-flex gap-3'>
                                            <Button className='flex-grow-1 rounded-pill p-2 p-lg-3' variant='outline-primary' onClick={()=> profileSettingForm.reset()}>Cancel</Button>
                                            <Button className='flex-grow-1 rounded-pill p-2 p-lg-3' variant='primary' type='submit'>Update</Button>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                            <div className='border border-neutral-200 rounded-3 p-5 bg-white mb-8'>
                                <h4 className='fs-h4 fw-semibold text-neutral-800 mb-1 text-center text-lg-start'>Update Password</h4>
                                <p className='text-neutral-400 fw-medium fs-body mb-5 text-center text-lg-start'>Enter your current password to make update</p>
                                <Form onSubmit={resetPasswordForm.handleSubmit(onUpdatePassword)}>
                                    <Row className='mb-6 justify-content-center justify-content-lg-between'>
                                        <Col lg={6} md={8} className='mb-4 mb-lg-0'>
                                            <Form.Group>
                                                <Form.Label>Current password</Form.Label>
                                                <InputGroup>
                                                    <Form.Control {...resetPasswordForm.register('currentPassword', {required: 'Current Password is required'})} type={showPassword ? 'text':'password'} placeholder='Enter current password' className='p-2 p-lg-3 border-end-0' />
                                                    <InputGroup.Text className='border-start-0 bg-transparent' role='button' onClick={()=>setShowPassword(!showPassword)}> {showPassword ? <BsEye /> : <BsEyeSlash /> }</InputGroup.Text>
                                                </InputGroup>
                                                <span className='text-danger'>{resetPasswordForm.formState.errors?.currentPassword?.message}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={8}>
                                            <Form.Group>
                                                <Form.Label>New password</Form.Label>
                                                <InputGroup>
                                                    <Form.Control {...resetPasswordForm.register('newPassword', {required:'New Password is required'})} type={showPassword ? 'text' : 'password'} placeholder='New password' className='p-2 p-lg-3 border-end-0' />
                                                    <InputGroup.Text className='border-start-0 bg-transparent' role='button' onClick={()=> setShowPassword(!showPassword)}> {showPassword ? <BsEye /> : <BsEyeSlash /> } </InputGroup.Text>
                                                </InputGroup>    
                                            </Form.Group>
                                            <span className='text-danger'>{resetPasswordForm.formState.errors?.newPassword?.message}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={4} className='d-flex gap-3'>
                                            <Button className='flex-grow-1 rounded-pill p-2 p-lg-3' variant='outline-primary' onClick={()=> resetPasswordForm.reset()}>Cancel</Button>
                                            <Button className='flex-grow-1 rounded-pill p-2 p-lg-3' variant='primary' type='submit'>Update</Button>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </Tab.Pane>

                        {/* Account Tab Content */}
                        <Tab.Pane eventKey="account">Account tab content</Tab.Pane>

                        {/* Team Tab Content */}
                        <Tab.Pane eventKey="team">Team tab content</Tab.Pane>

                        {/* Integrations Tab Content */}
                        <Tab.Pane eventKey="integrations">Integration tab content</Tab.Pane>

                        {/* Billings Tab Content */}
                        <Tab.Pane eventKey="billings">Billing tab content</Tab.Pane>
                    </Tab.Content>
                </div>     
            </Tab.Container>
        </div>
    </div>
  )
}

export default AccountSetting