import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { Order } from '../constants/order';

export class PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly q?: string;

  @ApiPropertyOptional({ enum: Order, default: 'DESC' })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly order_field?: string;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly offset?: number;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit?: number;

  constructor(offset?: number, limit?: number, order?: Order, order_field?: string) {
    this.limit = limit;
    this.order = order;
    this.order_field = order_field;
    this.offset = offset;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  total: number;
}

export interface IPageOptions {
  q?: string | undefined;
  order?: Order | undefined;
  order_field?: string | undefined;
  offset?: number | undefined;
  limit?: number | undefined;
}

export class PageMetaDto {
  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly offset: number;

  @ApiProperty()
  readonly hasNext: boolean;

  constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
    this.limit = pageOptionsDto.limit || 1;
    this.offset = pageOptionsDto.offset || 0;
    this.total = total;
    this.hasNext = this.offset + this.limit < this.total;
  }
}

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
