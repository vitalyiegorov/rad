import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Order } from '../entity/order';

export async function ordersStatusAction(req: Request, res: Response) {
  const orderId = req.params.id;

  return res.status(200).json(await getRepository(Order).findOneOrFail(orderId));
}
