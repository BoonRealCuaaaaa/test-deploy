import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { HeaderKey } from 'src/shared/constants/http-request';
import { v4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestIdHeaderMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestIdHeaderMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction) {
    req.headers[HeaderKey.X_REQUEST_ID] = req.headers[HeaderKey.X_REQUEST_ID] || (v4() as string);
    next();
  }
}
