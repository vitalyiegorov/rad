import { OrderMessageInterface } from '../interface/order-message.interface';
import { PaymentMessageInterface } from '../interface/payment-message.interface';

export type MessageType = OrderMessageInterface | PaymentMessageInterface;
