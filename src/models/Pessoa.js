/**
 * Modelo de dados para Pessoa
 */

/**
 * @typedef {Object} Pessoa
 * @property {number} [id] - ID da pessoa (opcional para criação)
 * @property {string} nome - Nome da pessoa
 * @property {string} email - Email da pessoa
 * @property {string} telefone - Telefone da pessoa no formato (XX) XXXXX-XXXX
 * @property {'Masculino'|'Feminino'|'Não Informado'} genero - Gênero da pessoa
 * @property {string} dataNascimento - Data de nascimento no formato YYYY-MM-DD
 */

/**
 * @typedef {Object} PessoaFormState
 * @property {Pessoa} pessoa - Dados da pessoa
 * @property {boolean} loading - Estado de carregamento
 * @property {Object<string, string>} errors - Erros de validação por campo
 * @property {boolean} isValid - Se o formulário é válido
 */

/**
 * @typedef {Object} ApiResponse
 * @template T
 * @property {T} data - Dados da resposta
 * @property {number} status - Status HTTP
 * @property {string} [message] - Mensagem opcional
 */

/**
 * @typedef {Object} ApiError
 * @property {string} message - Mensagem de erro
 * @property {number} status - Status HTTP do erro
 * @property {any} [details] - Detalhes adicionais do erro
 */

/**
 * Gêneros aceitos pela API
 */
export const GENEROS = {
  MASCULINO: 'Masculino',
  FEMININO: 'Feminino',
  NAO_INFORMADO: 'Não Informado'
};

/**
 * Lista de gêneros para uso em formulários
 */
export const GENEROS_OPCOES = [
  { value: GENEROS.MASCULINO, label: 'Masculino' },
  { value: GENEROS.FEMININO, label: 'Feminino' },
  { value: GENEROS.NAO_INFORMADO, label: 'Não Informado' }
];

/**
 * Cria uma nova instância de Pessoa com valores padrão
 * @returns {Pessoa} Nova pessoa com valores padrão
 */
export const criarPessoaVazia = () => ({
  nome: '',
  email: '',
  telefone: '',
  genero: GENEROS.NAO_INFORMADO,
  dataNascimento: ''
});

/**
 * Cria um estado inicial para formulário de pessoa
 * @param {Pessoa} [pessoa] - Pessoa inicial (opcional)
 * @returns {PessoaFormState} Estado inicial do formulário
 */
export const criarFormStateInicial = (pessoa = null) => ({
  pessoa: pessoa || criarPessoaVazia(),
  loading: false,
  errors: {},
  isValid: false
});