import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@shared/errors';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.httpStatus)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Неопределенная ошибка' });
};

//   (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
//     logger.err(err, true);
//     const status =
//       err instanceof CustomError ? err.HttpStatus : StatusCodes.ACCEPTED;
//     return res.status(status).json({
//       error: err.message,
//     });
//   },
