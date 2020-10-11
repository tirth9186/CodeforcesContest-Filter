import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function CustomNavbar({ user, isAdmin, logout }) {
    return (
        <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">CFPractice</Navbar.Brand>
            <Navbar.Toggle aria-controls="basicnavbar" />
            <Navbar.Collapse id="basicnavbar">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/contests">Contests</Nav.Link>
                    <Nav.Link href="/problems">Problems</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;