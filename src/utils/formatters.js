/**
 * Utilitários de formatação
 */

/**
 * Formata uma data para exibição em português brasileiro
 * @param {string} dataString - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada DD/MM/YYYY
 */
export const formatarData = (dataString) => {
  if (!dataString) return '';
  
  try {
    const data = new Date(dataString + 'T00:00:00'); // Evita problemas de timezone
    return data.toLocaleDateString('pt-BR');
  } catch (error) {
    return dataString;
  }
};

/**
 * Converte data do formato DD/MM/YYYY para YYYY-MM-DD
 * @param {string} dataBR - Data no formato DD/MM/YYYY
 * @returns {string} Data no formato YYYY-MM-DD
 */
export const converterDataParaISO = (dataBR) => {
  if (!dataBR) return '';
  
  const partes = dataBR.split('/');
  if (partes.length !== 3) return dataBR;
  
  const [dia, mes, ano] = partes;
  return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
};

/**
 * Aplica máscara de telefone brasileiro
 * @param {string} telefone - Telefone sem formatação
 * @returns {string} Telefone formatado
 */
export const aplicarMascaraTelefone = (telefone) => {
  if (!telefone) return '';
  
  // Remove tudo que não é número
  const numeros = telefone.replace(/\D/g, '');
  
  // Aplica a máscara baseada no tamanho
  if (numeros.length <= 2) {
    return `(${numeros}`;
  } else if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  } else if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  } else {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  }
};

/**
 * Remove formatação do telefone
 * @param {string} telefone - Telefone formatado
 * @returns {string} Apenas números
 */
export const removerMascaraTelefone = (telefone) => {
  if (!telefone) return '';
  return telefone.replace(/\D/g, '');
};

/**
 * Formata nome para exibição (primeira letra maiúscula)
 * @param {string} nome - Nome para formatar
 * @returns {string} Nome formatado
 */
export const formatarNome = (nome) => {
  if (!nome) return '';
  
  return nome
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
};

/**
 * Trunca texto se for muito longo
 * @param {string} texto - Texto para truncar
 * @param {number} limite - Limite de caracteres
 * @returns {string} Texto truncado
 */
export const truncarTexto = (texto, limite = 50) => {
  if (!texto) return '';
  
  if (texto.length <= limite) return texto;
  
  return texto.substring(0, limite).trim() + '...';
};

/**
 * Gera iniciais do nome para avatar
 * @param {string} nome - Nome completo
 * @returns {string} Iniciais (máximo 2 caracteres)
 */
export const gerarIniciais = (nome) => {
  if (!nome) return '??';
  
  const palavras = nome.trim().split(' ');
  
  if (palavras.length === 1) {
    return palavras[0].substring(0, 2).toUpperCase();
  }
  
  return (palavras[0].charAt(0) + palavras[palavras.length - 1].charAt(0)).toUpperCase();
};