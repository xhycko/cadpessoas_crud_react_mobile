import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FiAlertTriangle, FiCheck, FiX } from 'react-icons/fi';
import './ConfirmDialog.css';

const ConfirmDialog = ({
  show,
  onHide,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  loading = false
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <FiAlertTriangle className="dialog-icon danger" />;
      case 'warning':
        return <FiAlertTriangle className="dialog-icon warning" />;
      case 'success':
        return <FiCheck className="dialog-icon success" />;
      default:
        return <FiAlertTriangle className="dialog-icon info" />;
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      className="confirm-dialog"
      backdrop={loading ? 'static' : true}
      keyboard={!loading}
    >
      <Modal.Header className="confirm-dialog-header">
        <div className="dialog-header-content">
          {getIcon()}
          <Modal.Title className="dialog-title">
            {title}
          </Modal.Title>
        </div>
      </Modal.Header>
      
      <Modal.Body className="confirm-dialog-body">
        <p className="dialog-message">
          {message}
        </p>
      </Modal.Body>
      
      <Modal.Footer className="confirm-dialog-footer">
        <Button
          variant="outline-secondary"
          onClick={onHide}
          disabled={loading}
          className="cancel-button"
        >
          <FiX className="me-2" />
          {cancelText}
        </Button>
        
        <Button
          variant={getConfirmButtonVariant()}
          onClick={handleConfirm}
          disabled={loading}
          className="confirm-button"
        >
          {loading ? (
            <>
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Processando...
            </>
          ) : (
            <>
              <FiCheck className="me-2" />
              {confirmText}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;