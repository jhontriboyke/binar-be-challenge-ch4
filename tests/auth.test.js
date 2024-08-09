const app = require("../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../src/models/v1");

const {
  JWT_SECRET_KEY,
  valid_user,
  invalid_user,
  invalid_token,
  expired_token,
} = require("./data");

require("dotenv").config();

describe("POST api/v1/auth/login", () => {
  it("should return token and success message if valid", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(valid_user)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Login successfully");

    const decoded = jwt.verify(res.body.data.token, JWT_SECRET_KEY);

    const user = await UserModel.getUserByEmail(valid_user.email);

    expect(decoded).toHaveProperty("id", user.id);
    expect(decoded).toHaveProperty("email", valid_user.email);
  });

  it("should return error and fail message if data send not exist", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(invalid_user)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Email or your password incorrect");
  });
});

describe("POST api/v1/auth/authenticate", () => {
  it("should return status success and 200 code if user authenticated", async () => {
    const res_login = await request(app)
      .post("/api/v1/auth/login")
      .send(valid_user)
      .set("Accept", "application/json");

    const res_authenticate = await request(app)
      .post("/api/v1/auth/authenticate")
      .set("Authorization", `Bearer ${res_login.body.data.token}`);

    expect(res_authenticate.statusCode).toBe(200);
  });

  it("should return status error and 403 code if token expired", async () => {
    const res = await request(app)
      .post("/api/v1/auth/authenticate")
      .set("Authorization", `Bearer ${expired_token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Token expired");
  });

  it("should return status error and 404 code if Authorization header not set", async () => {
    const res = await request(app).post("/api/v1/auth/authenticate");

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Authorization header not found");
  });

  it("should return status error and 403 code if token invalid", async () => {
    const res = await request(app)
      .post("/api/v1/auth/authenticate")
      .set("Authorization", `Bearer ${invalid_token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
  });
});
