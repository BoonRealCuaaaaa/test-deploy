import type { PipeTransform } from '@nestjs/common';
import { Param, ParseUUIDPipe } from '@nestjs/common';
import type { Type } from '@nestjs/common/interfaces';

export const UUIDParam = (
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator => {
  return Param(property, new ParseUUIDPipe({ version: '4' }), ...pipes);
};
