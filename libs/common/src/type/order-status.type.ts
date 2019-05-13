import { OrderStatusEnum } from '../enum/order-status.enum';

export type OrderStatusType = OrderStatusEnum.CREATED | OrderStatusEnum.CONFIRMED | OrderStatusEnum.DELIVERED | OrderStatusEnum.CANCELED;
