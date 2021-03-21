FROM node:14.16.0-alpine3.10

WORKDIR /app/src

COPY package*.json ./
RUN npm install

COPY . .
CP .env.example .env
RUN npm run build:prod
RUN npm install -g serve

EXPOSE 5000

CMD [ "serve", "-s","-l","tcp://0.0.0.0", "build" ]
