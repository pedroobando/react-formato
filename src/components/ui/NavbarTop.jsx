import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../redux/actions/auth';

export const NavbarTop = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(startLogout());
    history.replace('/auth/login');
    // console.log('logout');
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        Salidas
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/salida">
            Salidas
          </Nav.Link>
          <NavDropdown title="Datos" id="collasible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/datos/departamento">
              Departamento
            </NavDropdown.Item>
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
          <Nav.Link href="#chupas">{name}</Nav.Link>
          <button
            type="button"
            className="btn btn-btn-outline-dark btn-sm"
            onClick={handleLogOut}>
            Logout
          </button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
