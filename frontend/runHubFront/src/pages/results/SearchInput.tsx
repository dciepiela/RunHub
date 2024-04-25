import { useEffect, useState } from "react";

const SearchInput = ({
  value: initValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
