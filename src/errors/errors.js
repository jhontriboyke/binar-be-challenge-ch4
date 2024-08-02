class ValidationError extends Error {
  constructor(message) {
    super(message, data);
    this.name = "ValidationError";
    this.code = 403;
    this.data = data;
  }
}

module.exports = {
  ValidationError,
};
