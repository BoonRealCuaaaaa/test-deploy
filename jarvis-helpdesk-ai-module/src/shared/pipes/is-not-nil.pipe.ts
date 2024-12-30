import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { CustomBadRequestException } from '../exceptions/custom-bad-request.exception';

@Injectable()
export class IsNotNil<T> implements PipeTransform<T, T> {
  transform(value: T, _metadata: ArgumentMetadata): T {
    if (value === undefined || value === null) {
      throw new CustomBadRequestException({ details: [{ issue: 'Validation failed' }] });
    }
    return value;
  }
}
