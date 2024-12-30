import SearchBar from './components/search-bar';

interface HeaderProps {
  title: string;
  allowSearch?: boolean;
  searchPlaceholder?: string;
  searchValue: string;
  handleSearch: (searchValue: string) => void;
}

const Header = ({
  title,
  allowSearch = false,
  searchPlaceholder = 'Search...',
  searchValue,
  handleSearch,
}: HeaderProps) => {
  return (
    <div className="flex h-16 items-center justify-between px-5">
      <h3 className="text-sm font-medium">{title}</h3>
      {allowSearch && (
        <SearchBar searchValue={searchValue} handleSearch={handleSearch} searchPlaceholder={searchPlaceholder} />
      )}
    </div>
  );
};

export default Header;
