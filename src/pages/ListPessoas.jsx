import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiRefreshCw, FiUsers } from 'react-icons/fi';
import { PessoaService } from '../services/api';
import PersonCard from '../components/forms/PersonCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToast } from '../components/common/Toast';
import './ListPessoas.css';

const ListPessoas = () => {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, pessoa: null });
  const [deletingId, setDeletingId] = useState(null);
  
  const { showSuccess, showError } = useToast();

  // Carregar pessoas ao montar o componente
  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PessoaService.listarPessoas();
      setPessoas(data);
    } catch (err) {
      setError(err);
      showError('Erro ao carregar lista de pessoas');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (pessoa) => {
    setDeleteDialog({ show: true, pessoa });
  };

  const handleDeleteConfirm = async () => {
    const { pessoa } = deleteDialog;
    
    try {
      setDeletingId(pessoa.id);
      await PessoaService.removerPessoa(pessoa.id);
      
      // Remove a pessoa da lista local
      setPessoas(prev => prev.filter(p => p.id !== pessoa.id));
      
      showSuccess(`${pessoa.nome} foi removido(a) com sucesso`);
      setDeleteDialog({ show: false, pessoa: null });
    } catch (err) {
      showError(`Erro ao remover ${pessoa.nome}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ show: false, pessoa: null });
  };

  const handleRetry = () => {
    carregarPessoas();
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner 
          size="lg" 
          text="Carregando pessoas..." 
          centered 
        />
      </Container>
    );
  }

  return (
    <div className="list-pessoas-page">
      <Container>
        {/* Header */}
        <Row className="page-header">
          <Col xs={12}>
            <div className="header-content">
              <div className="header-info">
                <h1 className="page-title">
                  <FiUsers className="title-icon" />
                  Pessoas Cadastradas
                </h1>
                <p className="page-subtitle">
                  {pessoas.length === 0 
                    ? 'Nenhuma pessoa cadastrada' 
                    : `${pessoas.length} pessoa${pessoas.length !== 1 ? 's' : ''} encontrada${pessoas.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              
              <div className="header-actions">
                <Button
                  onClick={handleRetry}
                  disabled={loading}
                  className="btn-outline-custom refresh-button"
                >
                  <FiRefreshCw className="me-2" />
                  Atualizar
                </Button>
                
                <Button
                  as={Link}
                  to="/pessoas/novo"
                  className="btn-primary-gradient add-button"
                >
                  <FiPlus className="me-2" />
                  Adicionar Pessoa
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Error Message */}
        {error && (
          <Row>
            <Col xs={12}>
              <ErrorMessage 
                error={error}
                onRetry={handleRetry}
                onDismiss={() => setError(null)}
              />
            </Col>
          </Row>
        )}

        {/* Content */}
        <Row>
          <Col xs={12}>
            {pessoas.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <FiUsers />
                </div>
                <h3 className="empty-title">
                  Nenhuma pessoa cadastrada
                </h3>
                <p className="empty-description">
                  Comece adicionando a primeira pessoa ao sistema.
                </p>
                <Button
                  as={Link}
                  to="/pessoas/novo"
                  size="lg"
                  className="btn-primary-gradient empty-action"
                >
                  <FiPlus className="me-2" />
                  Adicionar Primeira Pessoa
                </Button>
              </div>
            ) : (
              <div className="pessoas-grid">
                {pessoas.map((pessoa) => (
                  <PersonCard
                    key={pessoa.id}
                    pessoa={pessoa}
                    onDelete={handleDeleteClick}
                    loading={deletingId === pessoa.id}
                  />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        show={deleteDialog.show}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        message={
          deleteDialog.pessoa 
            ? `Tem certeza que deseja excluir "${deleteDialog.pessoa.nome}"? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        loading={deletingId !== null}
      />
    </div>
  );
};

export default ListPessoas;