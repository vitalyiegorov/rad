import { getRepository, Repository } from 'typeorm';
import { Exchange } from 'amqp-ts';

import { Order } from '../entity/order';
import { exchange, sendMessage } from '../amqp';
import { OrderStatusEnum } from '@app/common';

export class OrdersService {
  private queue: Exchange;
  private repository: Repository<Order>;

  constructor() {
    this.queue = exchange;
    this.repository = getRepository(Order);
  }

  async create() {
    let order = this.repository.create();
    order.total = Math.floor(Math.random() * 10000);
    order.user = 'ME'; // Fake auth data
    order = await this.repository.save(order);

    console.log(`Created order#${order.id}`);

    await sendMessage({ id: order.id, order });

    return order;
  }

  async cancel(id: number) {
    const order = await this.repository.findOneOrFail(id);

    if (order.status === OrderStatusEnum.DELIVERED) {
      throw new Error(`Cannot cancel delivered order#${order.id}`);
    }

    console.log(`Canceled order#${order.id}`);

    order.status = OrderStatusEnum.CANCELED;
    await this.repository.save(order);

    return order;
  }

  async status(id: number) {
    const order = await this.repository.findOneOrFail(id);
    return order.status;
  }
}
