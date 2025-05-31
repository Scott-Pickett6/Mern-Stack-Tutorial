import React from "react";
import Header from "../Components/Header";
import EmptyComponent from "../Components/EmptyComponent";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";

export default function Products() {

    const sampleProducts = [
        { id: 1, name: "Product 1", price: "$10" }
    ]

    return (
        <>
            <Header />
            <Container className="mt-4">
                <div className="d-flex justify-content-end mb-4">
                    {/* <AddProduct /> */}
                </div>

                {sampleProducts.length === 0 ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "200px" }}
                    >
                        <EmptyComponent message="We're currently out of stock" />
                    </div>
                ) : (
                    <Row className="g-4">
                        {sampleProducts.map((product) => (
                            <Col key={product.id} xs={12} sm={6} md={3} lg={3}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}