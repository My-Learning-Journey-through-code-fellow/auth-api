'use strict';

const bearerAuth = require('../src/auth/middleware/bearer');
const { db, users } = require('../src/models');

let testUser;

beforeAll(async () => {
  await db.sync();
  testUser = await users.create({
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
        authorization: 'Bearer of bad news',
      },
    };
    let res = {};
    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });

  test('passes as expected', async () => {
    let req = {
      headers: {
        authorization: `Bearer ${testUser.token}`,
      },
    };
    let res = {};
    let next = jest.fn();

    await bearerAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
