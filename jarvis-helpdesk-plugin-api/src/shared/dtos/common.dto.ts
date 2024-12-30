import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationOrderOption } from 'src/lib/interfaces/pagination-options.interface';

import { ClientErrorIssueId } from '../constants/client-error-issue-id';
import { IsIntegerQueryParam, IsOrderQueryParam } from '../decorators/query-params.decorator';

/**
 * Default find arguments.
 */
export class QueryParamsDto {
  @ApiProperty({
    required: false,
    description: 'search/filter data by ids',
  })
  @IsOptional()
  @IsNotEmpty()
  ids?: string | string[];

  @ApiProperty({
    required: false,
    description: 'search by keyword',
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({
    required: false,
    description: 'offset',
    default: 0,
  })
  @IsOptional()
  @IsIntegerQueryParam()
  offset?: number;

  @ApiProperty({
    required: false,
    description: 'limit',
    default: 100,
  })
  @IsOptional()
  @IsIntegerQueryParam()
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Order result, e.g. order=createdAt:DESC',
  })
  @IsOptional()
  @IsOrderQueryParam()
  order?: PaginationOrderOption;
}

export class CursorBasedQueryParamsDto {
  @ApiProperty({
    required: false,
    description: 'search/filter data by cursor',
  })
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiProperty({
    required: false,
    description: 'limit',
    default: 100,
  })
  @IsOptional()
  @IsIntegerQueryParam()
  limit?: number;
}

export class AuditableResDto {
  @ApiProperty({
    required: true,
    type: Date,
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    required: false,
    type: Date,
  })
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    required: false,
  })
  createdBy: string;

  @ApiProperty({
    required: false,
  })
  updatedBy: string;
}

/**
 * Client error
 */
export class ClientErrorDetails {
  @ApiProperty({ required: false })
  field?: string;

  @ApiProperty()
  issue: string;

  @ApiProperty({ type: ClientErrorIssueId, enum: ClientErrorIssueId })
  issueId?: ClientErrorIssueId;

  @ApiProperty({ required: false })
  childrenDetails?: ClientErrorDetails[];
}

export class ErrorResponseBody {
  @ApiProperty()
  requestId: string;

  @ApiProperty()
  message: string;

  @ApiPropertyOptional({
    type: ClientErrorDetails,
  })
  details: ClientErrorDetails[];
}
