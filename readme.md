#RAD Test assignment
[According to this link](https://docs.google.com/document/d/1lVekvIBlb7CWj-Vs7nQvsp3qaykz_X0bjCzu4bhj1IA/edit)

- Projects is written with typescript.
- Service intercommunication is implemented using
  AMQP [RabbitMQ](https://www.rabbitmq.com) direct exchange.
- TypeORM/MySQL is used for order storage.

# Structure

## apps

Our micro-services folder:

- `orders` - Orders service built with ExpressJS
- `payments` - Payments service, simple AMQP handlers

## libs/common

Our config with generic types, enums, interfaces and services folder:

- `services/amqp.service.ts` - Main messaging service used in both services

# Testing

Project uses [Jest](https://jestjs.io) for unit testing and [Supertest](https://github.com/visionmedia/supertest) for E2E tests(only `OrdersController`).

## Running tests

`npm run test`

# Running the project

- Start infrastructure: `docker-compose build && docker-compose up`
- Create order: `curl -X POST http://localhost:3001/orders`
- Cancel order: `curl -X DELETE http://localhost:3001/orders/:id`
  (Due to random nature of order creation and payment processing, please see logs to
  wait for DECLINED payment before canceling order)
- Show order status: `curl -X GET http://localhost:3001/orders/:id`
