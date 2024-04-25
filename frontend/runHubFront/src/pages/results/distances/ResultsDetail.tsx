import {
  ColumnFilter,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Result } from "../../../app/models/result";
import Filters from "../Table/Filters";
import DownloadBtn from "../Table/DownloadBtn";
import { FaSort } from "react-icons/fa";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import CustomPagination from "../../../components/pagination/CustomPagination";
import { useParams } from "react-router-dom";

export default observer(function ResultsDetail() {
  const { distanceId } = useParams();
  const { resultStore } = useStore();
  const { loadResults, resultsByPlace } = resultStore;

  useEffect(() => {
    loadResults(Number(distanceId));
  }, [distanceId, loadResults]);

  const columnHelper = createColumnHelper<Result>();

  const columns = [
    columnHelper.accessor("place", {
      header: "Miejsce Open",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstName", {
      header: "Imię",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: "Nazwisko",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("club", {
      header: "Klub",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("placeGender", {
      header: "Miejsce K/M",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "Płeć",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("time", {
      header: "Czas",
      cell: (info) => {
        return info.getValue();
      },
    }),
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
          placeHolder="Wyszukaj wg. nazwiska"
          filter="lastName"
        />
        <DownloadBtn data={resultsByPlace} fileName="results" />
      </div>
      <table className="border border-deepBlack w-full text-left">
        <thead className="bg-lightYellow">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3 py-2">
                  {typeof header.column.columnDef.header === "function"
                    ? header.column.columnDef.header(header.getContext())
                    : header.column.columnDef.header}{" "}
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
              <td colSpan={12}>Brak wyników!</td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomPagination table={table} totalItems={totalItems} />
    </div>
  );
});
