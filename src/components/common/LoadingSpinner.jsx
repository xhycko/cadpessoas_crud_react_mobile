import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary', 
  text = 'Carregando...', 
  centered = true,
  overlay = false 
}) => {
  const spinnerSizes = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' }
  };

  const spinnerVariants = {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    light: 'var(--text-secondary)'
  };

  const spinnerComponent = (
    <div className={`loading-spinner-container ${centered ? 'centered' : ''}`}>
      <div className="loading-spinner-content">
        <Spinner
          animation="border"
          style={{
            ...spinnerSizes[size],
            color: spinnerVariants[variant],
            borderWidth: '2px'
          }}
          className="custom-spinner"
        />
        {text && (
          <div className="loading-text">
            {text}
          </div>
        )}
      </div>
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        {spinnerComponent}
      </div>
    );
  }

  return spinnerComponent;
};

export default LoadingSpinner;