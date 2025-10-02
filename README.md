# CRUD React Mobile

Projeto educacional demonstrando as vantagens da arquitetura REST sobre aplicações monolíticas através de uma interface React mobile-first.

## 🎯 Objetivo

Este projeto foi criado para demonstrar na prática como uma aplicação React pode consumir uma API REST de forma desacoplada, evidenciando os benefícios da separação entre frontend e backend.

## 🚀 Tecnologias

- **React 18** - Framework JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Bootstrap 5** - Framework CSS
- **React Bootstrap** - Componentes Bootstrap para React
- **Axios** - Cliente HTTP para API
- **React Icons** - Ícones

## 📱 Características

- **Mobile-First**: Interface otimizada para dispositivos móveis
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Design Moderno**: Sistema de cores inspirado em sites populares
- **Arquitetura REST**: Consome API REST existente
- **Componentização**: Componentes reutilizáveis e modulares

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── common/          # Componentes compartilhados
│   ├── forms/           # Componentes de formulário
│   └── layout/          # Componentes de layout
├── pages/               # Páginas da aplicação
├── services/            # Serviços de API
├── hooks/               # Custom hooks
├── utils/               # Utilitários
├── models/              # Modelos de dados
└── styles/              # Estilos globais
```

## 🔧 Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- API REST rodando em `http://localhost:8080`

### Instalação

1. Clone o repositório
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure a URL da API no arquivo `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

### Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

## Funcionalidades Implementadas

### Concluído

- [x] Estrutura base do projeto React com Vite
- [x] Sistema de roteamento com React Router
- [x] Layout responsivo com header e footer (100% da resolução)
- [x] Sistema de cores e design moderno
- [x] Componentes compartilhados (Loading, Error, Toast, Dialog)
- [x] Serviço de API com tratamento de erros
- [x] Modelos de dados e validação (incluindo telefone)
- [x] Página inicial com apresentação do projeto
- [x] Componentes de pessoa (PersonCard e PersonForm)
- [x] Páginas CRUD completas (Listar, Adicionar, Editar)
- [x] Página de monitoramento da API com auto-refresh
- [x] Integração completa com a API REST
- [x] Cards em formato de lista vertical compacta
- [x] Formulários com campos maiores e mais confortáveis
- [x] CSS refatorado sem duplicações e `!important` excessivo

## Design System

O projeto utiliza um sistema de design moderno com:

- **Cores**: Paleta inspirada no Discord/GitHub
- **Tipografia**: Fonte Inter para melhor legibilidade
- **Componentes**: Bootstrap customizado com tema escuro
- **Animações**: Transições suaves e micro-interações
- **Layout**: 100% da resolução, lista vertical compacta
- **Formulários**: Campos grandes e confortáveis para digitação

## 🔗 API REST

A aplicação consome uma API REST com os seguintes endpoints:

- `GET /api/pessoas` - Listar pessoas
- `GET /api/pessoas/{id}` - Buscar pessoa por ID
- `POST /api/pessoas` - Criar pessoa
- `PUT /api/pessoas/{id}` - Atualizar pessoa
- `DELETE /api/pessoas/{id}` - Remover pessoa
- `GET /api/health` - Status da API

## Vantagens da Arquitetura REST

Este projeto demonstra:

1. **Desacoplamento**: Frontend e backend independentes
2. **Reutilização**: API pode servir múltiplos clientes
3. **Escalabilidade**: Escale cada camada separadamente
4. **Flexibilidade**: Use diferentes tecnologias
5. **Testabilidade**: Teste cada camada isoladamente
6. **Manutenibilidade**: Código mais organizado e modular

