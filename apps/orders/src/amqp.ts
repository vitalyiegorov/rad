import { Connection, Exchange, Message, Queue } from 'amqp-ts';

import { config } from '@app/common';

export let connection = null;
export let exchange: Exchange = null;
export let queue: Queue = null;
export let connected = false;

export const startQueue = async () => {
  connection = new Connection(process.env.AMPQ_URL);
  exchange = connection.declareExchange(config.exchange);
  queue = connection.declareQueue(config.ordersQueue);

  await queue.bind(exchange);

  await queue.activateConsumer(message => {
    console.log(`Message received:`, message.getContent());
  });

  await connection.completeConfiguration();

  connected = true;
};

export const sendMessage = async (message, options?) => {
  console.log(`Sending message ${message}`);
  const msg = new Message(message, options);
  exchange.send(msg);
};
