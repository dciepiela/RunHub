import { useState } from "react";
import { USERS } from "./fake";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DownloadBtn from "./Table/DownloadBtn";
import SearchInput from "./SearchInput";
import { BsSearch } from "react-icons/bs";

export default function Table() {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("", {
      id: "S.No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "First Name",
    }),
    columnHelper.accessor("profile", {
      cell: (info) => (
        <img
          src={info?.getValue()}
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: "Profile",
    }),
    columnHelper.accessor("firstName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Last Name",
    }),
    columnHelper.accessor("age", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Age",
    }),
    columnHelper.accessor("visits", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Visits",
    }),
    columnHelper.accessor("progress", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Progress",
    }),
  ];

  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-[1240px] mx-auto text-black fill-whiteNeutral mt-24">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <BsSearch />
          <SearchInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-[30%] md:w-1/5 focus:w-1/2 md:focus:w-1/3 duration-300"
            placeholder="Wyszukaj..."
          />
        </div>
        <DownloadBtn data={data} fileName={"people"} />
      </div>
      <table className="border border-deepBlack w-full text-left">
        <thead className="bg-lightYellow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
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
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Pokaż {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
