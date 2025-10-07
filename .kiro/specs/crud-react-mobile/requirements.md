# Requisitos

## Introdução

App React mobile-first para CRUD pessoas via API REST. Bootstrap 5.

## Requisitos

### Requisito 1

**História:** Como usuário, quero interface mobile responsiva, para gerenciar pessoas via API REST.

#### Critérios de Aceitação

1. QUANDO acessa mobile ENTÃO sistema DEVE exibir interface responsiva
2. QUANDO carrega ENTÃO sistema DEVE consumir API REST
3. QUANDO interage ENTÃO sistema DEVE responder sem reload

### Requisito 2

**História:** Como usuário, quero operações CRUD completas, para gerenciar dados pessoas.

#### Critérios de Aceitação

1. QUANDO lista ENTÃO sistema DEVE fazer GET e exibir dados
2. QUANDO cria ENTÃO sistema DEVE fazer POST
3. QUANDO edita ENTÃO sistema DEVE fazer PUT
4. QUANDO exclui ENTÃO sistema DEVE fazer DELETE
5. SE falha ENTÃO sistema DEVE exibir erro

### Requisito 3

**História:** Como usuário, quero formulário com validação, para cadastrar dados corretos.

#### Critérios de Aceitação

1. QUANDO acessa formulário ENTÃO sistema DEVE exibir: nome, email, telefone, gênero, data nascimento
2. QUANDO preenche nome ENTÃO sistema DEVE validar 2-100 caracteres
3. QUANDO preenche email ENTÃO sistema DEVE validar formato
4. QUANDO preenche telefone ENTÃO sistema DEVE aplicar máscara (XX) XXXXX-XXXX
5. QUANDO seleciona gênero ENTÃO sistema DEVE oferecer: Masculino, Feminino, Não Informado
6. SE campo vazio ENTÃO sistema DEVE exibir erro