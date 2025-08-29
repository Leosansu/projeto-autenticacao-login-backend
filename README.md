# projeto_autenticacao_login

🚧 **Projeto em desenvolvimento** 🚧  
Funcionalidades e melhorias estão sendo implementadas continuamente.

Este é um projeto de backend para autenticação e login, desenvolvido em Node.js com TypeScript.  
O objetivo é servir como exemplo para recrutadores e para quem deseja aprender sobre autenticação básica em APIs REST.

## Funcionalidades

- Cadastro de usuário
- Login de usuário (em desenvolvimento)
- Estrutura de projeto organizada por camadas (controllers, services, models, routes)
- Persistência de dados com MySQL e Prisma ORM

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express

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
4. Inicie o servidor:
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
  (Em breve)

---


