import { useState } from "react";
import { USERS } from "../fake";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DownloadBtn from "./DownloadBtn";
import SearchInput from "../SearchInput";
import { BsSearch } from "react-icons/bs";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import Filters from "./Filters";
import { FaSort } from "react-icons/fa";

// interface TableColumn {
//   accessorKey: string;
//   cell: React.ComponentType<any>;
//   header: string;
//   enableColumnFilter?: boolean;
//   filterFn?:
//     | ((row: any, columnId: string, filterStatuses: any[]) => boolean)
//     | string;
//   enableSorting?: boolean;
// }

const columns = [
  {
    accessorKey: "place",
    cell: EditableCell,
    header: "Miejsce",
  },
  {
    accessorKey: "profile",
    cell: (props) => (
      <img
        src={props?.getValue()}
        alt="..."
        className="rounded-full w-10 h-10 object-cover"
      />
    ),
    header: "Profil",
    enableSorting: false,
  },
  {
    accessorKey: "lastName",
    cell: EditableCell,
    header: "Nazwisko",
  },
  {
    accessorKey: "firstName",
    cell: EditableCell,
    header: "Imie",
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "gender",
    cell: EditableCell,
    header: "Płeć",
  },
  {
    accessorKey: "city",
    cell: EditableCell,
    header: "Miejscowość",
  },
  {
    accessorKey: "club",
    cell: EditableCell,
    header: "Klub",
    enableSorting: false,
  },
  {
    accessorKey: "time",
    cell: EditableCell,
    header: "Czas",
    enableSorting: false,
  },
  {
    accessorKey: "status",
    cell: StatusCell,
    header: "Status",
    enableColumnFilter: true,
    filterFn: (row, columnId, filterStatuses) => {
      if (filterStatuses.length === 0) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
];

export default function Table() {
  // const columnHelper = createColumnHelper();

  const [data, setData] = useState(USERS);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      // globalFilter,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  console.log(data);
  console.log(columnFilters);

  const totalItems = data.length;
  return (
    <div className="p-2 max-w-[1240px] mx-auto text-black fill-whiteNeutral mt-24 overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="w-full flex items-center gap-1">
          <Filters
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
          {/* serch */}
        </div>
        <DownloadBtn data={data} fileName={"people"} />
      </div>
      <table className="border border-deepBlack w-full text-left">
        <thead className="bg-lightYellow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {header.column.columnDef.header}
                  {header.column.getCanSort() &&
                    !header.column.columnDef.enableSorting && (
                      <button
                        className="mx-3 text-sm focus:outline-none"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <FaSort className="inline-block w-4 h-4" />
                      </button>
                    )}
                  {/* {header.column.getCanSort() &&
                    header.column.getIsSorted() && (
                      <span>
                        {header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}
                      </span>
                    )} */}

                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`${
                  i % 2 === 0 ? "bg-mediumGray" : "bg-whiteNeutral"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>Brak rekordów!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-mediumGray px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="text-xs md:text-base flex items-center gap-1">
          <div>Strona</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} z {table.getPageCount()}
          </strong>
        </span>
        <span className="text-xs md:text-base flex items-center gap-1">
          | Przejdź do strony:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const totalPages = Math.ceil(
                totalItems / table.getState().pagination.pageSize
              );
              let page = parseInt(e.target.value);
              if (isNaN(page) || page < 1) {
                page = 1; // Set to first page if NaN or less than 1
              } else if (page > totalPages) {
                page = totalPages; // Set to last page if greater than total pages
              }
              // Ensure page value stays within bounds
              e.target.value = page;
              table.setPageIndex(page - 1);
            }}
            className="text-xs md:text-base w-[60px] md:w-auto"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="text-xs md:text-base p-2 bg-transparent"
        >
          {[10, 15, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Pokaż {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
