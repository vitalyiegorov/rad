import { Connection, Exchange, Message, Queue } from 'amqp-ts';

import { config, MessageType, OrderMessageInterface, PaymentMessageInterface } from '@app/common';

export class AmqpService {
  private exchange: Exchange;
  private ordersQueue: Queue;
  private paymentsQueue: Queue;

  async init() {
    const connection = new Connection(process.env.AMPQ_URL);
    this.exchange = connection.declareExchange(config.exchange);

    this.ordersQueue = connection.declareQueue(config.ordersQueue);
    this.paymentsQueue = connection.declareQueue(config.paymentsQueue);

    await this.ordersQueue.bind(this.exchange, config.ordersQueue);
    await this.paymentsQueue.bind(this.exchange, config.paymentsQueue);

    return connection.completeConfiguration();
  }

  private async setQueueHandlers(queue: Queue, handlers: any[] = []) {
    return queue.activateConsumer(message => {
      handlers.forEach(handler => handler(message.getContent()));
    });
  }

  private async sendMessage(message: MessageType, routingKey = '', options?) {
    const msg = new Message(message, options);
    this.exchange.send(msg, routingKey);
  }

  async setOrdersHandlers(handlers: any[] = []) {
    return this.setQueueHandlers(this.ordersQueue, handlers);
  }

  async setPaymentsHandlers(handlers: any[] = []) {
    return this.setQueueHandlers(this.paymentsQueue, handlers);
  }

  async sendToOrders(message: OrderMessageInterface) {
    return this.sendMessage(message, config.ordersQueue);
  }

  async sendToPayments(message: PaymentMessageInterface) {
    return this.sendMessage(message, config.paymentsQueue);
  }
}
