FROM node:14.17.6

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm audit || true

COPY . .

RUN npm i -g file:./

RUN npm t -- --verbose