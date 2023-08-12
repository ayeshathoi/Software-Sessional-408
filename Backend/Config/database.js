const Pool = require("pg").Pool;
const url = require('url');
require('dotenv').config();

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: 5432,
  database: params.pathname.split('/')[1],
  ssl: true
};

module.exports = new Pool(config);