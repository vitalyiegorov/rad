import { getRepository } from 'typeorm';

import { OrdersService } from './orders.service';
import { Order } from '../entity/order';
import { AmqpService } from './amqp.service';
import { OrmService } from './orm.service';

export let ordersService: OrdersService = null;
export let amqpService: AmqpService = null;
export let ormService: OrmService = null;

export const startContainer = async () => {
  amqpService = new AmqpService();
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
