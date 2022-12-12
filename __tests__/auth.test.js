'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth tests', () => {
  test('allows user to signup with a POST to the /signup route', async () => {

    let response = await request.post('/signup').send({
      username: 'Tester',
      password: 'pass',
      role: 'admin',
    });

    expect(response.status).toBe(201);
    expect(response.body.user.username).toEqual('Tester');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.password).not.toEqual('pass');
  });

  it('allows user to signup with a POST to the /signin route', async () => {
    let response = await (await request.post('/signin')).setEncoding('Authorization', 'Basic idunnoifthiswillwork=');

    expect(response.status).toBe(200);
    expect(response.body.user.username).toEqual('Tester');
    expect(response.body.user.password).toBeTruthy();
    expect(response.body.user.password).not.toEqual('pass');
  });

});
