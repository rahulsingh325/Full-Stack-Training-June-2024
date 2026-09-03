
import { Container, Row, Col, Button } from 'react-bootstrap';



const Home = () => {
    return (
        <>
            {/* Hero Section with background video */}
            <section
                className="position-relative mt-4   text-warning d-flex align-items-center"
                style={{ height: '80vh' }}
            >
                {/* Video background */}
                <video
                    className="position-absolute h-100 w-100 top-0 bottom-0 start-0 end-0 rounded-5 "
                    style={{ objectFit: 'cover', zIndex: 1 }}
                    src="/4440956-hd_1920_1080_25fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                {/* Dark overlay */}
                {/* <div
                    className="position-absolute rounded-5 top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0,0,0,.55)', zIndex: 1 }}
                /> */}

                {/* Content (left-aligned, on top of video) */}
                <Container style={{ zIndex: 2 }}>
                    <Row>
                        <Col lg={6 } className=" ms-3">
                            <b className='display-6 fw-bold'>INDI<span className="text-primary  fw-bold">TRONICS</span></b>
                            <h1 className="display-5 fw-bold">Welcome to Our Store</h1>
                            <p className="lead fw-medium">Shop the best products at unbeatable prices.</p>
                            <Button
                                href="/products"
                                size="lg"
                                className="hero-btn"
                            >
                                Shop Now
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Home;