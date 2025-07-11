import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Header(){

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <Navbar className="bg-body-tertiary" expand="lg">
            <Container>
                <Navbar.Brand href="/">ProdManager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Products</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                    </Nav>
                    {isLoggedIn ? (
                        <Button variant="outline-danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Nav.Link href="/login"><Button variant="outline-success">Login</Button></Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}