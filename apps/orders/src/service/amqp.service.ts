import { Connection, Exchange, Message } from 'amqp-ts';

import { config } from '@app/common';

export class AmqpService {
  private exchange: Exchange;

  async init() {
    const connection = new Connection(process.env.AMPQ_URL);
    this.exchange = connection.declareExchange(config.exchange);
    const queue = connection.declareQueue(config.ordersQueue);

    await queue.bind(this.exchange);

    await queue.activateConsumer(message => {
      console.log(`Message received:`, message.getContent());
    });

    return connection.completeConfiguration();
  }

  async sendMessage(message, options?) {
    console.log(`Sending message ${message}`);
    const msg = new Message(message, options);
    this.exchange.send(msg);
  }
}
