import { useState } from "react";
import { FaFilter } from "react-icons/fa";

const GenderItem = ({ gender, setColumnFilters, isActive }) => {
  const handleToggleGender = () => {
    console.log(`Toggling gender: ${gender.id}, currently active: ${isActive}`);
    setColumnFilters((prev) => {
      const existingFilter = prev.find((f) => f.id === "gender");
      if (existingFilter) {
        const newFilterValues = isActive
          ? existingFilter.value.filter((id) => id !== gender.id)
          : [...existingFilter.value, gender.id];

        console.log(
          `Updated filter values for gender '${gender.id}':`,
          newFilterValues
        );

        if (newFilterValues.length === 0) {
          const newFilters = prev.filter((f) => f.id !== "gender");
          console.log(`All gender filters removed, new filters:`, newFilters);
          return newFilters;
        }

        const updatedFilters = prev.map((f) =>
          f.id === "gender" ? { ...f, value: newFilterValues } : f
        );
        return updatedFilters;
      } else {
        const newFilters = [...prev, { id: "gender", value: [gender.id] }];
        console.log(`New gender filter added for '${gender.id}':`, newFilters);
        return newFilters;
      }
    });
  };

  return (
    <div
      className={`flex items-center cursor-pointer rounded-md font-bold py-1 px-2 ${
        isActive ? "bg-darkGray" : "bg-transparent"
      } hover:bg-darkGray`}
      onClick={handleToggleGender}
    >
      {gender.name}
    </div>
  );
};

const DashboardFilterPopover = ({ columnFilters, setColumnFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const genders = [
    { id: "M", name: "Mężczyźni" },
    { id: "K", name: "Kobiety" },
  ];

  const activeGenders =
    columnFilters.find((f) => f.id === "gender")?.value || [];

  return (
    <div className="relative">
      <button
        className={`inline-flex items-center justify-center text-sm py-1.5 px-3 border border-transparent rounded-md ${
          activeGenders.length > 0 ? "text-deepBlack" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter className="mr-2 h-5 w-5" />
        Filter
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 w-56 bg-whiteNeutral rounded-md shadow-lg">
          <div className="p-4">
            <p className="text-md font-bold mb-3">Grupuj przez płeć</p>
            <div className="space-y-1">
              {genders.map((gender) => (
                <GenderItem
                  gender={gender}
                  isActive={activeGenders.includes(gender.id)}
                  setColumnFilters={setColumnFilters}
                  key={gender.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFilterPopover;
