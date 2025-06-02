import { Request, Response, NextFunction } from 'express';

// Define a custom HttpError class
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export const errorHandler = (
  err: Error | HttpError, // Allow err to be HttpError
  _req: Request,
  res: Response,
  _next: NextFunction // _next is declared but not used, which is fine for Express error handlers
) => {
  console.error(err.stack); // Log the full error stack

  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.name, // Or a more generic error title
      message: err.message,
    });
  } else {
    // Handle generic errors
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred',
    });
  }
};