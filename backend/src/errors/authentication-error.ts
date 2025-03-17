export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }

  get name() {
    return 'Authentication Error';
  }
}
