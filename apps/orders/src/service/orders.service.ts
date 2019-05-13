import { getRepository } from 'typeorm';

import { Order } from '../entity/order';
import { sendMessage } from '../amqp';

export class OrdersService {
  async create() {
    const repository = getRepository(Order);

    let order = repository.create();
    order.total = Math.floor(Math.random() * 10000);
    order.user = 'ME'; // Fake auth data
    order = await repository.save(order);

    console.log(`Created order#${order.id}`);

    await sendMessage({ id: order.id, order });
  }

  async cancel(id: number) {}

  async status(id: number) {}
}

export const ordersService = new OrdersService();
