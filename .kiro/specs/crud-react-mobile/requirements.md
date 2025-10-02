# Requirements Document

## Introduction

Este projeto visa criar um front-end React mobile-first para demonstrar as vantagens práticas de uma arquitetura REST sobre uma aplicação monolítica. O front-end será responsivo, otimizado para celular, e consumirá uma API REST existente para operações CRUD de cadastro de pessoas. O objetivo é manter a mesma funcionalidade do sistema monolítico existente, mas com uma interface visual moderna e diferenciada que destaque os benefícios da separação de responsabilidades.

## Requirements

### Requirement 1

**User Story:** Como um estudante de desenvolvimento web, eu quero visualizar uma interface mobile-first moderna que consuma uma API REST, para que eu possa entender as vantagens da arquitetura desacoplada.

#### Acceptance Criteria

1. WHEN o usuário acessa a aplicação no browser do celular THEN o sistema SHALL exibir uma interface responsiva otimizada para dispositivos móveis
2. WHEN a aplicação carrega THEN o sistema SHALL fazer requisições HTTP à API REST para obter dados
3. IF a aplicação está rodando em um celular THEN o sistema SHALL adaptar automaticamente o layout para tela pequena
4. WHEN o usuário interage com a interface THEN o sistema SHALL responder de forma fluida sem recarregar a página

### Requirement 2

**User Story:** Como um usuário, eu quero realizar operações CRUD de cadastro de pessoas através de uma interface React, para que eu possa gerenciar os dados usando uma arquitetura REST.

#### Acceptance Criteria

1. WHEN o usuário acessa a lista de pessoas THEN o sistema SHALL fazer uma requisição GET à API e exibir os dados
2. WHEN o usuário cria uma nova pessoa THEN o sistema SHALL fazer uma requisição POST à API com os dados do formulário
3. WHEN o usuário edita uma pessoa existente THEN o sistema SHALL fazer uma requisição PUT à API com os dados atualizados
4. WHEN o usuário exclui uma pessoa THEN o sistema SHALL fazer uma requisição DELETE à API e atualizar a lista
5. IF uma requisição falha THEN o sistema SHALL exibir uma mensagem de erro apropriada

### Requirement 3

**User Story:** Como um desenvolvedor, eu quero que a aplicação use React (framework com maior market share), para que o projeto demonstre tecnologias amplamente adotadas no mercado.

#### Acceptance Criteria

1. WHEN o projeto é desenvolvido THEN o sistema SHALL usar React como framework principal
2. WHEN componentes são criados THEN o sistema SHALL seguir as melhores práticas do React (hooks, componentes funcionais)
3. WHEN o estado é gerenciado THEN o sistema SHALL usar useState e useEffect apropriadamente
4. WHEN requisições são feitas THEN o sistema SHALL usar fetch API ou axios para comunicação HTTP

### Requirement 4

**User Story:** Como um usuário mobile, eu quero uma interface visualmente diferenciada e moderna, para que a experiência seja atrativa e demonstre as possibilidades de design em arquiteturas desacopladas.

#### Acceptance Criteria

1. WHEN a interface é exibida THEN o sistema SHALL usar um design moderno com tematização atual
2. WHEN elementos visuais são renderizados THEN o sistema SHALL aplicar cores, tipografia e espaçamentos modernos
3. IF Bootstrap é usado THEN o sistema SHALL customizar os componentes para criar uma identidade visual única
4. WHEN animações são aplicadas THEN o sistema SHALL usar transições suaves que não comprometam a performance
5. WHEN temas são aplicados THEN o sistema SHALL incluir elementos visuais inspirados em sites famosos atuais

### Requirement 5

**User Story:** Como um educador, eu quero que a funcionalidade seja idêntica ao sistema monolítico, para que os alunos possam comparar apenas as diferenças arquiteturais e visuais.

#### Acceptance Criteria

1. WHEN operações CRUD são realizadas THEN o sistema SHALL manter exatamente a mesma lógica de negócio do sistema monolítico
2. WHEN dados são manipulados THEN o sistema SHALL trabalhar com os mesmos campos (nome, email, telefone, gênero, dataNascimento) e validações
3. WHEN a aplicação funciona THEN o sistema SHALL demonstrar que apenas a apresentação e arquitetura mudaram
4. IF comparações são feitas THEN o sistema SHALL evidenciar que a API REST permite reutilização com diferentes front-ends

### Requirement 6

**User Story:** Como um usuário, eu quero preencher um formulário completo com todos os campos necessários, para que eu possa cadastrar pessoas com informações completas.

#### Acceptance Criteria

1. WHEN o usuário acessa o formulário de cadastro THEN o sistema SHALL exibir campos para nome, email, telefone, gênero e data de nascimento
2. WHEN o usuário preenche o campo nome THEN o sistema SHALL validar que o nome tem entre 2 e 100 caracteres
3. WHEN o usuário preenche o campo email THEN o sistema SHALL validar o formato do email
4. WHEN o usuário preenche o campo telefone THEN o sistema SHALL aplicar máscara brasileira (XX) XXXXX-XXXX e validar o formato
5. WHEN o usuário seleciona o gênero THEN o sistema SHALL oferecer as opções Masculino, Feminino e Não Informado
6. WHEN o usuário seleciona a data de nascimento THEN o sistema SHALL validar que a data não é futura
7. IF algum campo obrigatório não for preenchido THEN o sistema SHALL exibir mensagem de erro específica

### Requirement 7

**User Story:** Como um desenvolvedor, eu quero que o projeto seja organizado em uma estrutura separada, para que possa ser versionado independentemente em outro repositório.

#### Acceptance Criteria

1. WHEN o projeto é criado THEN o sistema SHALL ser estruturado em uma pasta independente
2. WHEN arquivos são organizados THEN o sistema SHALL seguir a estrutura padrão de projetos React
3. WHEN dependências são definidas THEN o sistema SHALL incluir package.json com todas as bibliotecas necessárias
4. WHEN o projeto é configurado THEN o sistema SHALL ser facilmente executável com npm/yarn start