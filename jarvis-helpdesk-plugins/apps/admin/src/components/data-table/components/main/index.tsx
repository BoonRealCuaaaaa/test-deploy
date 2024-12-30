import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { flexRender, Table as TableType } from '@tanstack/react-table';

import Loader from '@/shared/components/loader';
import InnovationAmico from '@/src/assets/svgs/Innovation-amico.svg';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/table';

export interface MainTableProps<T> {
  table: TableType<T>;
  isLoading: boolean;
  isPlaceholderData: boolean;
}

const MainTable = <T,>({ table, isLoading, isPlaceholderData }: MainTableProps<T>) => {
  return (
    <Table className="divide-y divide-[#F1F1F4] border border-l-0 border-r-0 border-[#F1F1F4]">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="divide-x divide-[#F1F1F4] bg-gray-50" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  style={{ width: header.column.columnDef.meta?.width }}
                  className={`h-10 px-4 font-normal text-[#4B5675]`}
                >
                  <div
                    className={`flex items-center ${
                      header.column.columnDef.meta?.headerAlign === 'center'
                        ? 'justify-center'
                        : header.column.columnDef.meta?.headerAlign === 'end'
                          ? 'justify-end'
                          : 'justify-start'
                    } gap-x-2`}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.columnDef.enableSorting === true && (
                      <div className="flex flex-col items-center justify-center">
                        {header.column.getIsSorted() === 'asc' ? (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-2 text-[9px]" />
                            <ChevronDown className="stroke-[#78829D] stroke-1 text-[8px]" />{' '}
                          </>
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-1 text-[8px]" />
                            <ChevronDown className="stroke-[#78829D] stroke-2 text-[9px]" />{' '}
                          </>
                        ) : (
                          <>
                            <ChevronUp className="stroke-[#78829D] stroke-1 text-[8px] font-semibold" />
                            <ChevronDown className="stroke-[#78829D] stroke-1 text-[8px] font-bold" />{' '}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="relative">
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-gray-50 transition-all duration-200 ${isLoading || isPlaceholderData ? 'z-20 opacity-75' : '-z-10 opacity-0'}`}
        >
          <Loader />
        </div>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className="h-16 divide-x divide-[#F1F1F4] px-5"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table
                .getHeaderGroups()
                .map((headerGroups) => {
                  return headerGroups.headers.length;
                })
                .reduce((a, b) => a + b, 0)}
              className="h-24 p-0 text-center text-base font-medium"
            >
              {!isLoading && (
                <div className="flex flex-col items-center gap-y-6 px-20 py-16 shadow-sm">
                  <img src={InnovationAmico} alt="innovation-amico image" />
                  <h2 className="text-xl font-semibold">No result</h2>
                </div>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default MainTable;
