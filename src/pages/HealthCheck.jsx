import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { FiActivity, FiRefreshCw, FiServer, FiClock, FiCheck, FiX, FiWifi } from 'react-icons/fi';
import { PessoaService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './HealthCheck.css';

const HealthCheck = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const verificarHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startTime = Date.now();
      const data = await PessoaService.verificarHealth();
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      setHealthData({
        ...data,
        responseTime,
        timestamp: new Date().toISOString()
      });
      
      setLastCheck(new Date());
      
    } catch (err) {
      console.error('Erro ao verificar health:', err);
      setError(err);
      setHealthData(null);
      setLastCheck(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar health ao montar o componente
  useEffect(() => {
    verificarHealth();
  }, [verificarHealth]);

  // Auto-refresh a cada 30 segundos
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      verificarHealth();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [autoRefresh, verificarHealth]);

  const handleRefresh = () => {
    verificarHealth();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(prev => !prev);
  };

  const getStatusColor = () => {
    if (error) return 'danger';
    if (healthData) return 'success';
    return 'secondary';
  };

  const getStatusText = () => {
    if (error) return 'Offline';
    if (healthData) return 'Online';
    return 'Verificando...';
  };

  const getResponseTimeColor = (time) => {
    if (time < 200) return 'success';
    if (time < 500) return 'warning';
    return 'danger';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Nunca';
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  const formatLastCheck = (date) => {
    if (!date) return 'Nunca';
    
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return `${diff} segundos atrás`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutos atrás`;
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="health-check-page">
      <Container>
        {/* Header */}
        <Row className="page-header">
          <Col xs={12}>
            <div className="header-content">
              <div className="header-info">
                <h1 className="page-title">
                  <FiActivity className="title-icon" />
                  Status da API
                </h1>
                <p className="page-subtitle">
                  Monitoramento em tempo real da API REST
                </p>
              </div>
              
              <div className="header-actions">
                <Button
                  variant={autoRefresh ? 'success' : undefined}
                  onClick={toggleAutoRefresh}
                  className={autoRefresh ? 'auto-refresh-button' : 'btn-outline-custom auto-refresh-button'}
                >
                  <FiWifi className="me-2" />
                  Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
                </Button>
                
                <Button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="btn-outline-custom refresh-button"
                >
                  <FiRefreshCw className={`me-2 ${loading ? 'spinning' : ''}`} />
                  Atualizar
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Status Cards */}
        <Row className="status-section">
          {/* Main Status Card */}
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="card-custom status-card main-status">
              <Card.Body>
                <div className="status-header">
                  <FiServer className="status-icon" />
                  <div className="status-info">
                    <h5 className="status-title">Status da API</h5>
                    <Badge bg={getStatusColor()} className="status-badge">
                      {loading ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" />
                          Verificando...
                        </>
                      ) : (
                        <>
                          {error ? <FiX className="me-1" /> : <FiCheck className="me-1" />}
                          {getStatusText()}
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
                
                <div className="status-details">
                  <div className="detail-item">
                    <span className="detail-label">Endpoint:</span>
                    <span className="detail-value">
                      {import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'}
                    </span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="detail-label">Última verificação:</span>
                    <span className="detail-value">
                      {formatLastCheck(lastCheck)}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Response Time Card */}
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Card className="card-custom status-card">
              <Card.Body>
                <div className="status-header">
                  <FiClock className="status-icon" />
                  <div className="status-info">
                    <h5 className="status-title">Tempo de Resposta</h5>
                    {healthData && (
                      <Badge bg={getResponseTimeColor(healthData.responseTime)} className="status-badge">
                        {healthData.responseTime}ms
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="response-time-details">
                  {healthData ? (
                    <>
                      <div className="response-bar">
                        <div 
                          className="response-fill"
                          style={{ 
                            width: `${Math.min((healthData.responseTime / 1000) * 100, 100)}%`,
                            backgroundColor: healthData.responseTime < 200 ? 'var(--success)' : 
                                           healthData.responseTime < 500 ? 'var(--warning)' : 'var(--error)'
                          }}
                        />
                      </div>
                      <div className="response-labels">
                        <span>Rápido</span>
                        <span>Lento</span>
                      </div>
                    </>
                  ) : (
                    <div className="no-data">
                      {loading ? 'Medindo...' : 'Sem dados'}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Health Details Card */}
          <Col xs={12} lg={4} className="mb-4">
            <Card className="card-custom status-card">
              <Card.Body>
                <div className="status-header">
                  <FiActivity className="status-icon" />
                  <div className="status-info">
                    <h5 className="status-title">Detalhes</h5>
                  </div>
                </div>
                
                <div className="health-details">
                  {healthData ? (
                    <>
                      {healthData.status && (
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value">{healthData.status}</span>
                        </div>
                      )}
                      
                      {healthData.timestamp && (
                        <div className="detail-item">
                          <span className="detail-label">Timestamp:</span>
                          <span className="detail-value">
                            {formatTimestamp(healthData.timestamp)}
                          </span>
                        </div>
                      )}
                      
                      {healthData.version && (
                        <div className="detail-item">
                          <span className="detail-label">Versão:</span>
                          <span className="detail-value">{healthData.version}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="no-data">
                      {loading ? 'Carregando...' : 'Dados indisponíveis'}
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Error Alert */}
        {error && (
          <Row>
            <Col xs={12}>
              <Alert variant="danger" className="error-alert">
                <div className="error-content">
                  <FiX className="error-icon" />
                  <div className="error-text">
                    <strong>Falha na conexão com a API</strong>
                    <p className="error-message">
                      {error.message || 'Não foi possível conectar com a API. Verifique se o servidor está rodando.'}
                    </p>
                    {error.status === 0 && (
                      <p className="error-help">
                        Certifique-se de que a API está rodando em <code>http://localhost:8080</code>
                      </p>
                    )}
                  </div>
                </div>
              </Alert>
            </Col>
          </Row>
        )}

        {/* Info Alert */}
        <Row>
          <Col xs={12}>
            <Alert variant="info" className="info-alert">
              <div className="info-content">
                <FiActivity className="info-icon" />
                <div className="info-text">
                  <strong>Monitoramento Automático</strong>
                  <p>
                    Esta página verifica automaticamente o status da API a cada 30 segundos quando o auto-refresh está ativado.
                    Use o botão "Atualizar" para verificar manualmente.
                  </p>
                </div>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HealthCheck;