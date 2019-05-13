import { Request, Response } from 'express';

import { ordersService } from '../service/';

export async function ordersStatusAction(req: Request, res: Response) {
  return res.status(200).json(await ordersService.status(req.params.id));
}
