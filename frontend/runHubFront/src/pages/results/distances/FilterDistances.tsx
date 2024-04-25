import { CiSearch } from "react-icons/ci";
import { Dispatch, SetStateAction } from "react";
import { ColumnFilter } from "@tanstack/react-table";

interface Filter {
  id: string;
  value: string;
}

interface FiltersProps {
  columnFilters: Filter[];
  setColumnFilters: Dispatch<SetStateAction<ColumnFilter[]>>; // Correctly specify the type
  filter: string;
  placeHolder: string;
}

const FilterDistances: React.FC<FiltersProps> = ({
  columnFilters,
  setColumnFilters,
  filter,
  placeHolder,
}) => {
  const taskName = columnFilters.find((f) => f.id === `${filter}`)?.value || "";

  const onFilterChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-full max-w-12rem">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CiSearch className="w-5 h-5 text-deepBlack" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-deepBlack rounded-md bg-whiteNeutral text-sm placeholder-deepBlack focus:outline-none focus:border-lightYellow focus:ring-lightYellow"
          placeholder={`${placeHolder}`}
          value={taskName}
          onChange={(e) => onFilterChange(`${filter}`, e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterDistances;
