FROM node:24-alpine3.20
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm","run", "dev"]