import { CustomError } from "./custom-error";

const REASON = 'Error connecting to database';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super(REASON);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      { message: REASON }
    ]
  }
}
