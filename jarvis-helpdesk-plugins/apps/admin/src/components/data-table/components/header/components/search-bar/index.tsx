import { Search } from 'react-bootstrap-icons';

export interface SearchBarProps {
  searchPlaceholder: string;
  searchValue: string;
  handleSearch: (searchValue: string) => void;
}

const SearchBar = ({ handleSearch, searchPlaceholder, searchValue }: SearchBarProps) => {
  return (
    <div className="flex h-8 gap-x-2 overflow-hidden rounded-md border border-gray-300 bg-gray-50 px-3">
      <div className="flex items-center">
        <Search className="text-sm" />
      </div>
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchValue}
        className="bg-gray-50 text-sm text-[#78829D] focus:outline-0"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
