FROM node:14.16.0-alpine3.10

WORKDIR /app/src

RUN apk add --no-cache python make g++
RUN yarn global add serve

COPY package.json package.json

RUN yarn install

COPY . .
COPY .env.example .env

RUN npm run build:prod

EXPOSE 5000

CMD [ "serve", "-s","-l","tcp://0.0.0.0", "build" ]
