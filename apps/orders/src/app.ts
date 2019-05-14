import { Application } from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { json } from 'body-parser';

import { ControllerInterface } from '@app/common';

export class App {
  constructor(private app: Application, private controllers: ControllerInterface[] = [], private port: number = 3001) {
    controllers.forEach(controller => {
      this.app.use('/', controller.init());
    });

    app.use(cors());
    app.use(helmet());
    app.use(json());
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
