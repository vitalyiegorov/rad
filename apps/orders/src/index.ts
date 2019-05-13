import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { startOrm } from './orm';
import { startQueue } from './amqp';
import { startContainer } from './service';
import { startServer } from './server';

config({ path: resolve(__dirname, '../../../../.env') });

const init = async () => {
  await startQueue().catch(console.error);
  await startOrm().catch(console.error);
  await startContainer();
  await startServer();
};

init();
