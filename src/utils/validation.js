import { GENEROS } from "../models/Pessoa.js";

/**
 * Utilitários de validação para formulários
 */

/**
 * Valida se um email tem formato válido
 * @param {string} email - Email para validar
 * @returns {boolean} True se válido
 */
export const isEmailValido = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida se uma data está no formato correto e é válida
 * @param {string} data - Data no formato YYYY-MM-DD
 * @returns {boolean} True se válida
 */
export const isDataValida = (data) => {
  if (!data) return false;

  const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dataRegex.test(data)) return false;

  const dataObj = new Date(data);
  const hoje = new Date();

  // Verifica se a data é válida e não é futura
  return dataObj instanceof Date && !isNaN(dataObj) && dataObj <= hoje;
};

/**
 * Valida se um gênero é válido
 * @param {string} genero - Gênero para validar
 * @returns {boolean} True se válido
 */
export const isGeneroValido = (genero) => {
  return Object.values(GENEROS).includes(genero);
};

/**
 * Valida se um nome é válido
 * @param {string} nome - Nome para validar
 * @returns {boolean} True se válido
 */
export const isNomeValido = (nome) => {
  return nome && nome.trim().length >= 2 && nome.trim().length <= 100;
};

/**
 * Valida se um telefone tem formato válido (brasileiro)
 * @param {string} telefone - Telefone para validar
 * @returns {boolean} True se válido
 */
export const isTelefoneValido = (telefone) => {
  if (!telefone || !telefone.trim()) return true; // Campo opcional

  // Formato brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return telefoneRegex.test(telefone.trim());
};

/**
 * Valida todos os campos de uma pessoa
 * @param {Object} pessoa - Dados da pessoa para validar
 * @returns {Object} Objeto com erros de validação
 */
export const validarPessoa = (pessoa) => {
  const errors = {};

  // Validação do nome
  if (!pessoa.nome || !pessoa.nome.trim()) {
    errors.nome = "Nome é obrigatório";
  } else if (!isNomeValido(pessoa.nome)) {
    errors.nome = "Nome deve ter entre 2 e 100 caracteres";
  }

  // Validação do email
  if (!pessoa.email || !pessoa.email.trim()) {
    errors.email = "Email é obrigatório";
  } else if (!isEmailValido(pessoa.email)) {
    errors.email = "Email deve ter um formato válido";
  }

  // Validação do telefone (opcional)
  if (pessoa.telefone && !isTelefoneValido(pessoa.telefone)) {
    errors.telefone = "Telefone deve ter formato válido: (XX) XXXXX-XXXX";
  }

  // Validação do gênero
  if (!pessoa.genero) {
    errors.genero = "Gênero é obrigatório";
  } else if (!isGeneroValido(pessoa.genero)) {
    errors.genero = "Gênero deve ser uma opção válida";
  }

  // Validação da data de nascimento
  if (!pessoa.dataNascimento) {
    errors.dataNascimento = "Data de nascimento é obrigatória";
  } else if (!isDataValida(pessoa.dataNascimento)) {
    errors.dataNascimento = "Data deve ser válida e não pode ser futura";
  }

  return errors;
};

/**
 * Verifica se uma pessoa é válida (sem erros)
 * @param {Object} pessoa - Dados da pessoa
 * @returns {boolean} True se válida
 */
export const isPessoaValida = (pessoa) => {
  const errors = validarPessoa(pessoa);
  return Object.keys(errors).length === 0;
};
