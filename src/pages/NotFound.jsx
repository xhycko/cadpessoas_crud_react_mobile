import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <div className="not-found-content">
              <div className="not-found-icon">
                <span className="error-code">404</span>
              </div>
              
              <h1 className="not-found-title">
                Página não encontrada
              </h1>
              
              <p className="not-found-description">
                A página que você está procurando não existe ou foi movida.
              </p>
              
              <div className="not-found-actions">
                <Button 
                  as={Link} 
                  to="/" 
                  variant="primary"
                  className="me-3 mb-2"
                >
                  <FiHome className="me-2" />
                  Ir para Início
                </Button>
                
                <Button 
                  variant="outline-light"
                  onClick={() => window.history.back()}
                  className="mb-2"
                >
                  <FiArrowLeft className="me-2" />
                  Voltar
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;