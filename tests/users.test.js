const app = require("../app");
const request = require("supertest");

require("dotenv").config();

// GET all users
describe("GET api/v1/users", () => {
  it("should return all existing users", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Data retrieved successfully");
    expect(res.body.data.users.length).toBeGreaterThan(0);
  });
});
