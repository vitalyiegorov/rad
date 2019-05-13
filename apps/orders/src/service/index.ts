import { OrdersService } from './orders.service';
import { sendMessage } from '../amqp';
import { getRepository } from 'typeorm';
import { Order } from '../entity/order';

export let ordersService = null;

export const startContainer = async () => {
  ordersService = new OrdersService(sendMessage, getRepository(Order));
};
