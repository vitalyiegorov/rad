import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { resolve } from 'path';
import { config } from 'dotenv';
import 'module-alias/register';

import { startOrm } from './orm';
import routes from './routes';
import { startQueue } from './amqp';

config({ path: resolve(__dirname, '../../../../.env') });

startQueue().catch(console.error);
startOrm().catch(console.error);

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use('/', routes);

app.listen(3001, () => {
  console.log('server started on port 3001');
});
