import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import { PessoaService } from '../services/api';
import PersonForm from '../components/forms/PersonForm';
import { useToast } from '../components/common/Toast';
import './AddPessoa.css';

const AddPessoa = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (pessoaData) => {
    try {
      setLoading(true);
      
      // Criar a pessoa via API
      const novaPessoa = await PessoaService.criarPessoa(pessoaData);
      
      showSuccess(`${novaPessoa.nome} foi adicionado(a) com sucesso!`);
      
      // Redirecionar para a lista após sucesso
      navigate('/pessoas');
      
    } catch (error) {
      console.error('Erro ao criar pessoa:', error);
      showError(
        error.message || 'Erro ao adicionar pessoa. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/pessoas');
  };

  return (
    <div className="add-pessoa-page">
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
                  <FiUserPlus className="title-icon" />
                  Adicionar Nova Pessoa
                </h1>
                <p className="page-subtitle">
                  Preencha os dados abaixo para cadastrar uma nova pessoa
                </p>
              </div>
            </div>
          </Col>
        </Row>

        {/* Form */}
        <Row className="form-section">
          <Col xs={12}>
            <PersonForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={loading}
              submitText="Adicionar Pessoa"
              title="Dados da Nova Pessoa"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPessoa;