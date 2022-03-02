require('env2')('config.env');
const { Pool } = require('pg');

const {
  NODE_ENV, TEST_DB_URL, DEV_DB_URL, DATABASE_URL,
} = process.env;

let DB_URL = '';

switch (NODE_ENV) {
  case 'test':
    DB_URL = TEST_DB_URL;
    break;
  case 'development':
    DB_URL = DEV_DB_URL;
    break;
  case 'production':
    DB_URL = DATABASE_URL;
    break;
  default:
    throw new Error('No database url found');
}

const options = {
  connectionString: DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dbConnection = new Pool(options);

module.exports = dbConnection;
