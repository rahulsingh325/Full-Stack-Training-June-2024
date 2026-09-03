import React, { useState, useRef, useEffect } from "react";

const AddProduct = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    image: "",
    category: "",
    price: "",
    title: "",
    code: "",
    stock: "",
  });

  const formRef = useRef(null);

  const isFormValid =
    formData.image &&
    formData.category &&
    formData.price &&
    formData.title &&
    formData.code &&
    formData.stock;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReset = () => {
    setFormData({
      image: "",
      category: "",
      price: "",
      title: "",
      code: "",
      stock: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSave(formData);
    handleReset();
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onCancel?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCancel]);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-10 col-12">
          <div ref={formRef} className="card shadow-sm p-4">
            <h5 className="mb-4 fw-semibold text-neutral-700">Add product</h5>

            <div className="card mb-4 bg-light border rounded p-3">
              <p className="fw-regular text-muted mb-2">Image</p>
              <div className="card border d-flex align-items-center justify-content-center position-relative overflow-hidden h-200">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                />
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="preview"
                    className="w-100 h-100 object-fit-cover"
                  />
                ) : (
                  <span className="text-muted fw-medium">
                    Upload or drag image
                  </span>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              {/* Category */}
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <p className="fw-regular text-dark">Category</p>
                  <select
                    className="form-select"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                  </select>
                </div>

                {/* Price */}
                <div className="col-md-6 col-12 mb-3">
                  <p className="fw-regular text-dark">Price</p>
                  <select
                    className="form-select"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleChange}
                  >
                    <option value="">$0</option>
                    <option value="10">$10</option>
                    <option value="20">$20</option>
                    <option value="30">$30</option>
                    <option value="40">$40</option>
                  </select>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <p className="fw-regular text-dark">Product Name</p>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Input product name"
                />
              </div>

              {/* Code */}
              <div>
                <p className="fw-regular text-dark">Code Product</p>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  required
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="#####"
                />
              </div>

              {/* Stock */}
              <div>
                <p className="fw-regular text-dark">Stock</p>
                <select
                  className="form-select"
                  name="stock"
                  required
                  value={formData.stock}
                  onChange={handleChange}
                >
                  <option value="">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
                <button
                  type="button"
                  className="btn w-100 w-md-auto px-4"
                  onClick={handleReset}
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className={`btn w-100 w-md-auto px-4 ${
                    isFormValid ? "btn-primary" : "btn-primary"
                  }`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

