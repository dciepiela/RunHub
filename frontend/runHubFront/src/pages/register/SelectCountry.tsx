import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
// import "react-flags-select/css/react-flags-select.css";

const PolishNameCountry = ({ register, name }) => {
  const [selected, setSelected] = useState("");

  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={(code) => {
        setSelected(code);
        register(name);
      }}
      placeholder="Wybierz kraj"
      searchable
      searchPlaceholder="Wyszukaj"
    />
  );
};

export default PolishNameCountry;
