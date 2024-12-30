export type PaginationOrderOption = {
  field: string;
  direction: 'asc' | 'desc';
};

export type QueryParam = {
  ids?: string | string[];
  query?: string;
  offset?: number;
  limit?: number;
  order?: PaginationOrderOption;
};

export type OffsetPaginationResponse<T> = {
  offset: number;
  limit: number;
  total: number;
  hasNext: boolean;
  items: T[];
};

export type CursorPaginationResponse<T> = {
  cursor: string;
  has_more: boolean;
  limit: number;
  items: T[];
};
