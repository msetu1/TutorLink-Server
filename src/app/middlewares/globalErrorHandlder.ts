import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidateError';
import handleDuplicateError from '../errors/handleDUplicateError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // setting default value
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const basicError = handleZodError(error);
    statusCode = basicError?.statusCode ?? 400; // Set default if undefined
    message = basicError?.message ?? 'Validation Error';
    errorSources = basicError?.errorSources ?? [
      { path: '', message: 'Validation error occurred' },
    ];
  } else if (error?.name === 'ValidationError') {
    const basicError = handleValidationError(error);
    statusCode = basicError?.statusCode ?? 400;
    message = basicError?.message ?? 'Validation Error';
    errorSources = basicError?.errorSources ?? [
      { path: '', message: 'Validation error occurred' },
    ];
  } else if (error?.name === 'CastError') {
    const basicError = handleCastError(error);
    statusCode = basicError?.statusCode ?? 400;
    message = basicError?.message ?? 'Invalid ID format';
    errorSources = basicError?.errorSources ?? [
      { path: '', message: 'Invalid ID' },
    ];
  } else if (error?.code === 11000) {
    const basicError = handleDuplicateError(error);
    statusCode = basicError?.statusCode ?? 400;
    message = basicError?.message ?? 'Duplicate Key Error';
    errorSources = basicError?.errorSources ?? [
      { path: '', message: 'Duplicate key found' },
    ];
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode ?? 500;
    message = error.message ?? 'Unknown application error';
    errorSources = [
      {
        path: '',
        message: error?.message ?? 'Unknown error occurred',
      },
    ];
  } else if (error instanceof Error) {
    message = error.message ?? 'Unknown error';
    errorSources = [
      {
        path: '',
        message: error?.message ?? 'Unknown error occurred',
      },
    ];
  }

  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};
export default globalErrorHandler;
