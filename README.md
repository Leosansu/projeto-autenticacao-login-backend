# projeto_autenticacao_login

🚀 **Projeto concluído!**  
Funcionalidades de autenticação, cadastro, proteção de rotas e testes unitários implementados.

Este é um projeto de backend para autenticação e login, desenvolvido em Node.js com TypeScript e Prisma.  
O objetivo é servir como exemplo para recrutadores e para quem deseja aprender sobre autenticação básica em APIs REST.

## Funcionalidades

- Cadastro de usuário
- Login de usuário com geração de token JWT
- Listagem de usuários (rota protegida)
- Estrutura de projeto organizada por camadas (controllers, services, models, routes, middlewares)
- Banco de dados com Prisma e MySQL
- Proteção de rotas via middleware JWT
- Testes unitários para services, controllers e middlewares

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- JWT (jsonwebtoken)
- Jest (testes unitários)

## Como rodar o projeto

1. Clone o repositório:
   ```
   git clone https://github.com/SEU_USUARIO/projeto_autenticacao_login.git
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Compile o TypeScript:
   ```
   npx tsc
   ```
4. Gere o Prisma Client:
   ```
   npx prisma generate
   ```
5. Inicie o servidor:
   ```
   node dist/index.js
   ```

## Testando as rotas

- **Cadastro:**  
  `POST /auth/register`  
  Corpo da requisição (JSON):
  ```json
  {
    "name": "Seu Nome",
    "email": "seu@email.com",
    "password": "suaSenha"
  }
  ```

- **Login:**  
  `POST /auth/login`  
  Corpo da requisição (JSON):
  ```json
  {
    "email": "seu@email.com",
    "password": "suaSenha"
  }
  ```
  Resposta:
  ```json
  {
    "token": "seu_token_jwt",
    "nome": "Seu Nome"
  }
  ```

- **Listar usuários (rota protegida):**  
  `GET /auth/users`  
  Header:
  ```
  Authorization: Bearer seu_token_jwt
  ```
  Resposta:
  ```json
  [
    {
      "id": 1,
      "name": "Seu Nome",
      "email": "seu@email.com"
    }
  ]
  ```

## Testes automatizados

- Para rodar os testes unitários:
  ```
  npx vitest run
  ```
- Para gerar relatório de cobertura:
  ```
  npx vitest run --coverage
  ```
- Testes cobrem:
  - Services: cadastro, autenticação e listagem de usuários
  - Controllers: respostas HTTP para cada cenário
  - Middlewares: proteção de rotas e validação de token JWT

---

Projeto pronto para servir de referência em autenticação de APIs REST com Node.js, TypeScript


