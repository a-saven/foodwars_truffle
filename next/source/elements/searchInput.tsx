interface SearchInputProps {
  searchTerm: string;
  setIsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setIsDropdownVisible, setSearchTerm }) => (
  <input
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setIsDropdownVisible(true);
    }}
    onFocus={() => setIsDropdownVisible(true)}
    onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
    className="p-2 border rounded bg-gray-100 text-black w-full"
    placeholder="Type to search..."
  />
);
