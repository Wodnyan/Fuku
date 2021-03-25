export class HttpException extends Error {
  status!: number;
  isHttpException!: boolean;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.isHttpException = true;
  }
}
