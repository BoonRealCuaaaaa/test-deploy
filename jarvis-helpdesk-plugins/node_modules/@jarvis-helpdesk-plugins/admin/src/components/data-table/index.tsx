import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  RowData,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { useDebouncedValue } from '@/shared/hooks/use-debounced-value';
import InnovationAmico from '@/src/assets/svgs/Innovation-amico.svg';

import Footer from './components/footer';
import Header from './components/header';
import MainTable from './components/main';
import { PAGINATION } from './constants/pagination';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    headerAlign?: 'start' | 'center' | 'end';
    width?: string;
  }
}

interface QueryParameterMappingToApi {
  offset: string;
  limit: string;
  query?: string;
  order?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  columnWidths?: Record<string, string>;
  headerAligns?: Record<string, 'center' | 'start' | 'end'>;
  queryKey?: string[];
  fetchData: (searchParams: URLSearchParams) => Promise<{ items: T[]; total: number }>;
  title: string | (({ rowCount, total }: { rowCount: number; total: number }) => string);
  pageSize?: number;
  searchPlaceholder?: string;
  queryParameterMappingToApi?: QueryParameterMappingToApi;
  allowSearch?: boolean;
  allowNumOfRows?: boolean;
  buildValueForOrderQueryString?: (sorting: SortingState) => string;
  containHeader?: boolean;
  emptyPlaceholder?: ReactNode;
}

const DataTable = <T,>({
  columns,
  columnWidths = {},
  headerAligns = {},
  queryKey = ['tableData'],
  fetchData,
  title,
  pageSize = 5,
  searchPlaceholder = 'Search...',
  queryParameterMappingToApi = {
    offset: 'offset',
    limit: 'limit',
    query: 'query',
    order: 'order',
  },
  allowSearch = true,
  allowNumOfRows = true,
  buildValueForOrderQueryString = (sorting) => {
    if (sorting.length === 0 || !sorting[0]) return '';
    const sort = sorting[0];
    return `${sort.id}:${sort.desc ? 'desc' : 'asc'}`;
  },
  emptyPlaceholder,
}: DataTableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const [debounceGlobalFilter] = useDebouncedValue(globalFilter);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex:
      searchParams.get('page') && !isNaN(Number(searchParams.get('page'))) ? Number(searchParams.get('page')) - 1 : 0,
    pageSize:
      searchParams.get('pageSize') && !isNaN(Number(searchParams.get('pageSize')))
        ? Number(searchParams.get('pageSize'))
        : pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  // Fetch data with React Query
  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const queryParamsForApi = new URLSearchParams(searchParams);
      const page = Number(searchParams.get(PAGINATION.PAGE));
      const pageSize = Number(searchParams.get(PAGINATION.PAGE_SIZE));

      if (isNaN(page) || isNaN(pageSize)) {
        return {
          items: [],
          total: 0,
        };
      }

      queryParamsForApi.delete(PAGINATION.PAGE);
      queryParamsForApi.delete(PAGINATION.PAGE_SIZE);
      queryParamsForApi.set(queryParameterMappingToApi.offset, String((page - 1) * pageSize));
      queryParamsForApi.set(queryParameterMappingToApi.limit, searchParams.get(PAGINATION.PAGE_SIZE) || '100');

      return await fetchData(queryParamsForApi);
    },
    enabled: !!searchParams,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const newSearchParams: Record<string, string> = {};

    if (debounceGlobalFilter.length > 0 && queryParameterMappingToApi.query) {
      table.resetPagination();
      newSearchParams[queryParameterMappingToApi.query] = debounceGlobalFilter;
    }

    if (sorting.length > 0 && queryParameterMappingToApi.order) {
      newSearchParams[queryParameterMappingToApi.order] = buildValueForOrderQueryString(sorting);
    }

    newSearchParams[PAGINATION.PAGE] = (pagination.pageIndex + 1).toString();
    newSearchParams[PAGINATION.PAGE_SIZE] = pagination.pageSize.toString();

    setSearchParams(newSearchParams, { replace: true });
  }, [pagination, debounceGlobalFilter, sorting]);

  const resolvedColumns = useMemo(
    () =>
      columns.map((col) => {
        const columnId = col.id ?? (col as { accessorKey?: string }).accessorKey;
        return {
          ...col,
          meta: {
            ...col.meta,
            width: columnId ? columnWidths[columnId] : undefined, // Attach custom widths
            headerAlign: columnId ? headerAligns[columnId] : undefined, // Attach custom widths
          },
        };
      }),
    [columns]
  );

  const table = useReactTable({
    data: data?.items || [],
    columns: resolvedColumns,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    pageCount: data ? Math.ceil(data.total / pagination.pageSize) : -1,
    getCoreRowModel: getCoreRowModel(),
  });

  const resolvedTitle =
    typeof title === 'function'
      ? title({
          rowCount: table.getRowCount(),
          total: data?.total || 0,
        })
      : title;

  if (
    data &&
    data.items.length === 0 &&
    (!queryParameterMappingToApi.query || !searchParams.get(queryParameterMappingToApi.query))
  ) {
    if (emptyPlaceholder) {
      return emptyPlaceholder;
    }

    return (
      <div className="mb-8 flex flex-col items-center gap-y-6 rounded-xl border p-16 shadow-sm">
        <img src={InnovationAmico} alt="innovation-amico image" />
        <h2 className="text-xl font-semibold">No Data added yet</h2>
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-xl border border-[#F1F1F4]">
      <Header
        title={resolvedTitle}
        allowSearch={allowSearch}
        searchValue={globalFilter}
        handleSearch={setGlobalFilter}
        searchPlaceholder={searchPlaceholder}
      />
      <MainTable table={table} isLoading={isLoading} isPlaceholderData={isPlaceholderData} />
      <Footer allowNumOfRows={allowNumOfRows} table={table} totalRows={data?.total || 0} />
    </div>
  );
};

export default DataTable;
