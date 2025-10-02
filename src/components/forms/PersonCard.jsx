import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiMail, FiPhone, FiCalendar, FiUser } from 'react-icons/fi';
import { formatarData, gerarIniciais } from '../../utils/formatters';
import './PersonCard.css';

const PersonCard = ({ pessoa, onDelete, loading = false }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(pessoa);
    }
  };

  const getGeneroColor = (genero) => {
    switch (genero) {
      case 'Masculino':
        return 'primary';
      case 'Feminino':
        return 'success';
      case 'Não Informado':
      default:
        return 'neutral';
    }
  };

  const getGeneroIcon = (genero) => {
    switch (genero) {
      case 'Masculino':
        return '👨';
      case 'Feminino':
        return '👩';
      case 'Não Informado':
      default:
        return '👤';
    }
  };

  return (
    <Card className={`card-custom person-card ${loading ? 'loading' : ''}`}>
      <Card.Body>
        <div className="person-card-header">
          <div className="person-avatar">
            <span className="avatar-text">
              {gerarIniciais(pessoa.nome)}
            </span>
            <span className="avatar-emoji">
              {getGeneroIcon(pessoa.genero)}
            </span>
          </div>
          
          <div className="person-info">
            <Card.Title className="person-name">
              {pessoa.nome}
            </Card.Title>
            
            <Badge 
              bg={getGeneroColor(pessoa.genero)} 
              className="badge-custom genero-badge"
            >
              {pessoa.genero}
            </Badge>
          </div>

          <div className="person-details">
            <div className="detail-item">
              <FiMail className="detail-icon" />
              <span className="detail-text" title={pessoa.email}>
                {pessoa.email}
              </span>
            </div>

            {pessoa.telefone && (
              <div className="detail-item">
                <FiPhone className="detail-icon" />
                <span className="detail-text">
                  {pessoa.telefone}
                </span>
              </div>
            )}

            <div className="detail-item">
              <FiCalendar className="detail-icon" />
              <span className="detail-text">
                {formatarData(pessoa.dataNascimento)}
              </span>
            </div>

            {pessoa.id && (
              <div className="detail-item">
                <FiUser className="detail-icon" />
                <span className="detail-text">
                  ID: {pessoa.id}
                </span>
              </div>
            )}
          </div>

          <div className="person-actions">
            <Button
              as={Link}
              to={`/pessoas/${pessoa.id}/editar`}
              size="sm"
              className="btn-outline-custom action-button edit-button"
              disabled={loading}
            >
              <FiEdit className="me-1" />
              Editar
            </Button>

            <Button
              variant="outline-danger"
              size="sm"
              className="action-button delete-button"
              onClick={handleDelete}
              disabled={loading}
            >
              <FiTrash2 className="me-1" />
              Excluir
            </Button>
          </div>
        </div>
      </Card.Body>

      {loading && (
        <div className="card-loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PersonCard;