'use strict';

const basicAuth = require('../src/auth/middleware/basic');
const { db, users } = require('../src/models');

beforeAll(async () => {
  await db.sync();
  await users.create({
    username: 'Tester',
    password: 'pass',
  });
});

afterAll(async () => {
  await db.drop();
});

describe('Basic auth middleware', () => {
  it('fails on signin as expected', async () => {
    let req = {
      headers: {
        authorization: 'Plain Potato',
      },
    };
    let res = {};
    let next = jest.fn();

    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  test('passes as expected', async () => {
    let req = {
      headers: {
        authorization: 'Basic idunnoifthiswillwork=',
      },
    };
    let res = {};
    let next = jest.fn();

    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
