# Requisitos

## Introdução

App React mobile-first para CRUD de pessoas via API REST. Interface moderna e responsiva.

## Requisitos

### Requisito 1

**História:** Como usuário, quero interface mobile responsiva, para gerenciar pessoas via API REST.

#### Critérios de Aceitação

1. WHEN acessa mobile THEN sistema SHALL exibir interface responsiva
2. WHEN carrega THEN sistema SHALL consumir API REST
3. WHEN interage THEN sistema SHALL responder sem reload

### Requisito 2

**História:** Como usuário, quero operações CRUD completas, para gerenciar dados de pessoas.

#### Critérios de Aceitação

1. WHEN lista THEN sistema SHALL fazer GET e exibir dados
2. WHEN cria THEN sistema SHALL fazer POST
3. WHEN edita THEN sistema SHALL fazer PUT
4. WHEN exclui THEN sistema SHALL fazer DELETE
5. IF falha THEN sistema SHALL exibir erro

### Requisito 3

**História:** Como usuário, quero formulário com validação, para cadastrar dados corretos.

#### Critérios de Aceitação

1. WHEN acessa formulário THEN sistema SHALL exibir: nome, email, telefone, gênero, data nascimento
2. WHEN preenche nome THEN sistema SHALL validar 2-100 caracteres
3. WHEN preenche email THEN sistema SHALL validar formato
4. WHEN preenche telefone THEN sistema SHALL aplicar máscara (XX) XXXXX-XXXX
5. WHEN seleciona gênero THEN sistema SHALL oferecer: Masculino, Feminino, Não Informado
6. IF campo vazio THEN sistema SHALL exibir erro