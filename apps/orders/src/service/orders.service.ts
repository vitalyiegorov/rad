import { Repository } from 'typeorm';

import { Order } from '../entity/order';
import { AmqpService, OrderStatusEnum, PaymentStatusEnum, PaymentStatusType } from '@app/common';
import { amqpService } from './index';

export class OrdersService {
  constructor(private amqpService: AmqpService, private repository: Repository<Order>) {}

  async create() {
    let order = this.repository.create();
    order.total = Math.floor(Math.random() * 10000);
    order.user = 'ME'; // Fake auth data
    order = await this.repository.save(order);

    console.log(`Created order#${order.id}`);

    await this.amqpService.sendToOrders({ id: order.id, order });

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
    console.log(`Showing order#${order.id} status ${order.status}`);
    return order.status;
  }

  async payment(id: number, status: PaymentStatusType) {
    const order = await this.repository.findOneOrFail(id);

    if ([OrderStatusEnum.CANCELED, OrderStatusEnum.CONFIRMED, OrderStatusEnum.DELIVERED].includes(order.status)) {
      throw Error(`Order${id} has wrong status for the payment`);
    }

    console.log(`Processed order#${order.id} payment ${status}`);

    order.status = status === PaymentStatusEnum.DECLINED ? OrderStatusEnum.CANCELED : OrderStatusEnum.CONFIRMED;
    await this.repository.save(order);

    await amqpService.sendToDelivery({ id: order.id });

    return order;
  }

  async delivered(id: number) {
    const order = await this.repository.findOneOrFail(id);

    setTimeout(async () => {
      order.status = OrderStatusEnum.DELIVERED;
      await this.repository.save(order);

      console.log(`Delivered order#${order.id}`);
    }, Math.floor(Math.random() * 5));
  }
}
