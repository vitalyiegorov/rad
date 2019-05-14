import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { AmqpService, OrderMessageInterface, PaymentStatusEnum } from '@app/common';

config({ path: resolve(__dirname, '../../../../.env') });

const init = async () => {
  const amqpService = new AmqpService(process.env.AMPQ_URL);
  await amqpService.init();

  await amqpService.setOrdersHandlers([
    async ({ id, order }: OrderMessageInterface) => {
      console.log(`Orders received message ${id} with status ${order.status}`);
      const status = Math.floor(Math.random() * 2) + 1 === 1 ? PaymentStatusEnum.CONFIRMED : PaymentStatusEnum.DECLINED;
      await amqpService.sendToPayments({ id, status });
    }
  ]);

  console.log('Started payments service');
};

init();
