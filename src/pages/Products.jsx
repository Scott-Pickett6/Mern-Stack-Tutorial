import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import EmptyComponent from "../Components/EmptyComponent";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct, updateProduct, createProduct } from "../redux/actions/productActions";

// sample images from Unsplash
const initialProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: "59.99",
        banner: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
        description: "High quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: "129.99",
        banner: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
        description: "Track your fitness and notifications on the go."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: "39.99",
        banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        description: "Portable speaker with deep bass and long battery life."
    }
];

export default function Products() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAdd = () => {
        setSelectedProduct(null);
        setIsEdit(false);
        setShowAddProduct(true);
    };

    const handleEdit = (product) => {
        const editProduct = {
            ...product,
            name: product.name || product.title || "",
        };
        setSelectedProduct(editProduct);
        setIsEdit(true);
        setShowAddProduct(true);
    };

    const handleDelete = (product) => {
        dispatch(deleteProduct(product.id));
    };

    const handleClose = () => {
        setShowAddProduct(false);
        setSelectedProduct(null);
        setIsEdit(false);
    };

    const handleProductSubmit = (values, isEditMode) => {
        if (isEditMode && selectedProduct) {
            dispatch(updateProduct(selectedProduct.id, values));
        } else {
            dispatch(createProduct(values));
        }
        handleClose();
    };

    return (
        <>
            <Header />
            <Container className="mt-4">
                <div className="d-flex justify-content-end mb-4">
                    <AddProduct
                        show={showAddProduct}
                        onClose={handleClose}
                        initialValues={selectedProduct}
                        isEdit={isEdit}
                        onSubmit={handleProductSubmit}
                    />
                    <button className="btn btn-primary" onClick={handleAdd}>
                        <i className="bi bi-plus-circle me-2"></i> Add Product
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-5">Loading...</div>
                ) : error ? (
                    <div className="text-danger text-center py-5">{error}</div>
                ) : products.length === 0 ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "200px" }}
                    >
                        <EmptyComponent message="We're currently out of stock" />
                    </div>
                ) : (
                    <Row className="g-4">
                        {products.map((product) => (
                            <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                                <ProductCard
                                    product={product}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}