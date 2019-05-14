import * as express from 'express';
import { Router } from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { amqpService, ordersService, startContainer } from './service';
import { App } from './app';
import { OrdersController } from './controller/orders.controller';
import { OrderMessageInterface, PaymentMessageInterface } from '@app/common';

config({ path: resolve(__dirname, '../../../../.env') });

export const init = async () => {
  await startContainer().catch(console.error);

  await amqpService.setPaymentsHandlers([
    async ({ id, status }: PaymentMessageInterface) => {
      console.log(`Payments received message ${id}`, status);
      await ordersService.payment(id, status);
    }
  ]);

  await amqpService.setDeliveryHandlers([
    async ({ id }: OrderMessageInterface) => {
      console.log(`Delivery received message ${id}`);
      await ordersService.delivered(id);
    }
  ]);

  const app = new App(express(), [new OrdersController(ordersService, Router())]);
  app.start();
};

init();
