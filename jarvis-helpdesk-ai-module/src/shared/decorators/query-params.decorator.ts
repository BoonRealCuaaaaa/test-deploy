import { Transform } from 'class-transformer';

import { ValidationException } from '../exceptions/validation.exception';

export const IsBooleanQueryParam = (): PropertyDecorator => {
  return Transform((arg) => {
    if (arg.value === 'true' || arg.value === '1') {
      return true;
    } else if (arg.value === 'false' || arg.value === '0') {
      return false;
    }

    throw new ValidationException({ details: [{ field: arg.key, issue: `${arg.key} must be a boolean value` }] });
  });
};

export const IsIntegerQueryParam = (): PropertyDecorator => {
  return Transform((arg) => {
    const value = Number(arg.value);
    if (Number.isNaN(value) || !Number.isInteger(value)) {
      throw new ValidationException({ details: [{ field: arg.key, issue: `${arg.key} must be a integer value` }] });
    }

    return value;
  });
};

export const IsNumberQueryParam = (): PropertyDecorator => {
  return Transform((arg) => {
    const value = Number(arg.value);
    if (Number.isNaN(value)) {
      throw new ValidationException({ details: [{ field: arg.key, issue: `${arg.key} must be a number value` }] });
    }

    return value;
  });
};

export const IsOrderQueryParam = (): PropertyDecorator => {
  return Transform((arg) => {
    const parts = (arg.value as string).split(':');
    if (parts.length === 2 && ['asc', 'desc'].includes(parts[1])) {
      return { field: parts[0], direction: parts[1] as 'asc' | 'desc' };
    }

    throw new ValidationException({ details: [{ field: arg.key, issue: `${arg.key} must be a boolean value` }] });
  });
};
