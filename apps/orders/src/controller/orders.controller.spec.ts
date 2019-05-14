import * as request from 'supertest';
import * as express from 'express';
import { Router } from 'express';

import { OrdersController } from './orders.controller';
import { App } from '../app';
import { OrderStatusEnum } from '@app/common';

describe('Orders controller', () => {
  let server;

  const orderMock = { id: 1, total: 0, user: '', status: OrderStatusEnum.CREATED };

  const ordersService = new (jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue(orderMock),
    cancel: jest.fn().mockReturnValue(orderMock),
    status: jest.fn().mockReturnValue(orderMock.status)
  })))();

  beforeAll(() => {
    const app = new App(express(), [new OrdersController(ordersService, Router())], 2999);
    server = app.start();
  });

  describe('GET /orders/:id', () => {
    it('responds with json of order status', done => {
      request(server)
        .get('/orders/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });

  describe('POST /orders/', () => {
    it('responds with json of created order', done => {
      request(server)
        .post('/orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('responds with json of deleted order', done => {
      request(server)
        .post('/orders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });
});
