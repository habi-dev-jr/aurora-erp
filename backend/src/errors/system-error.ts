export class SystemError extends Error {
  constructor(message: string) {
    super(message);
  }

  get name() {
    return 'System Error';
  }
}
