import { Container, Row, Col } from 'react-bootstrap';

export const NotFound404 = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h1 className="display-1 text-muted">404</h1>
                    <h2 className="mb-4">Page Not Found</h2>
                    <p className="lead mb-4">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <a href="/" className="btn btn-primary">
                        Go Back Home
                    </a>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound404;

