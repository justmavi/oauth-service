import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const responseObject: { ok?: false; errors?: string[] } = {
      ok: false,
    };

    responseObject.errors = exception.messages ?? [
      exception.message ?? 'Internal Server Error',
    ];

    console.log(exception);
    response
      .status(exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json(responseObject);
  }
}
