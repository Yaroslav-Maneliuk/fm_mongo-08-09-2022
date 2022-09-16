FROM node:16.17.0-alpine3.15

RUN mkdir /server

WORKDIR /server

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD npm start
