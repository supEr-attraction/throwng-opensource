FROM node:lts-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:dev

CMD ["npx", "serve", "-s", "dist"]