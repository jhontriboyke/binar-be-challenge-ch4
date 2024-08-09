const app = require("../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");

const { expired_token } = require("./data");

require("dotenv").config();

describe("GET /api/v1/accounts", () => {
  it("should return status error and 404 code if Authorization header not set", async () => {
    const res = await request(app).get("/api/v1/accounts");

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Authorization header not found");
  });

  it("should return status error and 403 code if token expired", async () => {
    const res = await request(app)
      .get("/api/v1/accounts")
      .set("Authorization", `Bearer ${expired_token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Token expired");
  });
});
