import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiUsers, FiPlus, FiActivity, FiArrowRight } from 'react-icons/fi';
import './HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: FiUsers,
      title: 'Gerenciar Pessoas',
      description: 'Visualize e gerencie o cadastro de pessoas através de uma interface moderna e responsiva.',
      link: '/pessoas',
      color: 'var(--primary)'
    },
    {
      icon: FiPlus,
      title: 'Adicionar Pessoa',
      description: 'Cadastre novas pessoas com validação em tempo real e feedback visual.',
      link: '/pessoas/novo',
      color: 'var(--secondary)'
    },
    {
      icon: FiActivity,
      title: 'Status da API',
      description: 'Monitore o status e a conectividade com a API REST em tempo real.',
      link: '/health',
      color: 'var(--info)'
    }
  ];

  return (
    <div className="home-page">
      <Container>
        {/* Hero Section */}
        <Row className="hero-section">
          <Col xs={12} className="text-center">
            <div className="hero-content">
              <h1 className="hero-title">
                CRUD de Pessoas com React Mobile
              </h1>
              <p className="hero-subtitle">
                Demonstração da arquitetura REST
              </p>
              <div className="hero-description">
                <p>
                  Aplicação React com consumo de API REST  de forma desacoplada, oferecendo flexibilidade, escalabilidade e reutilização.
                </p>
              </div>
              <div className="hero-actions">
                <Button 
                  as={Link} 
                  to="/pessoas" 
                  size="lg"
                  className="btn-primary-gradient hero-button"
                >
                  Ver Pessoas
                  <FiArrowRight className="ms-2" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="features-section">
          <Col xs={12}>
            <h2 className="section-title text-center mb-4">
              Funcionalidades
            </h2>
          </Col>
          
          {features.map((feature, index) => (
            <Col xs={12} md={6} lg={4} key={index} className="mb-4">
              <Card className="card-custom feature-card h-100">
                <Card.Body className="d-flex flex-column">
                  <div className="feature-icon" style={{ color: feature.color }}>
                    <feature.icon />
                  </div>
                  
                  <Card.Title className="feature-title">
                    {feature.title}
                  </Card.Title>
                  
                  <Card.Text className="feature-description flex-grow-1">
                    {feature.description}
                  </Card.Text>
                  
                  <Button 
                    as={Link} 
                    to={feature.link}
                    className="btn-outline-custom feature-button mt-auto"
                  >
                    Acessar
                    <FiArrowRight className="ms-2" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Architecture Benefits Section */}
        <Row className="benefits-section">
          <Col xs={12}>
            <Card className="card-custom benefits-card">
              <Card.Body>
                <h3 className="benefits-title text-center mb-4">
                  Vantagens da Arquitetura REST
                </h3>
                
                <Row>
                  <Col xs={12} md={6}>
                    <div className="benefit-item">
                      <h5>🔄 Desacoplamento</h5>
                      <p>Frontend e backend evoluem independentemente</p>
                    </div>
                    
                    <div className="benefit-item">
                      <h5>📱 Múltiplos Clientes</h5>
                      <p>Uma API pode servir web, mobile e desktop</p>
                    </div>
                    
                    <div className="benefit-item">
                      <h5>⚡ Escalabilidade</h5>
                      <p>Escale frontend e backend separadamente</p>
                    </div>
                  </Col>
                  
                  <Col xs={12} md={6}>
                    <div className="benefit-item">
                      <h5>🛠️ Flexibilidade Tecnológica</h5>
                      <p>Use diferentes tecnologias para cada camada</p>
                    </div>
                    
                    <div className="benefit-item">
                      <h5>🧪 Testabilidade</h5>
                      <p>Teste frontend e backend isoladamente</p>
                    </div>
                    
                    <div className="benefit-item">
                      <h5>🔒 Segurança</h5>
                      <p>Padronização HTTP e melhores práticas</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;