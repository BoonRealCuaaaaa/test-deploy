export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationOrderOption {
  field: string;
  direction: 'asc' | 'desc';
}
