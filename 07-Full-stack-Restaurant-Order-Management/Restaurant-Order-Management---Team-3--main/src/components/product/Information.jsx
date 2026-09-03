import React, { useState, useEffect, useRef } from "react";

const Information = ({ product, onUpdate, onClose }) => {
  const fileInputRef = useRef(null);
  const formRef = useRef(null); // Added ref for outside click detection

  const [editImage, setEditImage] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStock, setEditStock] = useState(0);
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCode, setEditCode] = useState("");

  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setEditImage(product.image || null);
      setEditTitle(product.title || "");
      setEditStock(product.stock || 0);
      setEditCategory(product.category || "");
      setEditPrice(product.price || "");
      setEditCode(product.id || "");
    }
  }, [product]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!product) return null;

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      image: editImage,
      title: editTitle,
      stock: editStock,
      category: editCategory,
      price: editPrice,
      id: editCode,
    };
    onUpdate(updatedProduct);
    onClose();
  };

  const handleReset = () => {
    setEditImage(product.image || null);
    setEditTitle(product.title || "");
    setEditStock(product.stock || 0);
    setEditCategory(product.category || "");
    setEditPrice(product.price || "");
    setEditCode(product.id || "");
  };

  return (
    <div className="container-fluid p-4 h-100 bg-white border-start">
      <div ref={formRef} className="row justify-content-center">
        <div className="col-lg-10 col-md-10 col-12">
          <h5 className="fw-semibold text-neutral-700 mb-4">Product Information</h5>

          <div className="mb-4 p-3 rounded-2 border">
            <div className="w-100 overflow-hidden rounded-2 mb-3 ratio ratio-16x9">
              <img
                src={product.image}
                alt={product.title}
                className="w-100 h-100 object-fit-cover"
              />
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <p className="fw-medium text-muted mb-1">Product name</p>
                <p className="text-dark fw-medium">{product.title}</p>
              </div>
              <div className="col-6">
                <p className="fw-medium text-muted mb-1">Stock</p>
                <p className={`fw-medium text-${product.stock > 0 ? "primary" : "danger"}`}>
                  {product.stock}
                </p>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <p className="fw-medium text-muted mb-1">Category:</p>
                <p className="text-dark fw-medium">{product.category}</p>
              </div>
              <div className="col-6">
                <p className="fw-medium text-muted mb-1">Unit:</p>
                <p className="text-dark fw-medium">${product.price || "-"}</p>
              </div>
            </div>
          </div>

          <h5 className="fw-semibold text-neutral-700 mb-4">Edit Product</h5>
          <div className="card mb-4 p-3 rounded-2 border">
            <div
              className="w-100 overflow-hidden rounded-2 mb-3 ratio ratio-16x9 border border-2 border-light d-flex justify-content-center align-items-center"
              role="button"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={editImage || product.image}
                alt={product.title}
                className="w-100 h-100 object-fit-cover"
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="d-none"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setEditImage(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <div className="row mb-3">
              <div className="col-md-6 col-12 mb-3">
                <p className="fw-medium text-dark mb-1">Category:</p>
                <input
                  type="text"
                  className="form-control"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <p className="fw-medium text-dark mb-1">Unit (Price):</p>
                <input
                  type="number"
                  className="form-control"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <p className="fw-medium text-dark mb-1">Product name</p>
              <input
                type="text"
                className="form-control"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <p className="fw-medium text-dark mb-1">Stock</p>
              <input
                type="number"
                className="form-control"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <p className="fw-medium text-dark mb-1">Code Product</p>
              <input
                type="text"
                className="form-control"
                value={editCode}
                onChange={(e) => setEditCode(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
            <button
              type="button"
              className="btn  fw-medium w-100 w-md-auto px-4 rounded-pill"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="btn btn-primary w-100 w-md-auto rounded-pill"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
