import React, { useState } from "react";
import { Form, InputGroup, Button, Col, Row, Container } from "react-bootstrap";
import ProductData from "../data/product/ProductData";
import AddProduct from "../components/product/Addproduct";
import Information from "../components/product/Information";
import PlusIcon from "../assets/image/icon/plus.svg";
import SearchIcon from "../assets/image/icon/search.svg";
import "../assets/scss/modules/_product.scss"
import { BsThreeDotsVertical } from "react-icons/bs";

const Product = () => {
  const [products, setProducts] = useState(ProductData);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Main Course");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  //   const [hoveredProduct, setHoveredProduct] = useState(null);

  const productsPerPage = 6;

  const filteredProducts = products.filter((product) => {
    const name = product.title?.toLowerCase() || "";
    const id = product.id?.toString().toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    if (activeTab === "All") {
      return name.includes(search) || id.includes(search);
    } else {
      return (
        (name.includes(search) || id.includes(search)) &&
        product.category === activeTab
      );
    }
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handleSaveProduct = (newProduct) => {
    setProducts([{ id: products.length + 1, ...newProduct }, ...products]);
    setShowAddProduct(false);
  };

  return (
    <Container fluid className=" h-100 overflow-y-auto hide-scrollbar products-page">
      <Row>
        <Col
          className={`${showAddProduct || selectedProduct
            ? "col-lg-9 col-md-8 col-12 order-1 order-md-0"
            : "col-12"
            } py-4`}
        >

          <Row className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 mt-4">
            <Col lg={6}>
              <h3 className="fw-semibold text-neutral-700 ">Products Management</h3>
            </Col>
            <Col lg={6} className="d-flex  align-items-center gap-2 ">

              <div className="d-flex flex-grow-1">
                <InputGroup className="rounded-sm w-0">
                  <InputGroup.Text className="bg-transparent rounded-lg justify-content-center">
                    <img src={SearchIcon} alt="search" />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </InputGroup>
              </div>


              <Button
                className={`d-inline-flex align-items-center border-0 gap-2 p-3 rounded-pill fw-medium fs-title ${showAddProduct
                  ? "bg-brand-50 text-brand-300"
                  : "bg-transparent text-muted"
                  }`}
                onClick={() => {
                  setShowAddProduct(true);
                  setSelectedProduct(null);
                }}
              >
                <img src={PlusIcon} alt="plus" className="w-4 h-4" />
                <span className="d-inline text-nowrap">Add new menu</span>
              </Button>
            </Col>


          </Row>


          <div className="bg-neutral-100 overflow-x-auto hide-scrollbar rounded-pill mb-4 p-1">
            <div className="d-flex flex-nowrap gap-2">
              {["All", "Main Course", "Appetizer", "Dessert", "Beverage"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`flex-grow-1 rounded-pill border-0 p-2 text-nowrap ${activeTab === tab
                      ? "text-neutral-700 bg-white"
                      : "text-neutral-400 bg-transparent"
                      }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setCurrentPage(1);
                    }}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
          </div>


          <div className="card rounded-2 border-neutral-50 flex-column">
            <div className="table-responsive flex-fill">
              <table className="table align-middle mb-0 border border-neutral-50   " >
                <thead>
                  <tr>
                    <th colSpan="5" className="p-0 ">
                      <div className="d-flex justify-content-between align-items-center px-3 py-2">
                        <h5 className="fw-semibold mb-0">
                          Products{" "}
                          <span className=" ms-3 text-primary bg-brand-50 rounded-2 ">{filteredProducts.length}</span>
                        </h5>
                        <button className="btn btn-light border-0 p-1">
                          <BsThreeDotsVertical />
                        </button>
                      </div>
                    </th>
                  </tr>
                  <tr className="text-neutral-600 fw-medium">
                    <th className="p-3 w-20" >
                      Product name
                    </th>
                    <th className="p-3 w-15" >
                      Code
                    </th>
                    <th className="p-3 w-20">
                      Category
                    </th>
                    <th className="p-3 w-15" >
                      Stock
                    </th>
                    <th className="p-3  w-5 text-end pe-8">
                      Price
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((item) => (
                      <tr className={`bg-white cursor-pointer 
                         ${selectedProduct?.id === item.id
                          ? "border border-2 border-primary "
                          : null}`}
                        key={item.id}

                        onClick={() => {
                          setSelectedProduct(item);
                          setShowAddProduct(false);
                        }}
                      // onMouseEnter={() => setHoveredProduct(item.id)}
                      // onMouseLeave={() => setHoveredProduct(null)}
                      >
                        <td className="p-3 text-neutral-400 fw-medium py-4">
                          {item.title}
                        </td>
                        <td className="p-3 text-neutral-400 fw-medium">
                          #{item.id}
                        </td>
                        <td className="p-3 text-neutral-400 fw-medium">
                          {item.category}
                        </td>
                        <td className="p-3 fw-medium text-neutral-400">
                          <span
                            className={item.stock > 0 ? "text-primary" : "text-danger"}
                          >
                            {item.stock}
                          </span>
                        </td>
                        <td className="p-3 text-neutral-400 fw-medium text-end pe-8">
                          ${item.price}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted p-3">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="5">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-3 py-2 gap-2">
                        <small className="text-neutral-300">
                          Page <span className="text-neutral-300">{currentPage}</span> of {totalPages}
                        </small>

                        <ul className="pagination mb-0 gap-2">
                          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                              className="page-link rounded-circle"

                              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            >
                              &laquo;
                            </button>
                          </li>

                          {Array.from({ length: totalPages }, (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                            >
                              <button
                                className={`page-link rounded-circle ${currentPage === i + 1 ? "text-white bg-brand-300" : ""
                                  }`}

                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}

                          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                              className="page-link rounded-circle"

                              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            >
                              &raquo;
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tfoot>

              </table>
            </div>
          </div>
        </Col>

        {showAddProduct && (
          <div className="col-lg-3 col-md-4 col-12 mt-4 mt-lg-0">
            <AddProduct
              onCancel={() => setShowAddProduct(false)}
              onSave={handleSaveProduct} 
            />
          </div>
        )}


        {selectedProduct && (
          <div className="col-lg-3 col-md-4 col-12 mt-4 mt-lg-0">
            <Information
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onUpdate={(updated) => {
                setProducts((prev) =>
                  prev.map((p) => (p.id === updated.id ? updated : p))
                );
                setSelectedProduct(updated);
              }}
            />
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Product;
