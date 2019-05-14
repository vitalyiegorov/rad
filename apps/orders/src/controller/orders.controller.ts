import { Request, Response, Router } from 'express';

import { OrdersService } from '../service/orders.service';
import { ControllerInterface } from '@app/common';

export class OrdersController implements ControllerInterface {
  private path = '/orders';

  constructor(private ordersService: OrdersService, private router: Router) {}

  init(): Router {
    this.router.get(this.path + '/:id([0-9]+)', this.statusAction.bind(this));
    this.router.post(this.path, this.createAction.bind(this));
    this.router.delete(this.path + '/:id([0-9]+)', this.cancelAction.bind(this));

    return this.router;
  }

  async cancelAction(req: Request, res: Response) {
    return res.json(await this.ordersService.cancel(req.params.id));
  }

  async createAction(req: Request, res: Response) {
    return res.status(200).json({ order: await this.ordersService.create() });
  }

  async statusAction(req: Request, res: Response) {
    return res.status(200).json(await this.ordersService.status(req.params.id));
  }
}
