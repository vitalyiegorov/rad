import { createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class OrmService {
  constructor(private config: MysqlConnectionOptions) {}

  async init() {
    return createConnection(this.config);
  }
}
