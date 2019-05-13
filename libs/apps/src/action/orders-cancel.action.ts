import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Order } from '../entity/order';

export function ordersCancelAction(req: Request, res: Response) {
  return res.json(getRepository(Order).find());
}
