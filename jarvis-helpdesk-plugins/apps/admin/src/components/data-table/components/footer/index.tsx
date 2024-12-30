import { Table } from '@tanstack/react-table';

import Pagination from './components/pagination';
import SelectNumber from './components/select-number';

interface FooterProps<T> {
  allowNumOfRows?: boolean;
  table: Table<T>;
  totalRows: number;
}

const Footer = <T,>({ allowNumOfRows = true, table, totalRows }: FooterProps<T>) => {
  return (
    <div
      className={`flex px-5 py-4 ${allowNumOfRows ? 'justify-between' : 'justify-end'} items-center shadow-[#00000008]`}
    >
      {allowNumOfRows && (
        <div className="flex items-center text-sm text-[#78829D]">
          Show
          <SelectNumber
            placeholder={table.getState().pagination.pageSize}
            handleSelectNumber={(num: number) => {
              table.setPageSize(() => num);
            }}
          />
          per page
        </div>
      )}
      <Pagination table={table} totalRows={totalRows} />
    </div>
  );
};

export default Footer;
