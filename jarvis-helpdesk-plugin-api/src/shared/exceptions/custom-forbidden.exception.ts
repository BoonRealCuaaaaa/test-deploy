import { ForbiddenException } from '@nestjs/common';

import { ClientErrorDetails } from '../dtos/common.dto';

export class CustomForbiddenException extends ForbiddenException {
  constructor(public readonly body?: { details: ClientErrorDetails[] }) {
    super(body);

    this.message = 'Forbidden Exception';
  }
}
