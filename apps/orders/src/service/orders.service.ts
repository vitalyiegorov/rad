import { Repository } from 'typeorm';

import { Order } from '../entity/order';
import { OrderStatusEnum } from '@app/common';

export class OrdersService {
  constructor(private queueSend: any, private repository: Repository<Order>) {}

  async create() {
    let order = this.repository.create();
    order.total = Math.floor(Math.random() * 10000);
    order.user = 'ME'; // Fake auth data
    order = await this.repository.save(order);

    console.log(`Created order#${order.id}`);

    await this.queueSend({ id: order.id, order });

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
