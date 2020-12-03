FROM node:12

WORKDIR /app/src

COPY ./package.json ./
RUN yarn install

COPY ./ /app/src/
RUN yarn build:dev

CMD [ "yarn", "dev" ]
