'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models/index');
const server = require('./src/server');

db.sync().then(() => {
  server.start(process.env.PORT || 3001);
});
