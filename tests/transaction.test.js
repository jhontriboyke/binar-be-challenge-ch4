const app = require("../app");
const request = require("supertest");

describe("GET /api/v1/transactions", () => {
  it("should return success with 200 code and display all existing transaction with acess role Admin", async () => {
    const res = await request(app)
      .get("/api/v1/transactions")
      .set("Authorization", `Bearer ${global.adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});

describe("POST /api/v1/transactions/withdraw", () => {
  it("should return error with 403 code if Admin trying to access withdraw", async () => {
    const res = await request(app)
      .post("/api/v1/transactions/withdraw")
      .set("Authorization", `Bearer ${global.adminToken}`);

    expect(res.statusCode).toBe(403);
  });
});
