import { ApiProperty } from '@nestjs/swagger';

/**
 * Pagination Result
 */
export class PaginationResult<T> {
  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;

  @ApiProperty({
    type: Boolean,
  })
  hasNext = false;

  items: T[];
}
