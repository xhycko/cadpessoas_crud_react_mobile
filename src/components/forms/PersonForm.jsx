import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FiSave, FiX, FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { GENEROS_OPCOES, criarPessoaVazia } from '../../models/Pessoa';
import { validarPessoa } from '../../utils/validation';
import { aplicarMascaraTelefone } from '../../utils/formatters';
import './PersonForm.css';

const PersonForm = ({ 
  pessoa = null, 
  onSubmit, 
  onCancel, 
  loading = false,
  submitText = 'Salvar',
  title = 'Formulário de Pessoa'
}) => {
  const [formData, setFormData] = useState(pessoa || criarPessoaVazia());
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Atualiza o formulário quando a pessoa muda (útil para edição)
  useEffect(() => {
    if (pessoa) {
      setFormData(pessoa);
    }
  }, [pessoa]);

  // Valida o formulário em tempo real
  useEffect(() => {
    const newErrors = validarPessoa(formData);
    setErrors(newErrors);
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Marca o campo como tocado
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleTelefoneChange = (e) => {
    const value = e.target.value;
    const maskedValue = aplicarMascaraTelefone(value);
    handleInputChange('telefone', maskedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allFields = ['nome', 'email', 'telefone', 'genero', 'dataNascimento'];
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Verifica se há erros
    const formErrors = validarPessoa(formData);
    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const getFieldError = (field) => {
    return touched[field] && errors[field] ? errors[field] : null;
  };

  const isFieldInvalid = (field) => {
    return touched[field] && errors[field];
  };

  const isFormValid = () => {
    return Object.keys(errors).length === 0 && 
           formData.nome && 
           formData.email && 
           formData.genero && 
           formData.dataNascimento;
  };

  return (
    <div className="person-form-container">
      <div className="form-header">
        <h2 className="form-title">
          <FiUser className="title-icon" />
          {title}
        </h2>
      </div>

      <Form onSubmit={handleSubmit} className="person-form">
        <Row>
          <Col xs={12}>
            <Form.Group className="form-group">
              <Form.Label className="form-label-custom">
                <FiUser className="label-icon" />
                Nome *
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, nome: true }))}
                isInvalid={isFieldInvalid('nome')}
                placeholder="Digite o nome completo"
                className="form-input-custom"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('nome')}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="form-group">
              <Form.Label className="form-label-custom">
                <FiMail className="label-icon" />
                Email *
              </Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                isInvalid={isFieldInvalid('email')}
                placeholder="exemplo@email.com"
                className="form-input-custom"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('email')}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group className="form-group">
              <Form.Label className="form-label-custom">
                <FiPhone className="label-icon" />
                Telefone
              </Form.Label>
              <Form.Control
                type="tel"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                onBlur={() => setTouched(prev => ({ ...prev, telefone: true }))}
                isInvalid={isFieldInvalid('telefone')}
                placeholder="(11) 99999-9999"
                className="form-input-custom"
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('telefone')}
              </Form.Control.Feedback>
              <Form.Text className="form-help">
                Formato: (XX) XXXXX-XXXX (opcional)
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="form-group">
              <Form.Label className="form-label-custom">
                Gênero *
              </Form.Label>
              <div className="radio-group">
                {GENEROS_OPCOES.map((opcao) => (
                  <Form.Check
                    key={opcao.value}
                    type="radio"
                    id={`genero-${opcao.value}`}
                    name="genero"
                    label={opcao.label}
                    value={opcao.value}
                    checked={formData.genero === opcao.value}
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                    onBlur={() => setTouched(prev => ({ ...prev, genero: true }))}
                    className="radio-option"
                    disabled={loading}
                  />
                ))}
              </div>
              {isFieldInvalid('genero') && (
                <div className="invalid-feedback d-block">
                  {getFieldError('genero')}
                </div>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group className="form-group">
              <Form.Label className="form-label-custom">
                <FiCalendar className="label-icon" />
                Data de Nascimento *
              </Form.Label>
              <Form.Control
                type="date"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                onBlur={() => setTouched(prev => ({ ...prev, dataNascimento: true }))}
                isInvalid={isFieldInvalid('dataNascimento')}
                className="form-input-custom"
                disabled={loading}
                max={new Date().toISOString().split('T')[0]} // Não permite datas futuras
              />
              <Form.Control.Feedback type="invalid">
                {getFieldError('dataNascimento')}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Resumo de erros */}
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
          <Alert variant="warning" className="form-errors-alert">
            <strong>Corrija os seguintes erros:</strong>
            <ul className="error-list">
              {Object.entries(errors).map(([field, error]) => (
                touched[field] && (
                  <li key={field}>{error}</li>
                )
              ))}
            </ul>
          </Alert>
        )}

        <div className="form-actions">
          <Button
            type="submit"
            disabled={loading || !isFormValid()}
            className="btn-primary-gradient submit-button"
          >
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                Salvando...
              </>
            ) : (
              <>
                <FiSave className="me-2" />
                {submitText}
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="btn-outline-custom cancel-button"
          >
            <FiX className="me-2" />
            Cancelar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PersonForm;