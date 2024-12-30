import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    // const userId = this.extractUserIdFromHeader(request);
    // if (!userId) {
    //   throw new UnauthorizedException();
    // }

    request['userId'] = 'd9d9beb0-791d-4009-8923-a212a1c93b8d';
    return true;
  }

  private extractUserIdFromHeader(request: Request): string | undefined {
    const [type, userId] = request.headers.authorization?.split(' ') ?? [];
    return type === 'UserId' ? userId : undefined;
  }
}
