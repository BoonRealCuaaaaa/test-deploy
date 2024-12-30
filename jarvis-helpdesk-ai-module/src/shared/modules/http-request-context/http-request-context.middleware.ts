import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { HttpRequestContextService } from 'src/shared/modules/http-request-context/http-request-context.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpRequestContextMiddleware implements NestMiddleware {
  private readonly logger = new Logger(HttpRequestContextMiddleware.name);

  constructor(private readonly service: HttpRequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.service.runWithContext(req, res, next);
  }
}
