import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

import { PaginationResult } from '../interfaces/pagination-result.interface';

export const paginate = async <T extends ObjectLiteral>(
  repo: Repository<T>,
  options: FindManyOptions<T>,
  limit = 100,
  offset = 0,
  { isMongoDb } = { isMongoDb: false }
): Promise<PaginationResult<T>> => {
  const [items, count] = await Promise.all([
    repo.find({ ...options, skip: offset, take: limit }),
    // https://github.com/typeorm/typeorm/issues/2446
    isMongoDb ? repo.count(options.where as FindManyOptions<T> | undefined) : repo.count(options),
  ]);
  return generatePaginationResult(items, count, offset, limit);
};

/**
 * Generate empty page result
 */
export const generateEmptyPage = <T>(offset: number): PaginationResult<T> => {
  return generatePaginationResult([], 0, offset, offset);
};

/**
 * Generate pagination result
 */
export const generatePaginationResult = <T>(
  items: T[],
  total: number,
  offset: number,
  limit: number
): PaginationResult<T> => {
  const result = new PaginationResult<T>();

  result.offset = offset;
  result.limit = limit;
  result.total = total;
  result.hasNext = result.offset + result.limit < result.total;
  result.items = items;

  return result;
};

const PaginationHelpers = {
  paginate,
  generatePaginationResult,
  generateEmptyPage,
};

export default PaginationHelpers;
