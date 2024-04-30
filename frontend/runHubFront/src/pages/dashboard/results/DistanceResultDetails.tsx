import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ColumnFilter,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
import DownloadBtn from "../../results/Table/DownloadBtn";
import EditableCell from "../../results/Table/EditableCell";
import { columnHelperResult } from "../../results/distances/ResultsDetailWithEditable";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import Filters from "../../results/Table/Filters";
import { Result } from "../../../app/models/result";
import { Button } from "flowbite-react";

export default observer(function DistanceResultDetails() {
  const { resultStore } = useStore();
  const navigate = useNavigate();
  const {
    loadResults,
    resultsByPlace,
    updateResult,
    clearResults,
    deleteResult,
  } = resultStore;
  const { distanceId } = useParams<{ distanceId: string }>();

  useEffect(() => {
    if (distanceId) {
      loadResults(Number(distanceId));
    }
    return () => {
      clearResults();
    };
  }, [loadResults, distanceId, clearResults]);

  const columns = [
    columnHelperResult.accessor("place", {
      header: "Miejsce open",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("firstName", {
      header: "Imię",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("lastName", {
      header: "Nazwisko",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("time", {
      header: "Czas (h-m-s)",
      cell: (info) => (
        <EditableCell
          {...info}
          updateData={(id: number, field: keyof Result, value: any) =>
            updateResult(id, field, value, Number(distanceId))
          }
        />
      ),
    }),
    columnHelperResult.accessor("placeGender", {
      header: "Miejsce - K/M",
      cell: (info) => info.getValue(),
    }),
    columnHelperResult.accessor("gender", {
      header: "Płeć",
      cell: (info) => info.getValue(),
    }),
    {
      id: "delete",
      header: "Usuń",
      cell: ({ row }: { row: Row<any> }) => (
        <button
          onClick={() =>
            deleteResult(Number(distanceId), row.original.resultId)
          }
          className="px-2 py-2 bg-red-500 text-white font-bold"
        >
          Usuń
        </button>
      ),
    },
  ];

  const [columnFilters, setColumnFilters] = useState([
    { id: "gender", value: "" },
  ]);

  const table = useReactTable({
    data: resultsByPlace,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const totalItems = resultsByPlace.length;

  return (
    <div className="p-2 max-w-[1240px] mx-auto text-black fill-whiteNeutral mt-24 overflow-x-auto">
      <div className="flex justify-between items-center mb-2">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={
            setColumnFilters as React.Dispatch<
              React.SetStateAction<ColumnFilter[]>
            >
          }
          filter="lastName"
          placeHolder="Wyszukaj wg. nazwiska"
        />
        <DownloadBtn data={resultsByPlace} fileName={`wyniki`} />
      </div>
      <table className="border border-deepBlack w-full text-left">
        <thead className="bg-lightYellow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <button
                      className="mx-3 text-sm focus:outline-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <FaSort className="inline-block w-4 h-4" />
                    </button>
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
              <td colSpan={12}>Brak zapisanych biegaczy!</td>
            </tr>
          )}
        </tbody>
      </table>
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
              e.target.value = page.toString();
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
      <Button
        type="button"
        color="failure"
        onClick={() => navigate(-1)}
        className="w-full text-white py-2 px-4 mt-2 rounded"
      >
        Wróć
      </Button>
    </div>
  );
});
