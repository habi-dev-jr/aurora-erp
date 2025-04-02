import {Result, ValidationError} from 'express-validator';

export class RequestValidatorError extends Error {
  errors: Result<ValidationError>;
  constructor(errors: Result<ValidationError>) {
    super();
    this.errors = errors;
  }

  get name() {
    return 'Validate Error';
  }

  get msg() {
    return this.errors.array();
  }
}
