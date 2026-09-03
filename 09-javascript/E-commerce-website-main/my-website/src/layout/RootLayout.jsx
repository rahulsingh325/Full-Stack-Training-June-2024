import { Container, Row, Col, Navbar, Nav, Badge, Button } from 'react-bootstrap';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useDispatch } from 'react-redux';
import { logout } from '../store/slice/AuthSlice';

const RootLayout = () => {
    const [darkMode, setDarkMode] = useState(!true);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { totalItems } = useSelector((state) => state.cart);
    useEffect(() => {
        const htmlElement = document.querySelector("html");
        htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light")
    }, [darkMode]);


    // Get auth state from redux
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <Container>
            <Row>
                <Col md={12}>
                    <Navbar expand="lg" className="bg-body-tertiary mt-2 rounded-2 navbar-color">
                        <Container fluid>
                            <NavLink to="/" className='fs-3 text-decoration-none text-warning'>
                                <b>INDI<span className="text-primary fs-2 fw-bold">TRONICS</span></b>
                            </NavLink>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <NavLink to="/products" className=" text-decoration-none fw-bolder ps-3 ">Products</NavLink>
                                </Nav>
                                <div className="d-flex">
                                    <Badge className='me-2 rounded-5 p-2' onClick={() => {setDarkMode(!darkMode)}} bg={darkMode ? "light" : "dark"}
                                        role="button">{darkMode ? <Moon size={20} /> : <Sun size={20} />}
                                    </Badge>
                                    <NavLink to="/cart" className=' text-decoration-none me-3 wishlist-btn'>
                                        Cart <Badge className='bg-danger'>{totalItems}</Badge>
                                    </NavLink>
                                    {isAuthenticated && (
                                        <NavLink to="/wishlist" className='text-decoration-none wishlist-btn '>
                                            Wishlist <Badge className='bg-danger'>{wishlistItems.length}</Badge>
                                        </NavLink>
                                    )}
                                    {isAuthenticated ? (
                                        <>
                                            <NavLink to="/profile" className='text-decoration-none ms-3 wishlist-btn'>
                                                🙍‍♂️ Profile
                                            </NavLink>
                                            <NavLink to="/"  className="text-decoration-none ms-2 wishlist-btn" onClick={handleLogout}>
                                                Logout
                                            </NavLink>
                                        </>
                                    ) : (
                                        <NavLink to="/signup" className='text-decoration-none ms-3 wishlist-btn' >
                                            🙍‍♂️ Join Now
                                        </NavLink>
                                    )}
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>
            </Row>
            <Outlet />
        </Container>
    )
}

export default RootLayout;
