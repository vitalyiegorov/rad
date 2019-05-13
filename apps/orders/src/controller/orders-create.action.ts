import { Request, Response } from 'express';

import { ordersService } from '../service/';

export async function ordersCreateAction(req: Request, res: Response) {
  return res.status(200).json({ order: await ordersService.create() });
}
