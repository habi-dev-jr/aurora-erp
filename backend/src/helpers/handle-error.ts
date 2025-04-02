import { AuthenticationError, RequestValidatorError, SystemError } from '../errors';
import logger from 'jet-logger';

const UNKNOWN_ERROR = 'Unknown Error';

export function extractError(err: unknown) {
  let name;
  let message: string | unknown[] = UNKNOWN_ERROR;
  let stack: string | undefined;

  if (err instanceof RequestValidatorError) {
    message = err.msg;
    name = err.name;
    stack = err.stack;
  } else if (
    err instanceof Error ||
    err instanceof AuthenticationError ||
    err instanceof SystemError
  ) {
    message = err.message;
    name = err.name;
    stack = err.stack;
  }

  return {name, message, stack};
}

export function printError(err: unknown, requestId?: string): void {
  const {name, message, stack} = extractError(err);

  if (requestId) {
    logger.err(`[${requestId}] ${name}: ${message}`);
    stack && logger.info(`[${requestId}] ${stack?.replace(/\n\s+/g, ' ')}`);
    return;
  }
  logger.err(`${name}}: ${message}. ${stack?.replace(/\n\s+/g, ' ')}`);
  return;
}