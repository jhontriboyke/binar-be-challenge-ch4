const app = require("../app");
const request = require("supertest");
const prisma = require("../config/prisma/index");

const {
  expired_token,
  valid_admin,
  valid_user,
  invalid_user_id,
  valid_new_user,
} = require("./data");

require("dotenv").config();

describe("GET /api/v1/users", () => {
  it("should return status error and 404 code if Authorization header not set", async () => {
    const res = await request(app).get("/api/v1/users");

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Authorization header not found");
  });

  it("should return status error and 403 code if token expired", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${expired_token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Token expired");
  });

  it("should return status error and 403 code if the req.user role is User", async () => {
    const user_login = await request(app)
      .post("/api/v1/auth/login")
      .send(valid_user);

    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${user_login.body.data.token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe(
      "You do not have permission to access this resource"
    );
  });

  it("should return status success with 200 code and all exist users if the req.user role is Admin", async () => {
    const admin_login = await request(app)
      .post("/api/v1/auth/login")
      .send(valid_admin);

    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${admin_login.body.data.token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Data retrieved successfully");
  });
});

describe("GET /api/v1/users/:id", () => {
  it("should return status error and 404 code if user id not found with access role Admin", async () => {
    const admin_login = await request(app)
      .post("/api/v1/auth/login")
      .send(valid_admin);

    const user_id = invalid_user_id;
    const res = await request(app)
      .get(`/api/v1/users/${user_id}`)
      .set("Authorization", `Bearer ${admin_login.body.data.token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("User not found");
  });
});

describe("POST /api/v1/users", () => {
  it("should return status success and 201 code if user created", async () => {
    const res = await request(app).post("/api/v1/users").send(valid_new_user);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("User created");
  });
});
