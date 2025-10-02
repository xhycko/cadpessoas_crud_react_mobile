import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FiAlertCircle, FiRefreshCw, FiX } from 'react-icons/fi';
import './ErrorMessage.css';

const ErrorMessage = ({ 
  error, 
  onRetry, 
  onDismiss, 
  variant = 'danger',
  showIcon = true,
  dismissible = true 
}) => {
  if (!error) return null;

  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    return 'Ocorreu um erro inesperado';
  };

  const getErrorDetails = () => {
    if (error.status === 0) {
      return 'Verifique se a API está rodando em http://localhost:8080';
    }
    if (error.status >= 500) {
      return 'Erro interno do servidor. Tente novamente em alguns instantes.';
    }
    if (error.status === 404) {
      return 'Recurso não encontrado.';
    }
    if (error.status >= 400 && error.status < 500) {
      return 'Verifique os dados informados.';
    }
    return null;
  };

  return (
    <Alert 
      variant={variant} 
      dismissible={dismissible && onDismiss}
      onClose={onDismiss}
      className="custom-error-alert fade-in"
    >
      <div className="error-content">
        {showIcon && (
          <div className="error-icon">
            <FiAlertCircle />
          </div>
        )}
        
        <div className="error-text">
          <div className="error-message">
            {getErrorMessage()}
          </div>
          
          {getErrorDetails() && (
            <div className="error-details">
              {getErrorDetails()}
            </div>
          )}
        </div>
        
        <div className="error-actions">
          {onRetry && (
            <Button
              variant="outline-light"
              size="sm"
              onClick={onRetry}
              className="retry-button"
            >
              <FiRefreshCw className="me-1" />
              Tentar Novamente
            </Button>
          )}
          
          {dismissible && onDismiss && (
            <Button
              variant="link"
              size="sm"
              onClick={onDismiss}
              className="dismiss-button"
            >
              <FiX />
            </Button>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default ErrorMessage;