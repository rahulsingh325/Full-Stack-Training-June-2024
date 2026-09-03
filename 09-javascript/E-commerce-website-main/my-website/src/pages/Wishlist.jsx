import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Image} from "react-bootstrap";
import { toast } from "react-toastify";
import { removeItemFromWishlist } from "../store/slice/WishlistSlice";
import { addItemToCart } from "../store/slice/CartSlice";

export const Wishlist = () => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const handleRemoveFormWishlist = (product) => {
        dispatch(removeItemFromWishlist(product));
        toast.success(product.title + " removed from wishlist");
    };

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
        dispatch(removeItemFromWishlist(product));
        toast.success(product.title + " moved to cart");
    };

    return (
        <Container className="my-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <h2 className="mb-1 fw-bold">My Wishlist</h2>
                </Col>
                <Col className="text-end">
                    <div className="pt-3">
                        <span className="display-5 fw-bold text-primary">
                            {wishlistItems.length}
                        </span>
                        <span className="ms-2 fw-bold">
                            items saved
                        </span>
                    </div>
                </Col>
            </Row>

            <Row>
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((product) => (
                        <Col md={4} key={product.id} className="mb-3">
                            <Card className="shadow h-100 rounded-5">
                                <Card.Body className="d-flex flex-column">
                                    <div className="d-flex justify-content-center mb-3">
                                        <Image
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="p-2"
                                        />
                                    </div>
                                    <h5 className="text-center">{product.title}</h5>
                                    <p className="text-muted small text-center flex-grow-1">
                                        {product.description
                                            ? product.description.slice(0, 80) + "..."
                                            : ""}
                                    </p>
                                    <div className="text-center fw-bold text-primary mb-3">
                                        ₹{product.price}
                                    </div>
                                    <div className="d-flex justify-content-between mt-auto">
                                        <Button
                                            size="sm"
                                            variant="outline-danger rounded-5"
                                            onClick={() => handleRemoveFormWishlist(product)}
                                        >
                                            Remove
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="primary rounded-5"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Move to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
                        <div className="display-1 text-muted mb-3">🔖</div>
                        <h4 className="mb-2">Your wishlist is empty</h4>
                        <p className="text-muted mb-4">
                            Save products here to view them later.
                        </p>
                        <Button variant="primary" href="/products" className="px-4">
                            Add Products
                        </Button>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default Wishlist;
