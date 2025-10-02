import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiUsers, FiPlus, FiActivity, FiHome } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Início', icon: FiHome },
    { path: '/pessoas', label: 'Pessoas', icon: FiUsers },
    { path: '/pessoas/novo', label: 'Adicionar', icon: FiPlus },
    { path: '/health', label: 'Status API', icon: FiActivity },
  ];

  return (
    <>
      <Navbar expand={false} className="custom-navbar" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="brand">
            <FiUsers className="brand-icon" />
            <span className="brand-text">CRUD React</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar" 
            onClick={handleShow}
            className="custom-toggle"
          >
            <FiMenu />
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <Offcanvas 
        show={showOffcanvas} 
        onHide={handleClose} 
        placement="end"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton className="custom-offcanvas-header">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="custom-offcanvas-body">
          <Nav className="flex-column">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                onClick={handleClose}
                className={`custom-nav-link ${isActive(path) ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span>{label}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;