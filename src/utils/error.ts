export interface ErrorProps extends Error {
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  public statusCode: number;

  constructor(error: ErrorProps) {
    super(error.message);

    this.statusCode = error.statusCode;
    this.name = error.name;
  }
}
