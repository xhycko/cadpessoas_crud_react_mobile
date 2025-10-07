# Design

## Visão Geral

SPA React mobile-first para CRUD pessoas via API REST. Bootstrap 5.

## Arquitetura

```mermaid
graph TB
    A[React App] -->|HTTP| B[API REST]
    B --> C[H2 DB]
    
    subgraph "Frontend"
        D[Components]
        E[Services]
        F[Hooks]
    end
```

### Stack

- React 18 + Vite
- Bootstrap 5 + CSS customizado
- Axios
- React Router

## Componentes

### Hierarquia
```
App
├── Layout (Header/Footer)
├── Pages (List/Add/Edit/Health)
└── Shared (PersonCard/PersonForm/Loading/Error)
```

### Componentes Principais

#### PersonCard
- Avatar por gênero
- Nome, email, data nascimento
- Botões editar/excluir

#### PersonForm
- Campos: nome, email, telefone, gênero, data
- Validação em tempo real
- Botões salvar/cancelar

### API Service
```javascript
class PessoaService {
  static async listarPessoas()
  static async buscarPessoa(id)
  static async criarPessoa(pessoa)
  static async atualizarPessoa(id, pessoa)
  static async removerPessoa(id)
  static async verificarHealth()
}
```

## Modelos de Dados

```typescript
interface Pessoa {
  id?: number;
  nome: string;
  email: string;
  telefone?: string; // (XX) XXXXX-XXXX
  genero: 'Masculino' | 'Feminino' | 'Não Informado';
  dataNascimento: string; // YYYY-MM-DD
}
```

## Tratamento de Erros

- Rede: "Erro de conexão"
- Validação: Mensagens por campo
- API: Exibir mensagem retornada
- Toast notifications

## Testes

- Jest: Framework testes
- React Testing Library: Componentes
- MSW: Mock API