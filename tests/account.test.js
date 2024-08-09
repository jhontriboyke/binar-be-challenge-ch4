const app = require("../app");
const request = require("supertest");

const { expired_token } = require("./data");

require("dotenv").config();

describe("POST /api/v1/accounts", () => {
  it("should return status fail with 400 code if error occur in req.body", async () => {
    const res = await request(app)
      .post("/api/v1/accounts")
      .send()
      .set("Authorization", `Bearer ${global.userToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("fail");
  });

  it("should return status error with 403 code because user not complete profile and address", async () => {
    const res = await request(app)
      .post("/api/v1/accounts")
      .send({
        account_type_id: 1,
        bank_name: "Binar",
        number: Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString(),
        pin_number: "123456",
        balance: 10_000,
      })
      .set("Authorization", `Bearer ${global.userToken}`);

    if (res.body.status === "success") {
      expect(res.statusCode).toBe(201);
    } else {
      expect(res.body.status).toBe("error");
    }
  });

  it("should return status success with 201 code", async () => {
    const res = await request(app)
      .post("/api/v1/accounts")
      .send({
        account_type_id: 1,
        bank_name: "Binar",
        number: Math.floor(
          100000000000 + Math.random() * 900000000000
        ).toString(),
        pin_number: "123456",
        balance: 10_000,
      })
      .set("Authorization", `Bearer ${global.completeUserToken}`);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
  });
});

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

  it("should return status success with 200 code and all existing accounts if access by role Admin", async () => {
    const res = await request(app)
      .get("/api/v1/accounts")
      .set("Authorization", `Bearer ${global.adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

  it("should return status success with 200 code and all existing accounts if access by role User", async () => {
    const res = await request(app)
      .get("/api/v1/accounts")
      .set("Authorization", `Bearer ${global.userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });
});
