import React, { useState, useEffect } from 'react';
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';
import './Toast.css';

// Context para gerenciar toasts globalmente
export const ToastContext = React.createContext();

// Hook para usar toasts
export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};

// Provider de toasts
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'error', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);

  return (
    <ToastContext.Provider value={{
      addToast,
      removeToast,
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <ToastContainer position="top-end" className="custom-toast-container">
        {toasts.map(toast => (
          <CustomToast
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

// Componente de toast individual
const CustomToast = ({ toast, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Aguarda animação
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <FiCheck className="toast-icon success" />;
      case 'error':
        return <FiX className="toast-icon error" />;
      case 'warning':
        return <FiAlertCircle className="toast-icon warning" />;
      case 'info':
      default:
        return <FiInfo className="toast-icon info" />;
    }
  };

  const getToastClass = () => {
    return `custom-toast ${toast.type}`;
  };

  return (
    <BootstrapToast
      show={show}
      onClose={handleClose}
      className={getToastClass()}
      autohide={false}
    >
      <BootstrapToast.Header className="toast-header">
        {getIcon()}
        <strong className="toast-title">
          {toast.type === 'success' && 'Sucesso'}
          {toast.type === 'error' && 'Erro'}
          {toast.type === 'warning' && 'Atenção'}
          {toast.type === 'info' && 'Informação'}
        </strong>
        <button
          type="button"
          className="btn-close toast-close"
          onClick={handleClose}
          aria-label="Fechar"
        />
      </BootstrapToast.Header>
      <BootstrapToast.Body className="toast-body">
        {toast.message}
      </BootstrapToast.Body>
    </BootstrapToast>
  );
};

export default CustomToast;