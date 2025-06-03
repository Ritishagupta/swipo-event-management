class ApiError extends Error {
  constructor(statusCode, error = "Something went wrong") {
    super(message)
    this.statusCode = statusCode;
    this.message = message;
    this.success = false
  }
}

export {ApiError}
