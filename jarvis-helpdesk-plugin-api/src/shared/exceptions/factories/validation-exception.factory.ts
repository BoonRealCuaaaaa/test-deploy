import { ValidationError } from '@nestjs/common';

import { ClientErrorDetails } from '../../dtos/common.dto';
import { ValidationException } from '../validation.exception';

export const manufactureValidationException = (errors: ValidationError[]) => {
  const details: ClientErrorDetails[] = [];

  for (const error of errors) {
    const violatedConstraints: string[] = [];

    for (const constraint in error.constraints) {
      const message = error.constraints[constraint];
      violatedConstraints.push(message);
    }

    const clientErrorDetails: ClientErrorDetails = {
      field: error.property,
      issue: violatedConstraints.join(','),
    };

    details.push(clientErrorDetails);

    if (error.children && error.children.length > 0) {
      const childrenBadRequestException = manufactureValidationException(error.children);
      clientErrorDetails.childrenDetails = childrenBadRequestException.body.details;
    }
  }

  return new ValidationException({
    details,
  });
};
