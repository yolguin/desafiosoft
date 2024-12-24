const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'gaviotas',
  database: 'softjobs',
  port: 5432,
});

module.exports = pool;
