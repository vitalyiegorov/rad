import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Order } from '../entity/order';
import { sendMessage } from '../amqp';

export async function ordersCreateAction(req: Request, res: Response) {
  const repository = getRepository(Order);

  let order = repository.create();
  order.total = Math.floor(Math.random() * 10000);
  order.user = 'ME'; // Fake auth data
  order = await repository.save(order);

  console.log(`Created order#${order.id}`);

  sendMessage({ id: order.id, order });

  return res.status(200).json({ status: 'ok' });
}
