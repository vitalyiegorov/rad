import { Request, Response } from 'express';

import { ordersService } from '../service/orders.service';

export async function ordersCreateAction(req: Request, res: Response) {
  await ordersService.create();

  return res.status(200).json({ status: 'ok' });
}
