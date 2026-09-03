// import required node modules
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Check } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// import required actions
import { addItemToWishlist } from 'store/slice/WishlistSlice';
import { addItemToCart } from "../store/slice/CartSlice";   //  import cart action

const Products = () => {
    const dispatch = useDispatch();

    //  ensure arrays (prevents undefined.some error)
    const { wishlistItems = [] } = useSelector((state) => state.wishlist || {});
    const { cartItems = [] } = useSelector((state) => state.cart || {});

    const [products, setProducts] = useState([]);  //  will store fetched products
    const [itemsPerPage] = useState(6);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
    };

    // fetch products from API
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(data => setProducts(data.products)); // API gives {products: []}
    }, []);

    // Wishlist button
    const AddToWishlistButton = ({ product }) => {
        const found = wishlistItems.some((item) => item.productID === product.id);

        const handleAddToWishlist = (product) => {
            if (found) {
                toast.error("Already in wishlist")
            } else {
                dispatch(addItemToWishlist(product))
                toast.success("Added to wishlist")
            }
        }

        return (
            <Button size='sm' variant='outline-success' onClick={() => handleAddToWishlist(product)}>
                {found && <Check size={20} />}
                Add To Wishlist
            </Button>
        )
    }

    // Cart button
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
            <Button size='sm' variant='outline-primary' onClick={() => handleAddToCart(product)}>
                {found && <Check size={20} />}
                Add To Cart
            </Button>
        )
    }

    return (
        <Container className='p2 pt-3 '>
            <Row>
                <Col md={12} className="d-flex justify-content-end  ">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </Col>
            </Row>
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
        </Container>
    )
}

export default Products
