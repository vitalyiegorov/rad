FROM node:dubnium

WORKDIR /app

COPY . .

RUN apt-get update && npm install

EXPOSE 3000 9229

CMD [ "npm", "run", "run:orders" ]
