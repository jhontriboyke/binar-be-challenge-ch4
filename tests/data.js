require("dotenv").config();

const data = {
  expired_token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjN2QyMGMzLWMzN2QtNGQyNy1hZjFjLTYxY2NkZTA4Yjc1YiIsImVtYWlsIjoiamhvbnRyaUBtYWlsLmNvbSIsImlhdCI6MTcyMzAyOTE3OCwiZXhwIjoxNzIzMDMyNzc4fQ.BuMeCv33zy3VseFUqbQRHdqbA2tDvWvr2pgdWOx2jFE",
  invalid_token:
    "zyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjN2QyMGMzLWMzN2QtNGQyNy1hZjFjLTYxY2NkZTA4Yjc1YiIsImVtYWlsIjoiamhvbnRyaUBtYWlsLmNvbSIsImlhdCI6MTcyMzAyOTE3OCwiZXhwIjoxNzIzMDMyNzc4fQ.BuMeCv33zy3VseFUqbQRHdqbA2tDvWvr2pgdWOx2jFE",
  valid_user: {
    email: "jhontriboyke@example.com",
    password: "123456",
  },
  valid_complete_user: {
    email: "janedoe@example.com",
    password: "123456",
  },
  valid_new_user: {
    first_name: "Alex",
    last_name: "Korls",
    email: "alexkorls@mail.com",
    password: "123456!",
  },
  invalid_user: {
    email: "jhontralalal1231@mai231l.com",
    password: "sadasdklo12o3iuas",
  },
  valid_admin: {
    email: "admin@mail.com",
    password: "admin123",
  },
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  invalid_user_id: "20a639eb-6231-48c7-888b-f5c87ae12dad",
};

module.exports = data;
