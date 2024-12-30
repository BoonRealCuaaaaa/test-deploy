import { Injectable, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { HeaderKey } from 'src/shared/constants/http-request';
import { CurrentUserDto } from 'src/shared/dtos/current-user.dto';
import { CustomBadRequestException } from 'src/shared/exceptions/custom-bad-request.exception';
import { NextFunction, Request, Response } from 'express';

export class HttpRequestContext {
  constructor(
    public headers?: Record<string, string | string[] | number | undefined>,
    public requestId?: string,
    public user?: CurrentUserDto,
    public systemId?: string
  ) {}
}

@Injectable()
export class HttpRequestContextService {
  private readonly logger = new Logger(HttpRequestContextService.name);

  private static asyncLocalStorage = new AsyncLocalStorage<HttpRequestContext>();

  runWithContext(req: Request, _res: Response, next: NextFunction) {
    const context = new HttpRequestContext();
    context.requestId = req.headers[HeaderKey.X_REQUEST_ID] as string;
    context.headers = req.headers;
    this.logger.debug(`----- Run with context %j`, context);
    HttpRequestContextService.asyncLocalStorage.run(context, () => {
      next();
    });
  }

  getRequestHeader(key: string) {
    const reqContext = HttpRequestContextService.asyncLocalStorage.getStore();
    return reqContext?.headers?.[key];
  }

  getRequestId() {
    const reqContext = HttpRequestContextService.asyncLocalStorage.getStore();
    return reqContext?.requestId;
  }

  setRequestId(id: string) {
    const reqContext = HttpRequestContextService.asyncLocalStorage.getStore();

    this.logger.debug(`-----Context BEFORE is %j`, reqContext);

    if (reqContext) {
      reqContext.requestId = id;
    }

    this.logger.debug(`-----Context AFTER is %j`, reqContext);
  }

  getUser() {
    const reqContext = HttpRequestContextService.asyncLocalStorage.getStore();
    return reqContext?.user;
  }

  setUser(user: CurrentUserDto) {
    const reqContext = HttpRequestContextService.asyncLocalStorage.getStore();

    this.logger.debug(`-----Context BEFORE is %j`, reqContext);

    if (reqContext) {
      reqContext.user = user;
    }

    this.logger.debug(`-----Context AFTER is %j`, reqContext);
  }

  getUserId(ignoreNotFound = true) {
    const currentUser = this.getUser();
    if (!currentUser && !ignoreNotFound) {
      throw new CustomBadRequestException();
    }

    return currentUser?.id;
  }

  getUserRoles() {
    const currentUser = this.getUser();
    return currentUser?.roles;
  }
}
