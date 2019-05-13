import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Order } from '../entity/order';

export async function ordersCreateAction(req: Request, res: Response) {
  const repository = getRepository(Order);

  let order = repository.create();
  order.total = Math.floor(Math.random() * 10000);
  order.user = 'ME'; // Fake auth data
  order = await repository.save(order);

  console.log(`Created order#${order.id}`);

  return res.status(200).json({ status: 'ok' });
}
