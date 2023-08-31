import { useState } from "react";
import useDebounce from "./useDebounce";

interface ISearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: ISearchInputProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return <input type="search" value={displayValue} onChange={handleChange} />;
};

export default SearchInput;
