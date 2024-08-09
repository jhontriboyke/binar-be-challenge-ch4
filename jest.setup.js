const request = require("supertest");
const app = require("./app");

const {
  valid_admin,
  valid_user,
  valid_complete_user,
} = require("./tests/data");
const prisma = require("./config/prisma");

beforeAll(async () => {
  const adminResponse = await request(app)
    .post("/api/v1/auth/login")
    .send(valid_admin);
  global.adminToken = adminResponse.body.data.token;

  const userResponse = await request(app)
    .post("/api/v1/auth/login")
    .send(valid_user);
  global.userToken = userResponse.body.data.token;

  const completeUserResponse = await request(app)
    .post("/api/v1/auth/login")
    .send(valid_complete_user);
  global.completeUserToken = completeUserResponse.body.data.token;
});
