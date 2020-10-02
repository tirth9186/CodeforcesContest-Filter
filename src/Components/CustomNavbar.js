import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function CustomNavbar({ user, isAdmin, logout }) {
    return (
        <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">CFhelper</Navbar.Brand>
            <Navbar.Toggle aria-controls="basicnavbar" />
            <Navbar.Collapse id="basicnavbar">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/contests">Contests</Nav.Link>
                    <Nav.Link href="/problems">Problems</Nav.Link>
                    {isAdmin && <Nav.Link href="/admin">Admin Panel</Nav.Link>}
                    {user ? (
                        <Nav >
                            <Nav.Link href="/profile">{user.username}</Nav.Link>
                            <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        )}
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button >Search</Button>
                </Form> */}

            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;