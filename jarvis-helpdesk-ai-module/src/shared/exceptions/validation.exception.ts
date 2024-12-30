import { ClientErrorDetails } from '../dtos/common.dto';

import { CustomBadRequestException } from './custom-bad-request.exception';

export class ValidationException extends CustomBadRequestException {
  constructor(public readonly body: { details: ClientErrorDetails[] }) {
    super(body);
  }
}
