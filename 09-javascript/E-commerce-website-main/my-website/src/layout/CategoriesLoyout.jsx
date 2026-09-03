import { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, Row, Button } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

const CategoriesLayout = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    // Format category name (remove dash and capitalize words)
    // Safe category name formatter
    const formatCategoryName = (category) => {
        let slug = "";

        // If category is an object with slug
        if (typeof category === "object" && category.slug) {
            slug = category.slug;
        }
        // If category is already a string
        else if (typeof category === "string") {
            slug = category;
        }

        return slug
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Container className='p2 pt-3'>
            <Row>
                <Col md={3}>
                    <Card className="category-card">
                        <Card.Body>
                            <div className="p-2 mb-3">
                                <Button variant="primary" className="w-100 text-start">
                                    Product Categories
                                </Button>
                            </div>
                            <hr />
                            {/* scrollbar */}
                            <div className='category-list'  style={{ maxHeight: "400px", overflowY: "auto"  }} >
                                <ListGroup >
                                    {categories?.map((category, index) => (
                                        <ListGroup.Item className='list-group-item' key={index}>
                                            <NavLink
                                                to={`/products/category/${typeof category === "string" ? category : category.slug}`}
                                                className="text-decoration-none fw-bolder fs-6 "
                                            >
                                                {formatCategoryName(category)}
                                            </NavLink>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={9}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default CategoriesLayout;
