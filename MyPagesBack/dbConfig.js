const { Pool } = require('pg');

const pool = new Pool({
    user: 'latifn',
    host: 'dpg-cm45g5en7f5s73btd6cg-a',
    database: 'commondb_u1wp',
    password: 'Yf8JhctKMHJT2ciIHzKLMpxS5UIeG2mJ',
    port: 5432 // or your specified port number
  });

module.exports = pool;