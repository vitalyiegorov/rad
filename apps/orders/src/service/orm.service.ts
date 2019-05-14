import { createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { Order } from '../entity/order';

export class OrmService {
  constructor(private config: MysqlConnectionOptions) {}

  async init() {
    return createConnection(this.config);
  }
}
