// import { CiSearch } from "react-icons/ci";

// export default function DistanceResultFilters({
//   columnFilters,
//   setColumnFilters,
//   filter,
//   placeholder,
// }) {
//   const filterValue = columnFilters.find((f) => f.id === filter)?.value || "";

//   // This function updates the filter value for a specific filter ID.
//   const onFilterChange = (filterId, value) => {
//     setColumnFilters((prev) => [
//       ...prev.filter((f) => f.id !== filterId),
//       { id: filterId, value },
//     ]);
//   };
//   return (
//     <div className="flex items-center space-x-3">
//       <div className="relative w-full max-w-xs">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <CiSearch className="w-5 h-5 text-gray-500" />
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lightYellow focus:border-lightYellow"
//           placeholder={placeholder}
//           value={filterValue}
//           onChange={(e) => onFilterChange(filter, e.target.value)}
//         />
//       </div>
//     </div>
//   );
// }
