import { Request, Response } from 'express';

import { ordersService } from '../service/';

export async function ordersCancelAction(req: Request, res: Response) {
  return res.json(await ordersService.cancel(req.params.id));
}
