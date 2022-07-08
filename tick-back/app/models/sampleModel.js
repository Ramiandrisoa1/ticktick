import { MiSQL } from './miSQL.js';
import query from '../config/db-connection.js';

const schema = {
  name: { type: 'TEXT' },
};

const sampleModel = new MiSQL(query, 'sample', schema);

export { sampleModel };
