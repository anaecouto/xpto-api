export interface ErrorProps {
  status: number;
  [key: string]: any;
}

export default class KeycloakError extends Error {
  public readonly data: ErrorProps;

  constructor(message?: string, data: any = {}) {
    if (data.status == '409') {
      super('Failed to creat user.');
      this.data = data;
      this.data.message = 'Failed to creat user. User already exists!';
    } else {
      super(message);

      this.data = data;
      this.data.status = data.status || 500;
      this.data.message = data.message || this.message;

      console.info(`[AppError]: ${this.message}`);
      console.info(this.stack);
      console.error(this.data);
    }
  }
}
