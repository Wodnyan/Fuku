interface Options {
  errors?: string[];
}

export class HttpException extends Error {
  status!: number;
  isHttpException!: boolean;
  options?: Options;

  constructor(message: string, status: number, options?: Options) {
    super(message);
    this.status = status;
    this.isHttpException = true;
    this.options = options;
  }
}
