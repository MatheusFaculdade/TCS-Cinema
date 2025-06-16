FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache netcat-openbsd
RUN npm install

COPY . .

RUN npx prisma generate

# Copia o script de entrada
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

RUN npm run build

EXPOSE ${PORT}
CMD ["sh", "/app/entrypoint.sh"]
