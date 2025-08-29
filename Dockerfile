# Imagem base oficial do Node.js
FROM node:20

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npx tsc

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar o app
CMD ["node", "dist/index.js"]