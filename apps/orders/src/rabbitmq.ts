import { connect } from 'amqplib';

import { config } from '@app/common';

export const startRabbitMQ = async () => {
  const connection = await connect(process.env.AMPQ_URL);
  const channel = await connection.createChannel();
  const queue = await channel.assertQueue(config.ordersQueue);
};
