import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../store/slice/CartSlice";
import { addItemToWishlist } from "../store/slice/WishlistSlice";
import { Button, Card } from "react-bootstrap";

const ProductDetail = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Product not found");
                return res.json();
            })
            .then((data) => setItem(data))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <p className="text-danger">{error}</p>;
    if (!item) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <Card className="shadow-lg p-3">
                <div className="row">
                    {/* Product Image */}
                    <div className="col-md-6 d-flex align-items-center">
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="img-fluid rounded"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="col-md-6">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <h4 className="text-success">₹{item.price}</h4>
                        <p>
                            <strong>Brand:</strong> {item.brand}
                        </p>
                        <p>
                            <strong>Category:</strong> {item.category}
                        </p>
                        <p>
                            <strong>Rating:</strong> ⭐ {item.rating}
                        </p>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 mt-3">
                            <Button
                                variant="primary"
                                onClick={() => dispatch(addItemToCart(item))}
                            >
                                🛒 Add to Cart
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => dispatch(addItemToWishlist(item))}
                            >
                                ❤️ Add to Wishlist
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ProductDetail;
