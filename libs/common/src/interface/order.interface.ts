import { OrderStatusType } from '../type/order-status.type';

export class OrderInterface {
  id: number;
  total: number;
  user: string;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatusType;
}
