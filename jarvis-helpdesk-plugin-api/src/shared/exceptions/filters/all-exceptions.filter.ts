import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HeaderKey } from 'src/shared/constants/http-request';
import { ClientErrorDetails, ErrorResponseBody } from 'src/shared/dtos/common.dto';
import { Request, Response } from 'express';

import { CustomBadRequestException } from '../custom-bad-request.exception';
import { CustomUnprocessableEntityException } from '../custom-unprocessable-entity.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    let clientErrorDetails: ClientErrorDetails[] = [];
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;

      if (exception instanceof CustomBadRequestException || exception instanceof CustomUnprocessableEntityException) {
        const customBadReqException = exception as CustomBadRequestException;
        const responseBody = customBadReqException.getResponse() as {
          details: ClientErrorDetails[];
        };
        clientErrorDetails = responseBody.details;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    this.logger.error(
      'Exception filter catch %s with message: %s, clientErrorDetails %j. Stack %s',
      (exception as Error).name,
      (exception as Error).message,
      clientErrorDetails,
      (exception as Error).stack
    );

    const responseBody: ErrorResponseBody = {
      requestId: request.headers[HeaderKey.X_REQUEST_ID] as string,
      message,
      details: clientErrorDetails,
    };

    response.status(status).json(responseBody);
  }
}
