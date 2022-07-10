import HttpStatusCodes from 'http-status-codes';

export class ApiError extends Error {
  httpStatus;
  errors;

  constructor(httpStatus: number, message: string, errors?: unknown[]) {
    super(message);
    this.httpStatus = httpStatus;
    this.errors = errors;
  }
  static UnautorizeError() {
    return new ApiError(
      HttpStatusCodes.UNAUTHORIZED,
      'Пользователь не авторизован',
    );
  }
  static BadRequest(message: string, errors?: unknown[]) {
    return new ApiError(HttpStatusCodes.BAD_REQUEST, message, errors);
  }
}

export abstract class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor(msg: string, httpStatus: number) {
    super(msg);
    this.HttpStatus = httpStatus;
  }
}

export class ParamMissingError extends CustomError {
  public static readonly Msg =
    'One or more of the required parameters was missing.';
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }
}

export class WebhookSkipedError extends CustomError {
  public static readonly Msg = 'Webhook skipped.';
  public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

  constructor() {
    super(WebhookSkipedError.Msg, WebhookSkipedError.HttpStatus);
  }
}
