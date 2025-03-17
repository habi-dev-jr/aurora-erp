import { extractError, printError } from './handle-error';

interface IServiceResponse {
  success: boolean;
  message: string | unknown[];
  request_id: string;
  response?: object | null;
  error?: unknown;
}

const handleFailedResponse = (
  error: unknown,
  request_id: string
): IServiceResponse => {
  printError(error, request_id);

  const {name, message} = extractError(error);

  return {
    success: false,
    error: name,
    message,
    request_id,
  };
};

const handleSuccessResponse = (
  response: object,
  request_id: string
): IServiceResponse => {
  return {
    success: true,
    error: '',
    message: '',
    request_id,
    response,
  };
};

export const handleResponse = (
  request_id: string,
  response: object,
  error: unknown
): IServiceResponse => {
  if (error === null) {
    return handleSuccessResponse(response, request_id);
  }
  return handleFailedResponse(error, request_id);
};
