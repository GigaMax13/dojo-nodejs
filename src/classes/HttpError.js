export default class HttpError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;

    Error.captureStackTrace(this, HttpError);
  }
}
