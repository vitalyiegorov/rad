FROM node:dubnium

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY tslint.json ./

COPY ./apps/orders ./apps/orders

RUN apt-get update && npm install

EXPOSE 3000 9229

CMD [ "npm", "run", "run:orders" ]
