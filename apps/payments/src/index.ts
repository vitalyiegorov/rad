import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';
import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../../../.env') });

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.listen(3002, () => {
  console.log('server started on port 3002');
});
