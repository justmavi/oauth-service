import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
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

    response.status(exception.getStatus()).json(responseObject);
  }
}
