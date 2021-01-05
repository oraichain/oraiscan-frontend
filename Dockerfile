FROM node:10.20.1-alpine3.9

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build:prod
RUN npm install -g serve

EXPOSE 5000

CMD [ "serve", "-s","-l","tcp://0.0.0.0", "build" ]
