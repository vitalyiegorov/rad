import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';

import routes from './routes';

export const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(json());

  app.use('/', routes);

  app.listen(3001, () => {
    console.log('server started on port 3001');
  });
};
