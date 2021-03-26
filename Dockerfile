FROM node:14.16.0-alpine3.10 as builder

WORKDIR /app/src

RUN apk add --no-cache python make g++
RUN yarn global add serve

COPY package.json package.json

RUN yarn install

COPY . .
COPY .env.example .env

RUN npm run build:prod

FROM nginx:1.19-alpine

WORKDIR /app/src

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/src/build /var/www/html

EXPOSE 5000

# CMD [ "serve", "-s","-l","tcp://0.0.0.0", "build" ]
