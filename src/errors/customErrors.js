class ValidationError extends Error {
  constructor(message, data) {
    super(message, data);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.data = data;
  }
}

class NotFoundError extends Error {
  constructor(message, data) {
    super(message, data);
    this.name = "NotFoundError";
    this.statusCode = 404;
    this.data = data;
  }
}

class DuplicationError extends Error {
  constructor(message, data) {
    super(message, data);
    this.name = "DuplicationError";
    this.statusCode = 409;
    this.data = data;
  }
}

class UnauthorizedError extends Error {
  constructor(message, data = null) {
    super(message, data);
    this.name = "UnauthorizedError";
    this.statusCode = 403;
    this.data = data;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  DuplicationError,
  UnauthorizedError,
};
