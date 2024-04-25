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

const Filters: React.FC<FiltersProps> = ({
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
          className="text-xs md:text-base flex w-[35vw] md:w-full pl-10 py-2 border border-deepBlack rounded-md bg-whiteNeutral placeholder-deepBlack focus:outline-none focus:border-lightYellow focus:ring-lightYellow"
          placeholder={`${placeHolder}`}
          value={taskName}
          onChange={(e) => onFilterChange(`${filter}`, e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center cursor-pointer rounded-md text-xs md:text-base font-bold py-1 ">
        <label className="text-xs md:text-base">Filtruj: </label>
        <select
          value={columnFilters.find((f) => f.id === "gender")?.value || ""}
          onChange={(e) => {
            const value = e.target.value;
            setColumnFilters((old) =>
              old.map((f) => (f.id === "gender" ? { ...f, value } : f))
            );
          }}
          className="ml-2 text-xs md:text-base"
        >
          <option value="">Wszyscy</option>
          <option value="K">Kobiety</option>
          <option value="M">Mężczyźni</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
