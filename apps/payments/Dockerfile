FROM node:dubnium

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY tslint.json ./
COPY .env ./
COPY ./apps/payments ./apps/payments
COPY ./libs/ ./libs

RUN apt-get update && npm install

EXPOSE 3000 9229

CMD [ "npm", "run", "run:payments" ]
