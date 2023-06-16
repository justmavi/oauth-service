import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestResult } from 'src/enums/request-result.enum';
import { buildResponseObject } from 'src/helpers/response-object-builder.helper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors: string[] = exception.messages ?? [
      exception.message ?? 'Internal Server Error',
    ];
    const responseObject = buildResponseObject(RequestResult.Fail, errors);

    console.log(exception);
    response
      .status(exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json(responseObject);
  }
}
