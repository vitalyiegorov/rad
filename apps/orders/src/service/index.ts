import { getRepository } from 'typeorm';

import { OrdersService } from './orders.service';
import { Order } from '../entity/order';
import { OrmService } from './orm.service';
import { AmqpService } from '@app/common';

export let ordersService: OrdersService = null;
export let amqpService: AmqpService = null;
export let ormService: OrmService = null;

export const startContainer = async () => {
  amqpService = new AmqpService(process.env.AMPQ_URL);
  await amqpService.init();

  ormService = new OrmService({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: +process.env.TYPEORM_PORT,
    synchronize: true,
    entities: [Order]
  });
  await ormService.init();

  ordersService = new OrdersService(amqpService, getRepository(Order));
};
