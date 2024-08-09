const app = require("../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");

const { expired_token, valid_user, invalid_user_id } = require("./data");

const prisma = require("../config/prisma/index");

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

require("dotenv").config();

describe("POST /api/v1/users", () => {
  it("should return status success and 201 code if user created", async () => {
    const new_user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: "123456",
    };

    await prisma.$transaction(async (prisma) => {
      const res = await request(app).post("/api/v1/users").send(new_user);

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("User created");

      await prisma.$executeRaw`ROLLBACK`;
    });
  });

  it("should return status fail and 400 code if not pass need req.body prop(s)", async () => {
    const res = await request(app).post("/api/v1/users").send();

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("fail");
    expect(res.body.message).toBe("Validation error");
  });

  it("should return status error and 409 code if user already exist", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({
        ...valid_user,
        first_name: "Jhontri",
        last_name: "Boyke",
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("User already exist");
  });
});

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
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${global.userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe(
      "You do not have permission to access this resource"
    );
  });

  it("should return status success with 200 code and all exist users if the req.user role is Admin", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${global.adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Data retrieved successfully");
  });
});

describe("GET /api/v1/users/:id", () => {
  it("should return status error and 404 code if user id not found with access role Admin", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${invalid_user_id}`)
      .set("Authorization", `Bearer ${global.adminToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("User not found");
  });
});
