import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { startOrm } from './orm';
import { startQueue } from './amqp';
import routes from './routes';
import { startContainer } from './service';

config({ path: resolve(__dirname, '../../../../.env') });

const init = async () => {
  await startQueue().catch(console.error);
  await startOrm().catch(console.error);
  await startContainer();

  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(json());

  app.use('/', routes);

  app.listen(3001, () => {
    console.log('server started on port 3001');
  });
};

init();
