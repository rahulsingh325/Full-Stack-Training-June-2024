import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";   // ✅ added Link
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Check } from "lucide-react";

// Redux imports
import { addItemToWishlist } from "../store/slice/WishlistSlice";
import { addItemToCart } from "../store/slice/CartSlice"; // ✅ import cart action

const Category = () => {
    const params = useParams();
    const [Items, setItems] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    // pagination state
    const itemsPerPage = 6;
    const [itemOffset, setItemOffset] = useState(0);

    const formatCategoryName = (slug) => {
        return slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    useEffect(() => {
        fetch("https://dummyjson.com/products/category/" + params.slug)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.products || []);
                if (data.products?.length > 0) {
                    setCategoryName(formatCategoryName(data.products[0].category));
                }
            });
    }, [params.slug]);

    // Redux
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);
    const { cartItems } = useSelector((state) => state.cart);

    // Wishlist Button
    const AddToWishlistButton = ({ product }) => {
        const found = wishlistItems.some((item) => item.productID === product.id);
        const handleAddToWishlist = (product) => {
            if (found) {
                toast.error("Already added to wishlist");
            } else {
                // convert product -> productID format (for slice)
                dispatch(addItemToWishlist({ ...product, productID: product.id }));
                toast.success("Added to wishlist");
            }
        };
        return (
            <Button
                size="sm"
                variant="outline-success"
                onClick={() => handleAddToWishlist(product)}
            >
                {found && <Check size={20} />}
                Add To Wishlist
            </Button>
        );
    };

    // Cart Button
    const AddToCartButton = ({ product }) => {
        const found = cartItems.some((item) => item.productID === product.id);
        const handleAddToCart = (product) => {
            if (found) {
                toast.error("Already in cart")
            } else {
                dispatch(addItemToCart(product))
                toast.success("Added to cart")
            }
        }
        return (
            <Button
                size="sm"
                variant="outline-primary"
                onClick={() => handleAddToCart(product)}
            >{found && <Check size={20} />}
                Add To Cart
            </Button>
        );
    };

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = Items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Items.length;
        setItemOffset(newOffset);
    };

    return (
        <Container>
            <h1>{categoryName}</h1>
            <Row>
                {currentItems?.map((product) => (
                    <Col md={4} key={product.id} className="p-2">
                        <Card className="h-100 shadow-sm product-card d-flex flex-column">
                            <NavLink
                                to={`/product/${product.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                                className="flex-grow-1"
                            >
                                <Card.Img
                                    variant="top"
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="p-2"
                                    style={{ height: "200px", objectFit: "contain" }}
                                />
                                <Card.Body>
                                    <h5 className="fw-bold">{product.title}</h5>
                                    <p className="text-success fw-semibold mb-0">
                                        {new Intl.NumberFormat("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                            minimumFractionDigits: 0,
                                        }).format(product.price)}
                                    </p>
                                </Card.Body>
                            </NavLink>
                            <Card.Footer className="d-flex justify-content-between border-0 mt-auto">
                                <AddToCartButton product={product} />
                                <AddToWishlistButton product={product} />
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {Items.length > itemsPerPage && (
                <Row>
                    <Col md={12}>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            previousLabel="< Prev"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            containerClassName="pagination justify-content-center mt-4"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Category;
