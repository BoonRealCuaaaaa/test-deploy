import { InternalServerErrorException } from '@nestjs/common';

import { ClientErrorDetails } from '../dtos/common.dto';

export class CustomInternalServerErrorException extends InternalServerErrorException {
  constructor(public readonly body?: { details: ClientErrorDetails[] }) {
    super(body);

    this.message = 'Internal Server Error Exception';
  }
}
