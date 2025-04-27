import { memo, useCallback, useEffect, useRef, useState } from "react";
import { CustomInput } from "./CustomInput";
import { SearchWindow } from "./SearchWindow";

const SearchInput = memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasResults, setHasResults] = useState(false);
  const searchWindowRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as Node;
    if (searchWindowRef.current && !searchWindowRef.current.contains(target)) {
      setHasResults(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setHasResults(value.length > 0);
  };

  return (
    <CustomInput className="custom-input--search main-nav__input" idField="search" iconId="search-icon">
      <input
        className="custom-input__field"
        type="text"
        id="search"
        placeholder="Поиск"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setHasResults(searchTerm.length > 0)}
      />
      {hasResults && (
        <div ref={searchWindowRef}>
          <SearchWindow title={searchTerm} onClick={() => setHasResults(false)}/>
        </div>
      )}
    </CustomInput>
  );
});

export default SearchInput;