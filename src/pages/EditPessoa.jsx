import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit } from 'react-icons/fi';
import { PessoaService } from '../services/api';
import PersonForm from '../components/forms/PersonForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useToast } from '../components/common/Toast';
import './EditPessoa.css';

const EditPessoa = () => {
  const [pessoa, setPessoa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  // Carregar dados da pessoa ao montar o componente
  useEffect(() => {
    carregarPessoa();
  }, [id]);

  const carregarPessoa = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const pessoaData = await PessoaService.buscarPessoa(id);
      setPessoa(pessoaData);
      
    } catch (err) {
      console.error('Erro ao carregar pessoa:', err);
      setError(err);
      
      if (err.status === 404) {
        showError('Pessoa não encontrada');
        navigate('/pessoas');
      } else {
        showError('Erro ao carregar dados da pessoa');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (pessoaData) => {
    try {
      setSaving(true);
      
      // Atualizar a pessoa via API
      const pessoaAtualizada = await PessoaService.atualizarPessoa(id, pessoaData);
      
      showSuccess(`${pessoaAtualizada.nome} foi atualizado(a) com sucesso!`);
      
      // Redirecionar para a lista após sucesso
      navigate('/pessoas');
      
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
      showError(
        error.message || 'Erro ao atualizar pessoa. Tente novamente.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/pessoas');
  };

  const handleRetry = () => {
    carregarPessoa();
  };

  if (loading) {
    return (
      <div className="edit-pessoa-page">
        <Container>
          <LoadingSpinner 
            size="lg" 
            text="Carregando dados da pessoa..." 
            centered 
          />
        </Container>
      </div>
    );
  }

  if (error && !pessoa) {
    return (
      <div className="edit-pessoa-page">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="error-container">
                <Button
                  as={Link}
                  to="/pessoas"
                  className="btn-outline-custom back-button mb-3"
                >
                  <FiArrowLeft className="me-2" />
                  Voltar para Lista
                </Button>
                
                <ErrorMessage 
                  error={error}
                  onRetry={handleRetry}
                  onDismiss={() => setError(null)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div className="edit-pessoa-page">
      <Container>
        {/* Header */}
        <Row className="page-header">
          <Col xs={12}>
            <div className="header-content">
              <Button
                as={Link}
                to="/pessoas"
                className="btn-outline-custom back-button"
              >
                <FiArrowLeft className="me-2" />
                Voltar
              </Button>
              
              <div className="header-info">
                <h1 className="page-title">
                  <FiEdit className="title-icon" />
                  Editar Pessoa
                </h1>
                <p className="page-subtitle">
                  {pessoa ? `Editando dados de ${pessoa.nome}` : 'Carregando...'}
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Form */}
        <Row className="form-section">
          <Col xs={12}>
            {pessoa && (
              <PersonForm
                pessoa={pessoa}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={saving}
                submitText="Salvar Alterações"
                title={`Editando: ${pessoa.nome}`}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditPessoa;