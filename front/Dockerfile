FROM node:lts-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:dev

EXPOSE 5173

CMD ["npx", "serve", "-s", "dist"]