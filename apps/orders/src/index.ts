import * as express from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { ordersService, startContainer } from './service';
import { App } from './app';
import { OrdersController } from './controller/orders.controller';
import { Router } from 'express';

config({ path: resolve(__dirname, '../../../../.env') });

const init = async () => {
  await startContainer().catch(console.error);
  const app = new App(express(), [new OrdersController(ordersService, Router())]);
  await app.start();
};

init();
