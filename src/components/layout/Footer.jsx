import { Container, Row, Col } from 'react-bootstrap';
import { FiCode, FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            <div className="footer-brand">
              <FiCode className="footer-icon" />
              <span className="footer-text">
                CRUD React Mobile
              </span>
            </div>
            <p className="footer-description">
              Projeto educacional demonstrando as vantagens da arquitetura REST
            </p>
            
            <div className="footer-made-with">
              <span>Feito com</span>
              <FiHeart className="heart-icon" />
              <span>para aprendizado</span>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row>
          <Col xs={12} className="text-center">
            <p className="footer-copyright">
              © 2025 - Demonstração React + REST API
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;