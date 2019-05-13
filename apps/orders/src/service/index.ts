import { OrdersService } from './orders.service';

export let ordersService = null;

export const startContainer = async () => {
  ordersService = new OrdersService();
};
