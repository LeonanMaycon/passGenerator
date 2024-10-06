# Dockerfile
FROM node:14

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código fonte
COPY ./src ./src

# Exponha a porta do aplicativo
EXPOSE 80

# Comando para iniciar o aplicativo
CMD [ "node", "src/app.js" ]
