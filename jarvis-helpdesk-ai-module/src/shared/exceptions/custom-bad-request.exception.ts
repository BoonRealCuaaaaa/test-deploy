import { BadRequestException } from '@nestjs/common';

import { ClientErrorDetails } from '../dtos/common.dto';

export class CustomBadRequestException extends BadRequestException {
  constructor(public readonly body?: { details: ClientErrorDetails[] }) {
    super(body);

    this.message = 'Bad Request Exception';
  }
}
