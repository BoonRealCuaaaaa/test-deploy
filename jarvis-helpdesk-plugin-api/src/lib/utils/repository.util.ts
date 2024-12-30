import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { DUPLICATED_ROW_VIOLATION_CODE } from 'src/shared/constants/error-code';
import { FindOptionsWhere, ObjectId, ObjectLiteral, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export async function createOrFail<T extends ObjectLiteral>(repo: Repository<T>, entity: T, failedMessage: string) {
  try {
    return await repo.save(repo.create(entity));
  } catch (error) {
    if (error.code === DUPLICATED_ROW_VIOLATION_CODE) throw new ConflictException(failedMessage);
    throw new InternalServerErrorException(error);
  }
}

export async function updatedOrFail<T extends ObjectLiteral>(
  repo: Repository<T>,
  criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<T>,
  partialEntity: QueryDeepPartialEntity<T>,
  failedMessage: string
) {
  try {
    return await repo.update(criteria, partialEntity);
  } catch (error) {
    if (error.code === DUPLICATED_ROW_VIOLATION_CODE) throw new ConflictException(failedMessage);
    throw new InternalServerErrorException(error);
  }
}
