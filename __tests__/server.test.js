'use strict';

const { db, users } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

let writerUser;
let adminUser;

beforeAll( async ()=> {
  await db.sync();
  writerUser = await users.create({
    username: 'writer',
    password: 'pass',
    role: 'writer',
  });
  adminUser = await users.create({
    username: 'admin',
    password: 'pass',
    role: 'admin',
  });
});

afterAll( async () => {
  await db.drop();
});

describe('API / Auth server Integration', () => {

  it('handles invalid requests', async () => {
    const response = await request.get('/foo');

    expect(response.status).toEqual(404);
  });
});


