import { ColorIcon } from "./StatusCell";
import { STATUSES } from "../fake";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const StatusItem = ({ status, setColumnFilters, isActive }) => (
  <div
    className={`flex items-center cursor-pointer rounded-md font-bold py-1 px-2 ${
      isActive ? "bg-darkGray" : "bg-transparent"
    } hover:bg-darkGray`}
    onClick={() =>
      setColumnFilters((prev) => {
        const statuses = prev.find((filter) => filter.id === "status")?.value;
        if (!statuses) {
          return prev.concat({
            id: "status",
            value: [status.id],
          });
        }

        return prev.map((f) =>
          f.id === "status"
            ? {
                ...f,
                value: isActive
                  ? statuses.filter((s) => s !== status.id)
                  : statuses.concat(status.id),
              }
            : f
        );
      })
    }
  >
    <ColorIcon color={status.color} className="mr-3" />
    {status.name}
  </div>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterStatuses =
    columnFilters.find((f) => f.id === "status")?.value || [];

  return (
    <div className="relative">
      <button
        className={`inline-flex items-center justify-center text-sm py-1.5 px-3 border border-transparent rounded-md ${
          filterStatuses.length > 0 ? "text-deepBlack" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter className="mr-2 h-5 w-5" />
        Filtruj
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-56 bg-whiteNeutral rounded-md shadow-lg">
          <div className="p-4">
            <p className="text-md font-bold mb-3">Sortuj według</p>
            <p className="font-bold text-lightYellow mb-1">Typ biegu</p>
            <div className="space-y-1">
              {STATUSES.map((status) => (
                <StatusItem
                  status={status}
                  isActive={filterStatuses.includes(status.id)}
                  setColumnFilters={setColumnFilters}
                  key={status.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPopover;
