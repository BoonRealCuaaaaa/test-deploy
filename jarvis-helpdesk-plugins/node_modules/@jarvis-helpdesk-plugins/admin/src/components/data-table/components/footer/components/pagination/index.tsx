import { Table } from '@tanstack/react-table';

export interface PaginationProps<T> {
  table: Table<T>;
  totalRows: number;
}

const Pagination = <T,>({ table, totalRows }: PaginationProps<T>) => {
  const { pageIndex, pageSize } = table.getState().pagination;

  let maxIndex = Math.min((pageIndex + 1) * pageSize, totalRows);
  maxIndex = isNaN(maxIndex) ? 0 : maxIndex;

  const minIndex = maxIndex === 0 ? 0 : pageIndex * pageSize + 1;

  return (
    <div className="flex items-center gap-x-4">
      <div className="text-sm text-[#78829D]">
        {minIndex}-{maxIndex} of {isNaN(totalRows) ? 0 : totalRows}
      </div>
      <div className="flex items-center gap-x-1">
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="h-8 w-8 text-sm hover:rounded-md hover:bg-gray-100 disabled:text-slate-400 disabled:hover:bg-transparent"
        >
          {'<-'}
        </button>

        {table.getState().pagination.pageIndex >= 1 && (
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            className="h-8 w-8 text-sm hover:rounded-md hover:bg-gray-100"
          >
            {table.getState().pagination.pageIndex}
          </button>
        )}

        <button className="h-8 w-8 rounded-md bg-gray-100 text-sm font-medium hover:rounded-md hover:bg-gray-100">
          {table.getState().pagination.pageIndex + 1}
        </button>

        {table.getCanNextPage() && maxIndex > 0 && (
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            className="h-8 w-8 text-sm hover:rounded-md hover:bg-[rgb(241,241,244)]"
          >
            {table.getState().pagination.pageIndex + 2}
          </button>
        )}

        <button
          disabled={!table.getCanNextPage() || maxIndex === 0}
          onClick={() => {
            table.nextPage();
          }}
          className="h-8 w-8 text-sm hover:rounded-md hover:bg-gray-100 disabled:text-slate-400 disabled:hover:bg-transparent"
        >
          {'->'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
