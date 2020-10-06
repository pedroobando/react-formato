import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavbarTop = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Formato
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/salida">
            Salidas
          </Nav.Link>
          <NavDropdown title="Datos" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/datos/persona">
              Personas
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/datos/vehiculo">
              Vehiculos
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/datos/usuario">
              Usuarios
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Pedro</Nav.Link>
          <button className="btn btn-btn-outline-dark btn-sm">Logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
