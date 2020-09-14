import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Nav,Form,FormControl,Button } from 'react-bootstrap';
 
function CustomNavbar() {
    return (
        <Navbar bg="secondary" expand="lg">
            <Navbar.Brand href="/">CFhelper</Navbar.Brand>
            <Navbar.Toggle aria-controls="basicnavbar" />
            <Navbar.Collapse id="basicnavbar">
                <Nav className="mr-auto">
                    <Nav.Link  href="/">Home</Nav.Link>
                    <Nav.Link href="/contests">Contests</Nav.Link>
                    <Nav.Link href="/problems">Problems</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button >Search</Button>
                </Form>
            </Navbar.Collapse>
       </Navbar> 
    );
};

export default CustomNavbar;