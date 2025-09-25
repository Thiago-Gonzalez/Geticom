# Imagem de Origem
FROM node:18-alpine AS build

# Diretório de trabalho
WORKDIR /app

# Copiar código fonte
COPY . .

# Instalar dependências
RUN npm install

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Iniciar aplicação
CMD ["npm", "start"]