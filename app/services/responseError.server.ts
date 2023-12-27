export class NotFoundSingleProductPage extends Response {
  statusText: string;
  constructor(message: string) {
    super("Product Page", { status: 404 });
    this.statusText = message;
  }
}
type ResponseData = {
  success: boolean;
  error?: string;
};

export class CustomResponse extends Response {
  success: boolean;

  constructor(data: ResponseData, options: ResponseInit) {
    super(JSON.stringify(data), options);
    this.success = data.success;
  }
}
