import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { AmqpService, OrderMessageInterface, PaymentStatusEnum } from '@app/common';

config({ path: resolve(__dirname, '../../../../.env') });

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.listen(3002, () => {
  console.log('server started on port 3002');
});

const init = async () => {
  const amqpService = new AmqpService();
  await amqpService.init();

  await amqpService.setOrdersHandlers([
    async ({ id, order }: OrderMessageInterface) => {
      console.log(`Payments received message`, order);
      const status = Math.floor(Math.random() * 2) + 1 === 1 ? PaymentStatusEnum.CONFIRMED : PaymentStatusEnum.DECLINED;
      await amqpService.sendToPayments({ id, status });
    }
  ]);
};

init();
