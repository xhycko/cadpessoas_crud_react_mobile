import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      
      <main className="main-content">
        <Container fluid className="content-container">
          {children}
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;