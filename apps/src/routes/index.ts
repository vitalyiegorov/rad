import { Router } from 'express';

import { ordersCreateAction } from '../controller/orders-create.action';
import { ordersCancelAction } from '../controller/orders-cancel.action';
import { ordersStatusAction } from '../controller/orders-status.action';

const router = Router();

router.post('/orders', ordersCreateAction);
router.delete('/orders/:id([0-9]+)', ordersCancelAction);
router.get('/orders/:id([0-9]+)', ordersStatusAction);

export default router;
